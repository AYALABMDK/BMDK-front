// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://bmdk-back.onrender.com',
  withCredentials: true,
});

export default api;
