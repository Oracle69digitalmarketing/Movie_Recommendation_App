import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>404 - Page Not Found</h1>
      <p>Looks like this page doesn't exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
