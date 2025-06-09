import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications'); // Backend should return user-based notifications
      setNotifications(res.data);
    } catch {
      alert('Failed to load notifications');
    }
  };

  return (
    <div className="container">
      <h2>Notifications</h2>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((n, index) => (
            <li key={index}>
              <strong>{n.message}</strong> — <small>{new Date(n.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
