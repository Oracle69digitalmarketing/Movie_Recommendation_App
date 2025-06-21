import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthToken } from '../services/api';
import AuthContext from '../context/AuthContext';

export default function AddMovie() {
  const [form, setForm] = useState({ title: '', genre: '' });
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAuthToken(token);
      const res = await axios.post('/movies/add', form);
      if (res.status === 201 || res.status === 200) {
        setMessage('Movie added successfully');
        setForm({ title: '', genre: '' });
        navigate('/dashboard');
      } else {
        setMessage('Failed to add movie');
      }
    } catch {
      setMessage('Add movie failed');
    }
  };

  return (
    <div className="container">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          required
          placeholder="Genre"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        />
        <button type="submit">Add Movie</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
