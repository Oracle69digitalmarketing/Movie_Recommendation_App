import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import api, { setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { token, user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [movieForm, setMovieForm] = useState({ title: '', genre: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchProtectedMessage();
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

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/movies/add', movieForm);
      setMessage(res.data.message || 'Movie added');
      setMovieForm({ title: '', genre: '' });
    } catch {
      setMessage('Failed to add movie');
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

      <h3>Add Movie</h3>
      <form onSubmit={handleAddMovie} className="form">
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
        <button type="submit">Add Movie</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
