import { useState, createContext, useContext } from "react";
import toast from "react-hot-toast";
import API, { setToken, clearToken } from "../api";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getMe = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/auth/get-me");
      setUser(res.data.data);
      console.log(res.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data, role) => {
    try {
      setIsLoading(true);
      const res = await API.post(`/auth/${role}/login`, data);
      setToken(res.data.accessToken);
      setUser(res.data.data);
      setIsAuthenticated(true);
      toast.success("Login Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.log("Logout API failed");
    }

    // always clear
    clearToken();
    setUser(null);
    setIsAuthenticated(false);

    toast.success("Logout Successfully");
  };

  const signup = async (data) => {
    try {
      const res = await API.post("/auth/admin/signup", data);
      toast.success(res.data.message);
      return res.data; // Return data to the component
    } catch (error) {
      const msg = error.response?.data?.message || "Email Already Exists";
      toast.error(msg);
      return null; // Return null so handleSignUp knows it failed
    } finally {
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      setIsLoading(true);
      const res = await API.post("/auth/admin/authenticate", { email, otp });
      setToken(res.data.accessToken);
      toast.success(res.data.message);
      setIsAuthenticated(true);
      return true; // Success
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid Security Token";
      toast.error(msg);
      return false; // Failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signup,
        getMe,
        login,
        logout,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
