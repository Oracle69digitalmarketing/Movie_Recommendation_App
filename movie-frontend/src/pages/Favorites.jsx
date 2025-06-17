import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('/api/favorites')
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err));
  }, []);

  const removeFavorite = async (movieId) => {
    await axios.delete(`/api/favorites/${movieId}`);
    setFavorites(favorites.filter(m => m.movieId !== movieId));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">My Favorites</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <div key={movie.movieId} className="border p-2">
            <img src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`} alt={movie.title} />
            <p>{movie.title}</p>
            <button
              className="bg-red-500 text-white px-2 py-1 mt-2 rounded"
              onClick={() => removeFavorite(movie.movieId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
