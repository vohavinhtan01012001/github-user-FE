import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import useAuthStore from '@/stores/auth.store';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const shouldAdd = config.headers?.['should-add-phone-number'];
      
      if (shouldAdd) {
        const phoneNumber = useAuthStore.getState().phoneNumber;
        if (phoneNumber) {
          config.headers['x-phone-number'] = phoneNumber;
        }
      }
  
      delete config.headers?.['should-add-phone-number'];
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          useAuthStore.getState().logout();
          break;
        case 403:
          break;
        case 404:
          break;
        case 500:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
