const Movie = require('../models/Movie');

// Add new movie
exports.addMovie = async (req, res) => {
  try {
    const { title, genre } = req.body;
    const movie = new Movie({ title, genre, user: req.user.id });
    await movie.save();
    res.status(201).json({ message: 'Movie added successfully', movie });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add movie' });
  }
};

// Get all movies (for current user)
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ movies });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve movies' });
  }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id, user: req.user.id });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ movie });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve movie' });
  }
};

// Update movie by ID
exports.updateMovie = async (req, res) => {
  try {
    const { title, genre } = req.body;
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, genre },
      { new: true }
    );
    if (!movie) return res.status(404).json({ message: 'Movie not found or not authorized' });
    res.json({ message: 'Movie updated', movie });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update movie' });
  }
};

// Delete movie by ID
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!movie) return res.status(404).json({ message: 'Movie not found or not authorized' });
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete movie' });
  }
};
