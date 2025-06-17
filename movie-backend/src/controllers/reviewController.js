import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a review for a movie
export const createReview = async (req, res) => {
  const { movieId, rating, comment } = req.body;
  const userId = req.user.id;

  try {
    const review = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        comment,
        movie: { connect: { id: parseInt(movieId) } },
        user: { connect: { id: userId } }
      }
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit review', error: err.message });
  }
};

// Get all reviews for a movie
export const getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { movieId: parseInt(movieId) },
      include: { user: { select: { id: true, name: true } } }
    });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
};
