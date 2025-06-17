// src/pages/Movies.jsx
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('/api/movies/private', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, [token]);

  const handleAdd = async () => {
    try {
      await axios.post(
        '/api/movies/add',
        { title, genre },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTitle('');
      setGenre('');
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddFavorite = async (movie) => {
    try {
      await axios.post('/api/users/favorites', {
        movieId: movie._id,
        title: movie.title,
        posterPath: movie.posterPath || '',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`${movie.title} added to favorites`);
    } catch (err) {
      console.error(err);
      alert('Could not add to favorites');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">My Movies</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add Movie
        </button>
      </div>

      <ul className="list-disc pl-6">
        {movies.map((movie, index) => (
          <li key={index} className="mb-2">
            {movie.title} - {movie.genre}
            <button
              onClick={() => handleAddFavorite(movie)}
              className="ml-4 bg-green-600 text-white px-2 py-1 rounded text-sm"
            >
              Favorite
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
