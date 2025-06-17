import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch movies', error: err.message });
  }
};

export const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await prisma.movie.findUnique({ where: { id: parseInt(id) } });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch movie', error: err.message });
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
    res.status(500).json({ message: 'Failed to create movie', error: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.movie.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete movie', error: err.message });
  }
};
