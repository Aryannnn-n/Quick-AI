import dotenv from 'dotenv';
import { sql } from '../configs/dbConfig.js';
dotenv.config({});

// Get User Creations
const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    // Get user creations from db
    const creations =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get Published Creations
const getPublishedCreations = async (req, res) => {
  try {
    // Get published creations from db
    const creations =
      await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Like Creation
const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth(); // Logged in user
    const { id } = req.body; // Creation id

    // Find creation
    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

    if (!creation) {
      return res.json({
        success: false,
        message: 'Creation not found !',
      });
    }

    const currLikes = creation.likes;
    const userIdStr = userId.toString();

    let updatedLikes;
    let message;

    // Toggle like
    if (currLikes.includes(userIdStr)) {
      updatedLikes = currLikes.filter((user) => user !== userIdStr);
      message = 'Creation Unliked !';
    } else {
      updatedLikes = [...currLikes, userIdStr];
      message = 'Creation Liked !';
    }

    // Format for postgres array -> Postgres expects {} like structure
    const formattedArray = `{${updatedLikes.json(',')}}`;

    // Update likes -> :: for typecasting
    await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

    res.json({ success: true, message });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { getPublishedCreations, getUserCreations, toggleLikeCreation };
