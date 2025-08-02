import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/admin",
  timeout: 180000,
  headers: {
    "Cache-control": "no-cache",
    "Content-type": "application/json"
  }
});

axiosInstance.interceptors.request.use((config) => {
  const tokenData = localStorage.getItem('adminInfo');
  const parsedToken = tokenData ? JSON.parse(tokenData) : null;
  if (parsedToken) {
    config.headers.Authorization = `Bearer ${parsedToken.token}`;
  }
  return config;
});

export default axiosInstance;