import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

export default function Profile() {
  const { token, user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      setProfile(res.data);
    } catch {
      setMessage('Failed to load profile');
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/profile', profile);
      setMessage('Profile updated');
    } catch {
      setMessage('Update failed');
    }
  };

  return (
    <div className="container">
      <h2>Profile</h2>
      <form onSubmit={handleUpdate} className="form">
        <input
          name="name"
          placeholder="Name"
          value={profile.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          required
          type="email"
        />
        <button type="submit">Update</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
