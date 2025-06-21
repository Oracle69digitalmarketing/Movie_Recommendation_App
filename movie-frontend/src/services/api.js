const API_BASE = `${process.env.REACT_APP_BASE_URL}/api/users`;

// ✅ Update user settings
export async function updateUserSettings(data, token) {
  const response = await fetch(`${API_BASE}/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// ✅ Reset user password
export async function resetUserPassword(data, token) {
  const response = await fetch(`${API_BASE}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// ✅ Login user
export async function loginUser(credentials) {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

// ✅ Register user
export async function registerUser(data) {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

import axios from 'axios';

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
