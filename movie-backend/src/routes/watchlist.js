import express from 'express';
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist
} from '../controllers/watchlistController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', addToWatchlist);                // Add to watchlist
router.get('/', getWatchlist);                   // Get user's watchlist
router.delete('/:movieId', removeFromWatchlist); // Remove from watchlist

export default router;
