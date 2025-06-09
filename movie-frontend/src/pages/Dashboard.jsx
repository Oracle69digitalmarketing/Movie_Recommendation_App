import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import api, { setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { token, user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [movieForm, setMovieForm] = useState({ title: '', genre: '' });
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchProtectedMessage();
      fetchMovies();
    }
  }, [token]);

  const fetchProtectedMessage = async () => {
    try {
      const res = await api.get('/movies/private');
      setMessage(res.data.message);
    } catch {
      setMessage('Failed to fetch message');
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await api.get('/movies');
      setMovies(res.data);
    } catch {
      setMessage('Failed to fetch movies');
    }
  };

  const handleAddOrUpdateMovie = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/movies/${editingId}`, movieForm);
        setMessage('Movie updated');
      } else {
        await api.post('/movies/add', movieForm);
        setMessage('Movie added');
      }
      setMovieForm({ title: '', genre: '' });
      setEditingId(null);
      fetchMovies();
    } catch {
      setMessage('Failed to save movie');
    }
  };

  const handleEdit = (movie) => {
    setMovieForm({ title: movie.title, genre: movie.genre });
    setEditingId(movie._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/movies/${id}`);
      setMessage('Movie deleted');
      fetchMovies();
    } catch {
      setMessage('Delete failed');
    }
  };

  const handleLogout = () => {
    logout();
    setAuthToken(null);
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name}</p>
      <button onClick={handleLogout}>Logout</button>

      <h3>{editingId ? 'Edit Movie' : 'Add Movie'}</h3>
      <form onSubmit={handleAddOrUpdateMovie} className="form">
        <input
          required
          placeholder="Title"
          value={movieForm.title}
          onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
        />
        <input
          required
          placeholder="Genre"
          value={movieForm.genre}
          onChange={(e) => setMovieForm({ ...movieForm, genre: e.target.value })}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <p>{message}</p>

      <h3>My Movies</h3>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <strong>{movie.title}</strong> — {movie.genre}
            <button onClick={() => handleEdit(movie)}>Edit</button>
            <button onClick={() => handleDelete(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
