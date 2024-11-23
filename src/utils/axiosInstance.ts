import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  params: {
    api_key: import.meta.env.VITE_FRED_API_KEY,
    file_type: 'json',
  },
});

export default axiosInstance;
