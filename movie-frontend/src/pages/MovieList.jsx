import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) fetchMovies();
  }, [token]);

  const fetchMovies = async () => {
    try {
      const res = await api.get('/movies/all');
      setMovies(res.data.movies);
    } catch {
      setMessage('Failed to fetch movies');
    }
  };

  return (
    <div className="container">
      <h2>All Movies</h2>
      {message && <p>{message}</p>}
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie._id} className="movie-item">
              <strong>{movie.title}</strong> <em>({movie.genre})</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
