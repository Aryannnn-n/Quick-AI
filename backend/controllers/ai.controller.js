// Docs -> https://ai.google.dev/gemini-api/docs/openai

// Image generation API -> Text to Image
// Docs -> https://clipdrop.co/apis/docs/text-to-image

import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto'; // For hashing prompts into cache keys
import { LRUCache } from 'lru-cache'; // LRU Cache Import

import { clerkClient } from '@clerk/express';
import OpenAI from 'openai';
import { sql } from '../configs/dbConfig.js';

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

// ============================================================
// LRU CACHE SETUP
// Algorithm: Least Recently Used (LRU) Cache
// - Stores up to 100 prompt→response pairs in memory
// - Each entry expires after 30 minutes (TTL)
// - When cache is full, the least recently used entry is evicted
// - Prevents duplicate API calls for identical prompts
// ============================================================
const lruCache = new LRUCache({
  max: 100,              // Max 100 entries in memory
  ttl: 1000 * 60 * 30,  // Each entry lives for 30 minutes
});

// Helper: Generate a unique hash key from prompt + type + options
// e.g. ("Write about AI", "article", 800) → "a3f9c2..."
function generateCacheKey(type, prompt, extra = '') {
  return crypto
    .createHash('md5')
    .update(`${type}::${prompt}::${extra}`)
    .digest('hex');
}

// ============================================================


// Generate Article
const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    // Enforce free-tier usage limit
    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({
        success: false,
        message: 'Limit reached. Upgrade to continue.',
      });
    }

    // LRU Cache Check — Before calling Gemini API
    const cacheKey = generateCacheKey('article', prompt, length);
    if (lruCache.has(cacheKey)) {
      console.log(`[LRU Cache] HIT → article | key: ${cacheKey}`);
      const cachedContent = lruCache.get(cacheKey);
      return res.json({ success: true, content: cachedContent, fromCache: true });
    }
    console.log(`[LRU Cache] MISS → article | Calling Gemini API...`);

    // Generate article using Gemini -> To generate same amount of words we need more tokens
    let maxTokens = length <= 800 ? 1024 : length <= 1200 ? 1536 : 2048;

    const finalPrompt = `
      ${prompt}.

      It should be around ${length} words.
      Do not explain how to write the article.
      Just write the full article with headings and paragraphs.
    `;

    const response = await openai.chat.completions.create({
      model: 'gemini-2.5-flash',
      messages: [{ role: 'user', content: finalPrompt.trim() }],
      temperature: 0.7,
      max_tokens: maxTokens,
    });

    // Handling incomplete response
    const rawContent = response?.choices?.[0]?.message?.content;

    function trimToLastFullStop(text) {
      if (!text) return text;
      const lastPeriodIndex = text.lastIndexOf('.');
      if (lastPeriodIndex === -1) return text;
      return text.substring(0, lastPeriodIndex + 1).trim();
    }

    const content = trimToLastFullStop(rawContent);

    // Handle missing AI output
    if (!content) {
      return res.json({
        success: false,
        message: 'The generative AI server is not working properly , kindly try again later !',
      });
    }

    // LRU Cache SET — Store result before returning
    lruCache.set(cacheKey, content);
    console.log(`[LRU Cache] STORED → article | key: ${cacheKey}`);

    // Save generated article
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    // Track free usage for non-premium users
    if (plan !== 'premium') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);

    if (error.status === 429 || error.code === 429) {
      return res.status(503).json({
        success: false,
        message: 'AI generation is temporarily unavailable as we are migrating our services to a new AI provider. Please try again after some time.',
      });
    }

    res.json({ success: false, message: error.message });
  }
};

// Generate Blog Titles
const generateBlogTitles = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    // Enforce free-tier usage limit
    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({
        success: false,
        message: 'Limit reached. Upgrade to continue.',
      });
    }

    // LRU Cache Check — Before calling Gemini API
    const cacheKey = generateCacheKey('blog-title', prompt);
    if (lruCache.has(cacheKey)) {
      console.log(`[LRU Cache] HIT → blog-title | key: ${cacheKey}`);
      const cachedContent = lruCache.get(cacheKey);
      return res.json({ success: true, content: cachedContent, fromCache: true });
    }
    console.log(`[LRU Cache] MISS → blog-title | Calling Gemini API...`);

    // Generate title using Gemini
    const response = await openai.chat.completions.create({
      model: 'gemini-2.5-flash',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;

    // Handle missing AI output
    if (!content) {
      return res.json({
        success: false,
        message: 'The generative AI server is not working properly , kindly try again later !',
      });
    }

    // ✅ LRU Cache SET — Store result
    lruCache.set(cacheKey, content);
    console.log(`[LRU Cache] STORED → blog-title | key: ${cacheKey}`);

    // Save generated title
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    // Track free usage for non-premium users
    if (plan !== 'premium') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);

    if (error.status === 429 || error.code === 429) {
      return res.status(503).json({
        success: false,
        message: 'AI generation is temporarily unavailable as we are migrating our services to a new AI provider. Please try again after some time.',
      });
    }

    res.json({ success: false, message: error.message });
  }
};

// Generate Image
const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    // Enforce premium only
    if (plan !== 'premium') {
      return res.json({
        success: false,
        message: 'This feature is only available for premium subscriptions.',
      });
    }

    // ✅ LRU Cache Check — Before calling Clipdrop API
    // Note: publish flag is NOT part of the cache key (it's metadata, not content)
    const cacheKey = generateCacheKey('image', prompt);
    if (lruCache.has(cacheKey)) {
      console.log(`[LRU Cache] HIT → image | key: ${cacheKey}`);
      const cachedUrl = lruCache.get(cacheKey);
      return res.json({ success: true, content: cachedUrl, fromCache: true });
    }
    console.log(`[LRU Cache] MISS → image | Calling Clipdrop API...`);

    // Generate image using Clipdrop
    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: { 'x-api-key': process.env.CLIPDROP_API_KEY },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

    // Storing image into cloudinary
    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    if (!secure_url) {
      return res.json({
        success: false,
        message: 'The generative AI server is not working properly , kindly try again later !',
      });
    }

    // ✅ LRU Cache SET — Store Cloudinary URL
    lruCache.set(cacheKey, secure_url);
    console.log(`[LRU Cache] STORED → image | key: ${cacheKey}`);

    // Save generated image
    await sql`
      INSERT INTO creations (user_id, prompt, content, type , publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image' , ${publish ?? false})
    `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Remove Image Background
// ℹ️ No cache here — input is a unique uploaded file (binary), not a text prompt
const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan !== 'premium') {
      return res.json({
        success: false,
        message: 'This feature is only available for premium subscriptions.',
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: 'background_removal',
          background_removal: 'remove_the_background',
        },
      ],
    });

    if (!secure_url) {
      return res.json({
        success: false,
        message: 'The generative AI server is not working properly , kindly try again later !',
      });
    }

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove background from the image', ${secure_url}, 'image')
    `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Remove Object
// ℹ️ No cache here — input is a unique uploaded file (binary), not a text prompt
const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (plan !== 'premium') {
      return res.json({
        success: false,
        message: 'This feature is only available for premium subscriptions.',
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:prompt_${object}` }],
      resource_type: 'image',
    });

    if (!imageUrl) {
      return res.json({
        success: false,
        message: 'The generative AI server is not working properly , kindly try again later !',
      });
    }

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Remove ${object} from the image`}, ${imageUrl}, 'image')
    `;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Resume Review
// ℹ️ No cache here — every resume file is unique binary content
const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== 'premium') {
      return res.json({
        success: false,
        message: 'This feature is only available for premium subscriptions.',
      });
    }

    if (!resume) {
      return res.json({ success: false, message: 'Resume file is required.' });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: 'Resume file size exceeds allowed file size (5MB).',
      });
    }

    const pdfResult = await pdf(resume.buffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement.

Resume Content:
${pdfResult.text}`;

    const response = await openai.chat.completions.create({
      model: 'gemini-2.5-flash',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;

    if (!content) {
      return res.json({
        success: false,
        message: 'The generative AI server is not working properly, kindly try again later!',
      });
    }

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error(error);

    if (error.status === 429 || error.code === 429) {
      return res.status(503).json({
        success: false,
        message: 'Resume review system is temporarily unavailable as we are migrating our services to a new AI provider. Please try again after some time.',
      });
    }

    res.json({ success: false, message: error.message });
  }
};

export {
  generateArticle,
  generateBlogTitles,
  generateImage,
  removeImageBackground,
  removeImageObject,
  resumeReview
};
