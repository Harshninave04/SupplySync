import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Return the full response object instead of just response.data
    return response;
  },
  (error) => {
    if (error.response) {
      throw new Error(
        error.response.data?.message || `Request failed with status code ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error('Request setup error: ' + error.message);
    }
  },
);

export default api;
