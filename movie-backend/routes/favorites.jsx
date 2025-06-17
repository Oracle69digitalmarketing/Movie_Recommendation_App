// src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('/api/users/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data || [];
        setFavorites(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load favorites');
      }
    };
    fetchFavorites();
  }, [token]);

  useEffect(() => {
    let result = [...favorites];
    if (genre.trim()) {
      result = result.filter(m => m.genre?.toLowerCase().includes(genre.toLowerCase()));
    }
    if (sort === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setFiltered(result);
    setCurrentPage(1);
  }, [genre, sort, favorites]);

  const handleRemove = async (movieId) => {
    try {
      await axios.delete(`/api/users/favorites/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(prev => prev.filter(m => m.movieId !== movieId));
      toast.success('Removed from favorites');
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove movie');
    }
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Favorite Movies</h2>

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Filter by Genre"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          className="border px-3 py-1 rounded"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="recent">Most Recent</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>

      {paginated.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {paginated.map((movie, index) => (
            <li key={index} className="bg-white shadow p-2 rounded text-center relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
                className="w-full rounded"
              />
              <h3 className="mt-2 text-sm font-medium">{movie.title}</h3>
              <button
                onClick={() => handleRemove(movie.movieId)}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Prev
          </button>
          <span className="px-3 py-1 bg-gray-100 rounded">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
