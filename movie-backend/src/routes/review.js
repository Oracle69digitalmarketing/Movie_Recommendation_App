/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Manage movie reviews
 */

import express from 'express';
import {
  getReviewsForMovie,
  createReview,
  deleteReview,
} from '../controllers/reviewController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/reviews/{movieId}:
 *   get:
 *     summary: Get all reviews for a specific movie
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *     responses:
 *       200:
 *         description: List of reviews for the movie
 */
router.get('/:movieId', getReviewsForMovie);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Submit a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *               - rating
 *               - comment
 *             properties:
 *               movieId:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 */
router.post('/', authMiddleware, createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 */
router.delete('/:id', authMiddleware, deleteReview);

export default router;
