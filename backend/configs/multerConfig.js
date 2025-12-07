// Docs -> https://www.npmjs.com/package/multer
// To handle multipart/form-data, which is primarily used for uploading files.

import multer from 'multer';

const storage = multer.diskStorage({});

const upload = multer({ storage });

export { upload };
