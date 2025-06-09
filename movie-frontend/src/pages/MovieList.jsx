import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', genre: '' });
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await api.get('/movies/all');
      setMovies(res.data);
    } catch {
      alert('Failed to fetch movies');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this movie?')) return;
    try {
      await api.delete(`/movies/${id}`);
      setMovies(movies.filter((m) => m._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  const startEdit = (movie) => {
    setEditingId(movie._id);
    setEditForm({ title: movie.title, genre: movie.genre });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', genre: '' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/movies/${editingId}`, editForm);
      setMovies(
        movies.map((m) =>
          m._id === editingId ? { ...m, ...editForm } : m
        )
      );
      cancelEdit();
    } catch {
      alert('Update failed');
    }
  };

  return (
    <div className="container">
      <h2>Movie List</h2>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {editingId === movie._id ? (
              <form onSubmit={handleUpdate}>
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
                <button type="submit">Save</button>
                <button type="button" onClick={cancelEdit}>Cancel</button>
              </form>
            ) : (
              <>
                <strong>{movie.title}</strong> — {movie.genre}
                <button onClick={() => startEdit(movie)}>Edit</button>
                <button onClick={() => handleDelete(movie._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
