// Docs -> https://ai.google.dev/gemini-api/docs/openai

// Image generation API -> Text to Image
// Docs -> https://clipdrop.co/apis/docs/text-to-image

import dotenv from 'dotenv';
dotenv.config({});

import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

import OpenAI from 'openai';
import { sql } from '../configs/dbConfig.js';
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

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
        sucess: false,
        message: 'Limit reached. Upgrade to continue.',
      });
    }

    // Generate article using Gemini
    const response = await openai.chat.completions.create({
      model: 'gemini-2.0-flash',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response?.choices?.[0]?.message?.content;

    // Handle missing AI output
    if (!content) {
      return res.json({
        success: false,
        message:
          'The generative AI server is not working properly , kindly try again later !',
      });
    }

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
    res.json({
      sucess: false,
      message: error.message,
    });
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
        sucess: false,
        message: 'Limit reached. Upgrade to continue.',
      });
    }

    // Generate article using Gemini
    const response = await openai.chat.completions.create({
      model: 'gemini-2.0-flash',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 100, // Only title so less tokens
    });

    const content = response?.choices?.[0]?.message?.content;

    // Handle missing AI output
    if (!content) {
      return res.json({
        success: false,
        message:
          'The generative AI server is not working properly , kindly try again later !',
      });
    }

    // Save generated article
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
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};

// Generate Image
const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    // Enforce premium only -> Only premium members can genearate images
    if (plan !== 'premium') {
      return res.json({
        sucess: false,
        message: 'This feature is only available for premium subscriptions.',
      });
    }

    // Generate image using Clipdrop
    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      'binary'
    ).toString('base64')}`;

    // Storing image into cloudinary
    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    // Handle missing AI output
    if (!secure_url) {
      return res.json({
        success: false,
        message:
          'The generative AI server is not working properly , kindly try again later !',
      });
    }

    // Save generated article
    await sql`
      INSERT INTO creations (user_id, prompt, content, type , publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image' , ${
      publish ?? false
    })
    `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};

export { generateArticle, generateBlogTitles, generateImage };
