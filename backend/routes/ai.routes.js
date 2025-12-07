import { Router } from 'express';
import { upload } from '../configs/multerConfig.js';
import {
  generateArticle,
  generateBlogTitles,
  generateImage,
  removeImageBackground,
  removeImageObject,
  resumeReview,
} from '../controllers/ai.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/generate-article', authMiddleware, generateArticle);
router.post('/generate-blog-titles', authMiddleware, generateBlogTitles);
router.post('/generate-image', authMiddleware, generateImage);

// Added multer for file handling
router.post(
  '/remove-image-background',
  upload.single('image'),
  authMiddleware,
  removeImageBackground
);

router.post(
  '/remove-image-object',
  upload.single('image'),
  authMiddleware,
  removeImageObject
);

router.post(
  '/resume-review',
  upload.single('resume'),
  authMiddleware,
  resumeReview
);

export default router;
