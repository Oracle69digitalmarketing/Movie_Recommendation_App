import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="p-4 text-center">
    <h1 className="text-3xl font-bold mb-4">Welcome to MovieApp</h1>
    <p className="mb-4">Search, save, and explore your favorite movies.</p>
    <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Login</Link>
    <Link to="/register" className="bg-gray-300 px-4 py-2 rounded">Register</Link>
  </div>
);

export default Home;
