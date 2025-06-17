import axios from '../utils/axiosinstance';

export const getMovies = async () => {
  const res = await axios.get('/api/movies');
  return res.data;
};

export const getMovieById = async (id) => {
  const res = await axios.get(`/api/movies/${id}`);
  return res.data;
};

export const addMovie = async (data) => {
  const res = await axios.post('/api/movies', data);
  return res.data;
};
