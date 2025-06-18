import express from 'express';
import { createReview, getReviewsByMovie, deleteReview } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to post a review
router.post('/', authMiddleware, createReview);

// Public route to get all reviews for a specific movie
router.get('/:movieId', getReviewsByMovie);

// Protected route to delete a review (you may want to add admin or owner-only logic)
router.delete('/:id', authMiddleware, deleteReview);

export default router;
