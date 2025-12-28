import { clerkMiddleware, requireAuth } from '@clerk/express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectCloudinary } from './configs/cloudinary.js';
import AIRoutes from './routes/ai.routes.js';
import UserRoutes from './routes/user.routes.js';
dotenv.config({});

const app = express();
app.use(cors());

// Connect -> Cloudinary server
await connectCloudinary();

// Middlewares -> Applied on on all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware()); // Adding clerk

// Protecting Routes -> Only logged in users can access
app.use(requireAuth());

// Routes
app.use('/api/ai', AIRoutes);
app.use('/api/user', UserRoutes);

// Export Only
export default app;
