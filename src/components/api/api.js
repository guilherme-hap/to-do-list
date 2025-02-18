import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7068',
});

let accessToken = '';

export const setAccessToken = (token) => {
  accessToken = token;
};

// Add an interceptor for all requests
api.interceptors.request.use(config => {
  // Add the access token to the Authorization header
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;