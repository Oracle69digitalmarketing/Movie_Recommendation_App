const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Movies API' });
});

// Protected route - requires a valid JWT
router.get('/private', authMiddleware, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}, you accessed a protected route.` });
});

// Add more protected movie routes below
router.post('/add', authMiddleware, (req, res) => {
  const { title, genre } = req.body;
  // Logic to save movie to database (if model exists)
  res.json({ message: `Movie '${title}' added by user ${req.user.id}` });
});

module.exports = router;
