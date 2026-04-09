// api.js
import axios from "axios";

let accessToken = null;

export const setToken = (token) => {
  accessToken = token;
};

export const clearToken = () => {
  accessToken = null;
};

const API = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true, // for refresh token cookie
});

API.interceptors.request.use((req) => {
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5001/api/auth/reload-token",
          {},
          { withCredentials: true },
        );

        const newToken = res.data.accessToken;
        setToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return API(originalRequest); // retry request
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(err);
  },
);

export default API;
