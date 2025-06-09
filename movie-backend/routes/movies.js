const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// Save favorite movie
router.post('/favorites', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.favorites.push(req.body.movie);
  await user.save();
  res.json({ favorites: user.favorites });
});

// Get favorites
router.get('/favorites', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ favorites: user.favorites });
});

module.exports = router;
