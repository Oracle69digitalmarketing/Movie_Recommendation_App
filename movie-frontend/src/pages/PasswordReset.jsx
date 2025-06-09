import React, { useState } from 'react';
import api from '../services/api';

export default function PasswordReset() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/reset-password', {
        currentPassword,
        newPassword,
      });
      setMessage('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
    } catch {
      setMessage('Password reset failed.');
    }
  };

  return (
    <div className="container">
      <h2>Password Reset</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleReset}>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
