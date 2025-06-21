import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Use Axios directly
import { setAuthToken } from '../services/api'; // Only import named exports from api.js

export default function AddMovie() {
  const [form, setForm] = useState({ title: '', genre: '' });
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAuthToken(token); // set token if needed
      const res = await axios.post('/movies/add', form);
      setMessage('Movie added');
      setForm({ title: '', genre: '' });
      navigate('/dashboard');
    } catch (err) {
      setMessage('Add movie failed');
    }
  };

  return (
    <div className="container">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          required
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          required
          type="text"
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
