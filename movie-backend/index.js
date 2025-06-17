import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movies.js';
import favoriteRoutes from './routes/favorites.js';
import reviewRoutes from './routes/review.js';
import watchlistRoutes from './routes/watchlist.js';

import { isAdmin } from './middleware/isAdmin.js';
import { authenticate } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/watchlists', watchlistRoutes);

// Example protected admin route
app.get('/api/admin/dashboard', authenticate, isAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin 👑', user: req.user });
});

// Health check
app.get('/', (req, res) => {
  res.send('🎬 Movie App API is live');
});

// Start server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
