import { Router } from 'express';
import { generateArticle } from '../controllers/ai.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/generate-article', authMiddleware, generateArticle);

export default router;
