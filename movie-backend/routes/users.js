// Add to top if not present
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

// === FAVORITES ROUTES ===

// Get all favorites
router.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites || []);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a movie to favorites
router.post('/favorites', authenticateToken, async (req, res) => {
  const { movieId, title, posterPath } = req.body;
  if (!movieId || !title) {
    return res.status(400).json({ message: 'movieId and title are required' });
  }

  try {
    const user = await User.findById(req.user.id);
    const exists = user.favorites.find(fav => fav.movieId === movieId);
    if (exists) {
      return res.status(409).json({ message: 'Already in favorites' });
    }

    user.favorites.push({ movieId, title, posterPath });
    await user.save();
    res.status(201).json({ message: 'Added to favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove a favorite movie
router.delete('/favorites/:movieId', authenticateToken, async (req, res) => {
  const { movieId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter(fav => fav.movieId !== movieId);
    await user.save();
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
