// Docs -> https://ai.google.dev/gemini-api/docs/openai

import dotenv from 'dotenv';
dotenv.config({});

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

export { generateArticle };
