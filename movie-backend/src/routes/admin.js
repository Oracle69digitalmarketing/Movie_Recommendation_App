import express from 'express';
import { getStats, getRecentReviews, getTopMovies } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.use(authMiddleware, isAdmin);

router.get('/stats', getStats);
router.get('/recent-reviews', getRecentReviews);
router.get('/top-movies', getTopMovies);

export default router;
