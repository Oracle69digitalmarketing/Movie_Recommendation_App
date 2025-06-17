const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get favorites
router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user);
  res.json(user.favorites || []);
});

// Add to favorites
router.post('/', authMiddleware, async (req, res) => {
  const { movieId, title, posterPath } = req.body;
  const user = await User.findById(req.user);

  // Avoid duplicates
  const exists = user.favorites.find(m => m.movieId === movieId);
  if (!exists) user.favorites.push({ movieId, title, posterPath });

  await user.save();
  res.json(user.favorites);
});

// Remove from favorites
router.delete('/:movieId', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user);
  user.favorites = user.favorites.filter(m => m.movieId !== req.params.movieId);
  await user.save();
  res.json(user.favorites);
});

module.exports = router;
