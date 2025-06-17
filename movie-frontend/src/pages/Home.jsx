import React, { useEffect, useState } from 'react';
import { fetchTrending } from '../services/tmdb';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrending()
      .then(setMovies)
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map(movie => (
          <div key={movie.id} className="bg-white shadow rounded p-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded w-full"
            />
            <h3 className="mt-2 text-center text-sm">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
