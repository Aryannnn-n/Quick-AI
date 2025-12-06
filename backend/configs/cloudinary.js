import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary configuration
const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary account name
    api_secret: process.env.CLOUDINARY_API_SECRET, // API secret key
    api_key: process.env.CLOUDINARY_API_KEY, // API key
  });
};

export { connectCloudinary };
