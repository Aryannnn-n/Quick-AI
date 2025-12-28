// Docs -> https://www.npmjs.com/package/multer
// To handle multipart/form-data, which is primarily used for uploading files.

import multer from 'multer';

// ✅ Vercel-safe: store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export { upload };
