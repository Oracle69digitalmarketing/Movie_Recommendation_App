import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { setAuthToken } from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(form)
}).then(res => res.json());
      if (res.data.token) {
        setAuthToken(res.data.token);
        login(res.data.token, res.data.user);
        navigate('/dashboard');
      } else {
        setMessage(res.data.message || 'Registration failed');
      }
    } catch {
      setMessage('Server error');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
}
