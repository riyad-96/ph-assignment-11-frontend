import { auth } from '@/configs/firebase.config';
import axios from 'axios';

const securedAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_server_url,
});

securedAxiosInstance.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_server_url,
});

export function serverAPI(secured?: boolean) {
  if (secured) {
    return securedAxiosInstance;
  }
  return axiosInstance;
}
