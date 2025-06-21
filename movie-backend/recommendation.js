// movie-backend/services/recommendation.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Basic content-based recommendation using genre matching
 * Assumes each user has a favorites list to derive preferences
 */
async function getRecommendedMovies(userId, limit = 10) {
  // Get user's favorite movies
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { movie: true }
  });

  if (!favorites.length) return [];

  // Extract genres from favorite movies
  const genres = [...new Set(favorites.flatMap(f => f.movie.genres.split(',')))];

  // Recommend movies based on overlapping genres
  const recommendations = await prisma.movie.findMany({
    where: {
      genres: {
        contains: genres[0] // For simplicity; can improve to match multiple
      }
    },
    take: limit
  });

  return recommendations;
}

module.exports = { getRecommendedMovies };
