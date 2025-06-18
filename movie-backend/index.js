// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movies.js';
import favoriteRoutes from './routes/favorites.js';
import reviewRoutes from './routes/review.js';
import watchlistRoutes from './routes/watchlist.js';
import adminRoutes from './routes/admin.js'; // ✅ added

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
app.use('/api/admin', adminRoutes); // ✅ mounted

// Root
app.get('/', (req, res) => {
  res.send('🎬 Movie App API is live');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
