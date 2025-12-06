// Middleware to check userId and hasPremiumPlan

import { clerkClient } from '@clerk/express';

const authMiddleware = async (req, res, next) => {
  try {
    // Get authenticated user's ID & helper "has" function
    const { userId, has } = await req.auth();

    // Check if the user has a premium plan
    const hasPremiumPlan = await has({ plan: 'premium' });

    // Fetch full user object from Clerk
    const user = await clerkClient.users.getUser(userId);

    // If NOT premium but user still has free usage quota
    if (!hasPremiumPlan && user.privateMetadata.free_usage) {
      // Attach remaining free usage to request
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      // Reset free usage if premium OR free quota consumed
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });

      // Set free_usage to 0 on the request
      req.free_usage = 0;

      // Attach plan type to the request
      req.plan = hasPremiumPlan ? 'premium' : 'free';
    }

    // Continue to next middleware or route
    next();
  } catch (error) {
    // Return error response if something fails
    res.json({
      success: 'false',
      message: error.message,
    });
  }
};

export { authMiddleware };
