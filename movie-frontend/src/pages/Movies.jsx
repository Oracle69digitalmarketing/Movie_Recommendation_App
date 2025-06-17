import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/movies/private', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setMovies(res.data))
    .catch(err => console.error(err));
  }, [token]);

  const handleAdd = async () => {
    try {
      await axios.post('/api/movies/add', { title, genre }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Movie added');
      setTitle('');
      setGenre('');
      window.location.reload();
    } catch (err) {
      toast.error('Failed to add movie');
    }
  };

  const handleFavorite = async (movie) => {
    try {
      await axios.post('/api/users/favorite', movie, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Added to favorites');
    } catch (err) {
      toast.error('Failed to favorite movie');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">My Movies</h2>
      <div className="mb-4">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border px-2 py-1 mr-2" />
        <input type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} className="border px-2 py-1 mr-2" />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-1 rounded">Add Movie</button>
      </div>
      <ul className="list-disc pl-6">
        {movies.map((movie, index) => (
          <li key={index}>
            {movie.title} - {movie.genre}
            <button onClick={() => handleFavorite(movie)} className="ml-2 text-sm text-blue-600 underline">Favorite</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
