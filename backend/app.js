import { clerkMiddleware, requireAuth } from '@clerk/express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import AIRoutes from './routes/ai.routes.js';
dotenv.config({});

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Middlewares -> Applied on on all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware()); // Adding clerk

// Protecting Routes -> Only logged in users can access
app.use(requireAuth());

// Routes
app.use('/api/ai', AIRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
