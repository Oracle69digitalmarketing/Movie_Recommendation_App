const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

const {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  approveMovie,
  rejectMovie,
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

// Admin moderation routes
router.patch('/:id/approve', authMiddleware, isAdmin, approveMovie);
router.patch('/:id/reject', authMiddleware, isAdmin, rejectMovie);

module.exports = router;
