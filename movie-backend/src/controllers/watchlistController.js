import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add a movie to user's watchlist
export const addToWatchlist = async (req, res) => {
  const userId = req.user.id;
  const { movieId } = req.body;

  try {
    const existing = await prisma.watchlist.findFirst({
      where: { userId, movieId: parseInt(movieId) }
    });

    if (existing) {
      return res.status(409).json({ message: 'Movie already in watchlist' });
    }

    const entry = await prisma.watchlist.create({
      data: {
        user: { connect: { id: userId } },
        movie: { connect: { id: parseInt(movieId) } }
      }
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Error adding to watchlist', error: err.message });
  }
};

// Get current user's watchlist
export const getWatchlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const watchlist = await prisma.watchlist.findMany({
      where: { userId },
      include: { movie: true }
    });

    res.status(200).json(watchlist);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch watchlist', error: err.message });
  }
};

// Remove a movie from watchlist
export const removeFromWatchlist = async (req, res) => {
  const userId = req.user.id;
  const { movieId } = req.params;

  try {
    await prisma.watchlist.deleteMany({
      where: {
        userId,
        movieId: parseInt(movieId)
      }
    });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error removing from watchlist', error: err.message });
  }
};
