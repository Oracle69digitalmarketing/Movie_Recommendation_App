/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie browsing and search
 */

import express from 'express';
import {
  getAllMovies,
  getMovieById,
  searchMovies,
  getRecommendedMovies,
} from '../controllers/movieController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 */
router.get('/', getAllMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie details
 */
router.get('/:id', getMovieById);

/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     summary: Search movies by keyword
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Filtered list
 */
router.get('/search', searchMovies);

/**
 * @swagger
 * /api/movies/{id}/recommendations:
 *   get:
 *     summary: Get recommended movies based on current one
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Recommended movies
 */
router.get('/:id/recommendations', authMiddleware, getRecommendedMovies);

export default router;
