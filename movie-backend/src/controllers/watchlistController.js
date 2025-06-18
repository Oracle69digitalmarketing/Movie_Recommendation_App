import { PrismaClient } from '@prisma/client';
import { handleError } from '../utils/handleError.js';

const prisma = new PrismaClient();

export const addToWatchlist = async (req, res) => {
  const { movieId } = req.body;

  try {
    const entry = await prisma.watchlist.create({
      data: {
        movieId: parseInt(movieId),
        userId: req.user.id,
      },
    });

    res.status(201).json(entry);
  } catch (err) {
    handleError(res, err, 'Failed to add to watchlist');
  }
};

export const getUserWatchlist = async (req, res) => {
  try {
    const watchlist = await prisma.watchlist.findMany({
      where: { userId: req.user.id },
      include: { movie: true },
    });

    res.status(200).json(watchlist);
  } catch (err) {
    handleError(res, err, 'Failed to fetch watchlist');
  }
};

export const removeFromWatchlist = async (req, res) => {
  const { movieId } = req.params;

  try {
    await prisma.watchlist.deleteMany({
      where: {
        userId: req.user.id,
        movieId: parseInt(movieId),
      },
    });

    res.status(204).send();
  } catch (err) {
    handleError(res, err, 'Failed to remove from watchlist');
  }
};
