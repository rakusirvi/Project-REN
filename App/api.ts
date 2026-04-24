import axios from 'axios';
import Config from 'react-native-config';

import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const setToken = (token: string) => {
  storage.set('accessToken', token);
};

export const getToken = (): string | null => {
  return storage.getString('accessToken') ?? null;
};

export const clearToken = () => {
  storage.remove('accessToken'); // NOT storage.remove()
};

const API = axios.create({
  baseURL: Config.API_BASE_URL || 'http://172.16.57.149:5001/api',
  withCredentials: true,
});

API.interceptors.request.use(req => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${
            Config.API_BASE_URL || 'http://172.16.57.149:5001/api'
          }/auth/reload-token`,
          {},
          { withCredentials: true },
        );
        const newToken = res.data.accessToken;
        setToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return API(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  },
);

export default API;
