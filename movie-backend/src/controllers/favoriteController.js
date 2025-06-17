import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFavorites = async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: { movie: true },
    });
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch favorites', error: err.message });
  }
};

export const addFavorite = async (req, res) => {
  const { movieId } = req.body;

  try {
    const exists = await prisma.favorite.findFirst({
      where: { userId: req.user.id, movieId: parseInt(movieId) },
    });

    if (exists) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: req.user.id,
        movieId: parseInt(movieId),
      },
    });

    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add favorite', error: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  const { movieId } = req.params;

  try {
    await prisma.favorite.deleteMany({
      where: {
        userId: req.user.id,
        movieId: parseInt(movieId),
      },
    });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove favorite', error: err.message });
  }
};
