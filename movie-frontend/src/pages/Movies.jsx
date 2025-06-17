import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [favoriting, setFavoriting] = useState({});

  const token = localStorage.getItem('token');

  const fetchMovies = async () => {
    try {
      const res = await axios.get('/api/movies/private', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch movies');
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddMovie = async () => {
    if (!title.trim() || !genre.trim()) {
      return toast.warn('Both title and genre are required');
    }

    try {
      setLoading(true);
      await axios.post(
        '/api/movies/add',
        { title, genre },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Movie added successfully');
      setTitle('');
      setGenre('');
      await fetchMovies();
    } catch (err) {
      console.error(err);
      toast.error('Error adding movie');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async (movie) => {
    if (favoriting[movie._id]) return;

    setFavoriting(prev => ({ ...prev, [movie._id]: true }));

    try {
      await axios.post(
        '/api/users/favorites',
        {
          movieId: movie._id,
          title: movie.title,
          posterPath: movie.posterPath || '',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`${movie.title} added to favorites`);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.info(`${movie.title} is already in favorites`);
      } else {
        toast.error('Failed to add favorite');
        console.error(err);
      }
    } finally {
      setFavoriting(prev => ({ ...prev, [movie._id]: false }));
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🎬 My Movies</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-auto"
        />
        <button
          onClick={handleAddMovie}
          disabled={loading}
          className={`px-6 py-2 text-white rounded ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Adding...' : 'Add Movie'}
        </button>
      </div>

      <div className="space-y-3">
        {movies.length === 0 ? (
          <p className="text-gray-600">No movies added yet.</p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie._id}
              className="flex justify-between items-center border border-gray-200 rounded shadow-sm p-3 bg-white"
            >
              <div>
                <span className="font-medium text-lg">{movie.title}</span>
                <span className="ml-2 text-sm text-gray-600">({movie.genre})</span>
              </div>
              <button
                onClick={() => handleAddFavorite(movie)}
                disabled={favoriting[movie._id]}
                className={`text-sm px-3 py-1 rounded text-white ${
                  favoriting[movie._id]
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {favoriting[movie._id] ? 'Saving...' : 'Add to Favorites'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Movies;
