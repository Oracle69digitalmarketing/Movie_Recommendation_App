// routes/favorites.js
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from '../controllers/favoriteController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getFavorites);              // GET /api/favorites
router.post('/', addFavorite);             // POST /api/favorites
router.delete('/:movieId', removeFavorite); // DELETE /api/favorites/:movieId

export default router;
