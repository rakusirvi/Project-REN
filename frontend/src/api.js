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
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default API;
