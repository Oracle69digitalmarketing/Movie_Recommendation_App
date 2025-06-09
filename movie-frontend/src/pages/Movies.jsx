// We'll proceed step by step. Let's enhance the current app with: // 1. Tailwind CSS setup // 2. Movie CRUD pages // 3. JWT error handling

// --- STEP 1: Tailwind CSS Setup --- // 1. Install Tailwind dependencies: // npm install -D tailwindcss postcss autoprefixer // npx tailwindcss init -p

// 2. Update tailwind.config.js module.exports = { content: ["./src/**/*.{js,jsx,ts,tsx}"], theme: { extend: {}, }, plugins: [], };

// 3. Update src/index.css @tailwind base; @tailwind components; @tailwind utilities;

// --- STEP 2: Movie CRUD Pages ---

// src/pages/Movies.jsx import React, { useState, useEffect } from 'react'; import axios from 'axios';

const Movies = () => { const [movies, setMovies] = useState([]); const [title, setTitle] = useState(''); const [genre, setGenre] = useState(''); const token = localStorage.getItem('token');

useEffect(() => { axios.get('/api/movies/private', { headers: { Authorization: Bearer ${token} }, }) .then(res => setMovies(res.data)) .catch(err => console.error(err)); }, [token]);

const handleAdd = async () => { try { await axios.post('/api/movies/add', { title, genre }, { headers: { Authorization: Bearer ${token} }, }); setTitle(''); setGenre(''); window.location.reload(); } catch (err) { console.error(err); } };

return ( <div className="p-4"> <h2 className="text-2xl mb-4">My Movies</h2> <div className="mb-4"> <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border px-2 py-1 mr-2" /> <input type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} className="border px-2 py-1 mr-2" /> <button
onClick={handleAdd}
className="bg-blue-500 text-white px-4 py-1 rounded"
> Add Movie </button> </div> <ul className="list-disc pl-6"> {movies.map((movie, index) => ( <li key={index}>{movie.title} - {movie.genre}</li> ))} </ul> </div> ); };

export default Movies;

// --- STEP 3: JWT Error Handling ---

// src/utils/axiosInstance.js import axios from 'axios';

const instance = axios.create({});

instance.interceptors.response.use( response => response, error => { if (error.response && error.response.status === 401) { localStorage.removeItem('token'); window.location.href = '/login'; } return Promise.reject(error); } );

export default instance;

// Then, replace all axios usage with the instance: // import axios from '../utils/axiosInstance';

