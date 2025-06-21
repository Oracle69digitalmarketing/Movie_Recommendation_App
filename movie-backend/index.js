import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movies.js';
import favoriteRoutes from './routes/favorites.js';
import reviewRoutes from './routes/review.js';
import watchlistRoutes from './routes/watchlist.js';
import adminRoutes from './routes/admin.js';

// Swagger
import { swaggerUi, swaggerSpec } from './swagger.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route Mounting
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/watchlists', watchlistRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('🎬 Movie Recommendation API is running');
});

// Export app (for testing)
export default app;

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
const recommendationRoutes = require('./routes/recommendation.routes');
app.use('/recommend', recommendationRoutes);  
});
