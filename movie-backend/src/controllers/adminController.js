import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStats = async (req, res) => {
  try {
    const [totalUsers, totalMovies, totalReviews] = await Promise.all([
      prisma.user.count(),
      prisma.movie.count(),
      prisma.review.count(),
    ]);

    res.json({ totalUsers, totalMovies, totalReviews });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const getRecentReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { user: true, movie: true },
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recent reviews' });
  }
};

export const getTopMovies = async (req, res) => {
  try {
    const topMovies = await prisma.movie.findMany({
      orderBy: {
        reviews: {
          _count: 'desc',
        },
      },
      take: 10,
      include: {
        _count: {
          select: { reviews: true },
        },
      },
    });
    res.json(topMovies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top movies' });
  }
};
