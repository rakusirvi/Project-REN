import { create } from "zustand";
import API, { setToken, clearToken } from "../api";
const useAuthStore = create((set) => ({
  user: null,
  isLogingIn: false,
  isAuthenticated: false,

  Login: (role, data) => {
    try {
      set({ isLogingIn: true });
      const res = API.post(`auth/${role}/login`, data);
      setToken(res.data.accessToken);
      set({ user: res.data.user, isAuthenticated: true, isLogingIn: false });
    } catch (error) {
      set({ isLogingIn: false });
    }
  },

  Logout: () => {
    clearToken();
    set({ user: null });
  },
}));
