import axios from 'axios';
import axiosRetry from 'axios-retry';

const api = axios.create({
  baseURL: '/api/',
});

axiosRetry(api, {
  retries: 3,
  retryDelay: () => 500,
});

export default api;
