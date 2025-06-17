// src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('/api/users/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load favorites');
      }
    };

    fetchFavorites();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((movie, index) => (
            <li key={index} className="bg-white shadow p-2 rounded text-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
                className="w-full rounded"
              />
              <h3 className="mt-2 text-sm font-medium">{movie.title}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
