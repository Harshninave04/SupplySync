import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for global error handling
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Backend returned an error (4xx/5xx)
      throw new Error(
        error.response.data.message || 'Request failed with status code ' + error.response.status,
      );
    } else if (error.request) {
      // No response received (network error)
      throw new Error('Network error. Please check your connection.');
    } else {
      // Other errors (e.g., Axios config issues)
      throw new Error('Request setup error: ' + error.message);
    }
  },
);

export default api;
