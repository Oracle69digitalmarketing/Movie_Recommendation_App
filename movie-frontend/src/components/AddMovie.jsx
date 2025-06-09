import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api, { setAuthToken } from '../services/api';

export default function AddMovie() {
  const { token, user } = useContext(AuthContext);
  const [movie, setMovie] = useState({ title: '', genre: '' });
  const [message, setMessage] = useState('');

  if (token) setAuthToken(token);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/movies/add', movie);
      setMessage(res.data.message || 'Movie added');
      setMovie({ title: '', genre: '' });
    } catch {
      setMessage('Failed to add movie');
    }
  };

  return (
    <div>
      <h3>Add Movie</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
          required
        />
        <input
          name="genre"
          placeholder="Genre"
          value={movie.genre}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Movie</button>
      </form>
      {message && <p>{message}</p>}
      <p>Adding movie as: {user?.name}</p>
    </div>
  );
}
