import React, { useEffect, useState } from 'react';
import { fetchTrending } from '../services/tmdb';
import { toast } from 'react-toastify';
import axios from '../utils/axiosInstance';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriting, setFavoriting] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTrending()
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load trending movies');
        setLoading(false);
      });
  }, []);

  const handleFavorite = async (movie) => {
    if (!token) {
      toast.warn('Please log in to favorite movies');
      return;
    }

    if (favoriting[movie.id]) return;

    setFavoriting(prev => ({ ...prev, [movie.id]: true }));

    try {
      await axios.post('/api/users/favorites', {
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`${movie.title} added to favorites`);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.info(`${movie.title} is already in favorites`);
      } else {
        toast.error('Failed to add favorite');
      }
    } finally {
      setFavoriting(prev => ({ ...prev, [movie.id]: false }));
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔥 Trending Movies</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white shadow rounded p-2 relative group">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded w-full h-72 object-cover"
              />
              <h3 className="mt-2 text-center text-sm font-medium">{movie.title}</h3>

              <div className="text-center mt-2 space-x-2 text-xs">
                <button
                  onClick={() => {
                    const link = `${window.location.origin}/movie/${movie.id}`;
                    navigator.clipboard.writeText(link);
                    alert('Link copied!');
                  }}
                  className="text-blue-600 underline"
                >
                  Share
                </button>

                <button
                  onClick={() => {
                    const embedCode = `<iframe src="${window.location.origin}/movie/${movie.id}" width="600" height="400" frameborder="0" allowfullscreen></iframe>`;
                    navigator.clipboard.writeText(embedCode);
                    alert('Embed code copied!');
                  }}
                  className="text-green-600 underline"
                >
                  Copy Embed Code
                </button>
              </div>

              <button
                onClick={() => handleFavorite(movie)}
                disabled={favoriting[movie.id]}
                className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${
                  favoriting[movie.id]
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {favoriting[movie.id] ? 'Saving...' : '❤️'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
