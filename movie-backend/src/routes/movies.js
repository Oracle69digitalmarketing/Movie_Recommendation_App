// routes/movies.js
import express from 'express';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movieController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', authMiddleware, createMovie);
router.put('/:id', authMiddleware, updateMovie);
router.delete('/:id', authMiddleware, deleteMovie);

export default router;
