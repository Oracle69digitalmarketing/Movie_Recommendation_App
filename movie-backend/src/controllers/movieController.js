// controllers/movieController.js
import { prisma } from '../utils/prismaClient.js';

// GET /api/movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

// GET /api/movies/:id
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.findUnique({ where: { id: parseInt(id) } });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching movie' });
  }
};

// POST /api/movies
export const createMovie = async (req, res) => {
  const { title, description, releaseDate } = req.body;
  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        releaseDate: new Date(releaseDate)
      }
    });
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create movie' });
  }
};

// PUT /api/movies/:id
export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, description, releaseDate } = req.body;
  try {
    const updated = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        releaseDate: new Date(releaseDate)
      }
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update movie' });
  }
};

// DELETE /api/movies/:id
export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.movie.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete movie' });
  }
};
