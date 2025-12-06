import { Router } from 'express';
import {
  generateArticle,
  generateBlogTitles,
  generateImage,
} from '../controllers/ai.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/generate-article', authMiddleware, generateArticle);
router.post('/generate-blog-titles', authMiddleware, generateBlogTitles);
router.post('/generate-image', authMiddleware, generateImage);

export default router;
