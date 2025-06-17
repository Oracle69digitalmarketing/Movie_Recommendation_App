// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">
        <Link to="/">MovieApp</Link>
      </h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/movies" className="hover:underline">Movies</Link>
        <Link to="/favorites" className="hover:underline">Favorites</Link>
        {token ? (
          <button onClick={handleLogout} className="hover:underline text-red-400">Logout</button>
        ) : (
          <Link to="/login" className="hover:underline">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
