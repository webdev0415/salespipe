import axios from 'axios';
const baseURL = process.env.REACT_APP_API_KEY || 'localhost:8080';
const TOKEN_KEY = process.env.TOKEN_KEY || 'SalesPipeTokenKey';
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
