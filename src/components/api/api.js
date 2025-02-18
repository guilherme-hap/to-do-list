import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7068',
});

let accessToken = '';

export const setAccessToken = (token) => {
  accessToken = token;
};

api.interceptors.request.use(config => {

    if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;