const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');

// Public route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Movies API' });
});

// Protected test route
router.get('/private', authMiddleware, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}, you accessed a protected route.` });
});

// Movie routes (all protected)
router.post('/add', authMiddleware, addMovie);
router.get('/all', authMiddleware, getAllMovies);
router.get('/:id', authMiddleware, getMovieById);
router.put('/:id', authMiddleware, updateMovie);
router.delete('/:id', authMiddleware, deleteMovie);

module.exports = router;
