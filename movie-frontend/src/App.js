import React, { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [movieForm, setMovieForm] = useState({ title: '', genre: '' });

  const apiUrl = 'http://localhost:5000/api';

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setMessage('Registration successful');
    } else {
      setMessage(data.message || 'Registration failed');
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setMessage('Login successful');
    } else {
      setMessage(data.message || 'Login failed');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setMessage('Logged out');
  };

  // Fetch protected message
  const fetchProtectedMessage = async () => {
    if (!token) return;
    const res = await fetch(`${apiUrl}/movies/private`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessage(data.message || 'No message');
  };

  // Add movie
  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage('Login required');
      return;
    }
    const res = await fetch(`${apiUrl}/movies/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movieForm),
    });
    const data = await res.json();
    setMessage(data.message || 'Movie added');
  };

  useEffect(() => {
    fetchProtectedMessage();
  }, [token]);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Movie App</h1>

      {!token ? (
        <>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
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

          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              required
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
            <button type="submit">Login</button>
          </form>
        </>
      ) : (
        <>
          <h2>Welcome, {user?.name}</h2>
          <button onClick={handleLogout}>Logout</button>

          <h3>Add Movie</h3>
          <form onSubmit={handleAddMovie}>
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
        </>
      )}

      <p>{message}</p>
    </div>
  );
}

export default App;
