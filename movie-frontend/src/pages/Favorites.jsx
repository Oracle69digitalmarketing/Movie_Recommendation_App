import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 8;
  const token = localStorage.getItem('token');

  const fetchFavorites = async () => {
    try {
      const res = await axios.get('/api/users/favorites', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, genre },
      });
      setFavorites(res.data.results);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load favorites');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [page, genre]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Favorite Movies</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by genre..."
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(1);
          }}
          className="border px-2 py-1 rounded"
        />
      </div>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {favorites.map((movie, index) => (
              <li key={index} className="bg-white shadow p-2 rounded text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.title}
                  className="w-full rounded"
                />
                <h3 className="mt-2 text-sm font-medium">{movie.title}</h3>
                <p className="text-xs text-gray-500">{movie.genre}</p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2 justify-center">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={page * limit >= total}
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-gray-200 px-3 py-1 rounded disabled
