import express from 'express';
import {
  addToWatchlist,
  getUserWatchlist,
  removeFromWatchlist,
} from '../controllers/watchlistController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, addToWatchlist);
router.get('/', authMiddleware, getUserWatchlist);
router.delete('/:movieId', authMiddleware, removeFromWatchlist);

export default router;
