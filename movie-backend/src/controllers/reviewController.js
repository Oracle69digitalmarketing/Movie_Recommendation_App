import { PrismaClient } from '@prisma/client';
import { handleError } from '../utils/handleError.js';

const prisma = new PrismaClient();

export const createReview = async (req, res) => {
  const { movieId, content, rating } = req.body;

  try {
    const review = await prisma.review.create({
      data: {
        content,
        rating: parseInt(rating),
        movie: { connect: { id: parseInt(movieId) } },
        user: { connect: { id: req.user.id } },
      },
    });

    res.status(201).json(review);
  } catch (err) {
    handleError(res, err, 'Failed to create review');
  }
};

export const getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { movieId: parseInt(movieId) },
      include: { user: true },
    });

    res.status(200).json(reviews);
  } catch (err) {
    handleError(res, err, 'Failed to fetch reviews');
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.review.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (err) {
    handleError(res, err, 'Failed to delete review');
  }
};
