import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

export default function Profile() {
  const { token, user } = useContext(AuthContext);
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({ username: user.username || '', email: user.email || '' });
    } else if (token) {
      fetchProfile();
    }
  }, [user, token]);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      setProfile({ username: res.data.username, email: res.data.email });
    } catch {
      setMessage('Failed to load profile');
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/users/settings', profile); // Updated endpoint
      setMessage('Profile updated successfully');
    } catch {
      setMessage('Profile update failed');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate} className="form">
        <input
          name="username"
          placeholder="Username"
          value={profile.username}
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
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
