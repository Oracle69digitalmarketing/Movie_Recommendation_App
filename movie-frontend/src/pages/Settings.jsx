import React, { useState, useContext, useEffect } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

export default function Settings() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', username: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({ email: user.email, username: user.username });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/settings', formData);
      setMessage('Settings updated successfully.');
    } catch {
      setMessage('Update failed.');
    }
  };

  return (
    <div className="container">
      <h2>Settings</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
