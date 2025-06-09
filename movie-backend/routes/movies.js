const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Example protected route
router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Movies route secured' });
});

module.exports = router;
