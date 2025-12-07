import { Router } from 'express';
import {
  getPublishedCreations,
  getUserCreations,
  toggleLikeCreation,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/get-user-creations', authMiddleware, getUserCreations);
router.get('/get-published-creations', authMiddleware, getPublishedCreations);
router.post('/toggle-like-creations', authMiddleware, toggleLikeCreation);

export default router;
