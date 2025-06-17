import React, { useEffect, useState, useContext } from 'react';
import api, { setAuthToken } from '../services/api';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', genre: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchMovies();
    } else {
      navigate('/login');
    }
  }, [token]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await api.get('/movies/all');
      setMovies(res.data.movies || []);
    } catch {
      setMessage('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this movie?')) return;
    try {
      await api.delete(`/movies/${id}`);
      setMovies(movies.filter((m) => m._id !== id));
      setMessage('Movie deleted successfully');
    } catch {
      setMessage('Delete failed');
    }
  };

  const startEdit = (movie) => {
    setEditingId(movie._id);
    setEditForm({ title: movie.title, genre: movie.genre });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', genre: '' });
    setMessage('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/movies/${editingId}`, editForm);
      setMovies(
        movies.map((m) =>
          m._id === editingId ? { ...m, ...editForm } : m
        )
      );
      cancelEdit();
      setMessage('Movie updated');
    } catch {
      setMessage('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Movie List</h2>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>

      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie._id} style={{ marginBottom: '1rem' }}>
            {editingId === movie._id ? (
              <form onSubmit={handleUpdate} style={{ display: 'inline' }}>
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  required
                />
                <input
                  value={editForm.genre}
                  onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
                  required
                />
                <button type="submit" disabled={loading}>Save</button>
                <button type="button" onClick={cancelEdit}>Cancel</button>
              </form>
            ) : (
              <>
                <strong>{movie.title}</strong> — {movie.genre}
                <div style={{ marginTop: '0.3rem' }}>
                  <button onClick={() => startEdit(movie)}>Edit</button>
                  <button onClick={() => handleDelete(movie._id)}>Delete</button>
                  <button
                    onClick={() => {
                      const link = `${window.location.origin}/movie/${movie._id}`;
                      navigator.clipboard.writeText(link);
                      alert('Link copied!');
                    }}
                    style={{ marginLeft: '8px', color: 'blue', textDecoration: 'underline' }}
                  >
                    Share
                  </button>
                  <button
                    onClick={() => {
                      const embedCode = `<iframe src="${window.location.origin}/movie/${movie._id}" width="600" height="400" frameborder="0" allowfullscreen></iframe>`;
                      navigator.clipboard.writeText(embedCode);
                      alert('Embed code copied!');
                    }}
                    style={{ marginLeft: '8px', color: 'green', textDecoration: 'underline' }}
                  >
                    Copy Embed Code
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
