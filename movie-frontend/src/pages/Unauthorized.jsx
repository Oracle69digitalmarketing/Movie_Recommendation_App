import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">403 - Access Denied</h1>
      <p className="mb-4">You don't have permission to view this page.</p>
      <Link to="/" className="text-blue-500 underline">Return to Home</Link>
    </div>
  );
};

export default Unauthorized;
