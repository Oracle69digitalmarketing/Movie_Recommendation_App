const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrending = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};
