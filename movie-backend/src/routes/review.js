import express from 'express';
import {
  addReview,
  getReviewsByMovie,
  deleteReview
} from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/:movieId', addReview);          // Add a review to a movie
router.get('/:movieId', getReviewsByMovie);   // Get all reviews for a movie
router.delete('/:reviewId', deleteReview);    // Delete a review

export default router;
