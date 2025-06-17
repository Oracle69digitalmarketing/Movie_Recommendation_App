import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // ✅ add this
  withCredentials: true, // optional, if you're using cookies
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
