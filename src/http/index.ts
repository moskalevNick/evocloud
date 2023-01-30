import axios from 'axios';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use((config) => {
  if (config && config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access-token')}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('access-token', response.data.access_token);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  },
);

export default $api;
