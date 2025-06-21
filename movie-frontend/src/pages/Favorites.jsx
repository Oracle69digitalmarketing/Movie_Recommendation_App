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
      <h1 className="text-xl font-bold mb-4">Your Favorite Movies</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <div key={movie.id} className="border p-2 rounded">
            <h2 className="font-semibold">{movie.title}</h2>
            <p>{movie.genre}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
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
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Favorites;
