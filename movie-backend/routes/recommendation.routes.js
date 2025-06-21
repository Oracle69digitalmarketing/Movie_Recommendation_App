// movie-backend/routes/recommendation.routes.js

const express = require('express');
const { getRecommendedMovies } = require('../services/recommendation');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id; // assumes auth middleware sets req.user
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const results = await getRecommendedMovies(userId);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Recommendation failed' });
  }
});

module.exports = router;
