/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Manage user favorite movies
 */

import express from 'express';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../controllers/favoriteController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get user's favorite movies
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: List of favorite movies
 */
router.get('/', getFavorites);

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add movie to favorites
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movie added to favorites
 */
router.post('/', addFavorite);

/**
 * @swagger
 * /api/favorites/{movieId}:
 *   delete:
 *     summary: Remove movie from favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID to remove
 *     responses:
 *       200:
 *         description: Movie removed from favorites
 */
router.delete('/:movieId', removeFavorite);

export default router;
