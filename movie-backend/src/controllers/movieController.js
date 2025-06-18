import { PrismaClient } from '@prisma/client';
import { handleError } from '../utils/handleError.js';

const prisma = new PrismaClient();

export const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.status(200).json(movies);
  } catch (err) {
    handleError(res, err, 'Failed to fetch movies');
  }
};

export const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await prisma.movie.findUnique({ where: { id: parseInt(id) } });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.status(200).json(movie);
  } catch (err) {
    handleError(res, err, 'Failed to fetch movie');
  }
};

export const createMovie = async (req, res) => {
  const { title, description, genre, releaseYear } = req.body;

  try {
    const newMovie = await prisma.movie.create({
      data: { title, description, genre, releaseYear: parseInt(releaseYear) },
    });

    res.status(201).json(newMovie);
  } catch (err) {
    handleError(res, err, 'Failed to create movie');
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.movie.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    handleError(res, err, 'Failed to delete movie');
  }
};
