import React, { useEffect, useState } from 'react';
import { fetchTrending } from '../services/tmdb';
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [favoriting, setFavoriting] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTrending()
      .then(setMovies)
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load trending movies');
      });
  }, []);

  const handleFavorite = async (movie) => {
    if (!token) return toast.warning('Please log in to favorite movies');

    setFavoriting(movie.id);

    try {
      await axios.post(
        '/api/users/favorites',
        {
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`Added "${movie.title}" to favorites`);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.info(`"${movie.title}" is already in your favorites`);
      } else {
        toast.error('Failed to add favorite');
        console.error(err);
      }
    } finally {
      setFavoriting(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to MovieApp</h1>
      <h2 className="text-2xl mb-4">Trending Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow rounded p-2 flex flex-col items-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded w-full"
            />
            <h3 className="mt-2 text-center text-sm font-medium">{movie.title}</h3>
            <button
              onClick={() => handleFavorite(movie)}
              disabled={favoriting === movie.id}
              className={`mt-2 text-white text-xs px-3 py-1 rounded ${
                favoriting === movie.id
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
            >
              {favoriting === movie.id ? 'Adding...' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
