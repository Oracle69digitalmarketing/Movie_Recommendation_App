/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only analytics endpoints
 */

import express from 'express';
import {
  getStats,
  getRecentReviews,
  getTopMovies,
} from '../controllers/adminController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.use(authMiddleware, isAdmin);

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get platform statistics
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Total counts
 */
router.get('/stats', getStats);

/**
 * @swagger
 * /api/admin/recent-reviews:
 *   get:
 *     summary: Get recent user reviews
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of recent reviews
 */
router.get('/recent-reviews', getRecentReviews);

/**
 * @swagger
 * /api/admin/top-movies:
 *   get:
 *     summary: Get top movies based on review count
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Ranked movie list
 */
router.get('/top-movies', getTopMovies);

export default router;
