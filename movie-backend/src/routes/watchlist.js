/**
 * @swagger
 * tags:
 *   name: Watchlists
 *   description: Manage user watchlists
 */

import express from 'express';
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from '../controllers/watchlistController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/watchlists:
 *   get:
 *     summary: Get current user's watchlist
 *     tags: [Watchlists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's watchlist retrieved
 */
router.get('/', authMiddleware, getWatchlist);

/**
 * @swagger
 * /api/watchlists:
 *   post:
 *     summary: Add a movie to watchlist
 *     tags: [Watchlists]
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
 *             properties:
 *               movieId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movie added to watchlist
 */
router.post('/', authMiddleware, addToWatchlist);

/**
 * @swagger
 * /api/watchlists/{id}:
 *   delete:
 *     summary: Remove a movie from watchlist
 *     tags: [Watchlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the watchlist item
 *     responses:
 *       200:
 *         description: Movie removed from watchlist
 */
router.delete('/:id', authMiddleware, removeFromWatchlist);

export default router;
