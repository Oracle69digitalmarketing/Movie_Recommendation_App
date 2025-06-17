// controllers/favoriteController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFavorites = async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: { movie: true },
    });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
};

export const addFavorite = async (req, res) => {
  const { movieId } = req.body;
  try {
    const existing = await prisma.favorite.findFirst({
      where: {
        userId: req.user.id,
        movieId,
      },
    });

    if (existing) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: req.user.id,
        movieId,
      },
    });

    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to favorites' });
  }
};

export const removeFavorite = async (req, res) => {
  const movieId = parseInt(req.params.movieId);
  try {
    await prisma.favorite.deleteMany({
      where: {
        userId: req.user.id,
        movieId,
      },
    });
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove favorite' });
  }
};
