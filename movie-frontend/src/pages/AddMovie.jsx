import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddMovie() {
  const { token } = useContext(AuthContext);
  const [movieForm, setMovieForm] = useState({ title: '', genre: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovieForm({ ...movieForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage('You must be logged in to add a movie.');
      return;
    }

    try {
      const res = await api.post('/movies/add', movieForm);
      setMessage(res.data.message || 'Movie added successfully');
      setMovieForm({ title: '', genre: '' });
      // Optionally redirect after add
      // navigate('/movies');
    } catch {
      setMessage('Failed to add movie');
    }
  };

  return (
    <div className="container">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="title"
          placeholder="Title"
          value={movieForm.title}
          onChange={handleChange}
          required
        />
        <input
          name="genre"
          placeholder="Genre"
          value={movieForm.genre}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Movie</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
