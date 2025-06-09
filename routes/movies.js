const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// Save favorite
router.post('/favorites', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  user.favorites.push(req.body.movie);
  await user.save();
  res.json(user.favorites);
});

// Get favorites
router.get('/favorites', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.favorites);
});

module.exports = router;
