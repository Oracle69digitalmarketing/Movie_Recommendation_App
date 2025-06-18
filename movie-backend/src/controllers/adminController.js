import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDashboardStats = async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const movieCount = await prisma.movie.count();
    const favoriteCount = await prisma.favorite.count();
    const reviewCount = await prisma.review.count();
    const watchlistCount = await prisma.watchlist.count();

    res.status(200).json({
      users: userCount,
      movies: movieCount,
      favorites: favoriteCount,
      reviews: reviewCount,
      watchlists: watchlistCount,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { role },
      select: { id: true, username: true, role: true },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user role', error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
};
