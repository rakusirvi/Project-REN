import { useState, createContext, useContext, ReactNode } from 'react';
import API from '../../api';
import { setToken, clearToken } from '../../api';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isLoading: boolean;
  getMe: () => void;
  login: (data: any, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getMe = async () => {
    try {
      setIsLoading(true);
      const res = await API.get('/auth/get-me');
      setUser(res.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: any, role: string) => {
    try {
      setIsLoading(true);
      const res = await API.post(`/auth/${role}/login`, data);
      setToken(res.data.accessToken);
      setUser(res.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (error: any) {
      console.log(error.message);
    }
    clearToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  //   const signup = async data => {
  //     try {
  //       const res = await API.post('/auth/admin/signup', data);
  //       toast.success(res.data.message);
  //       return res.data; // Return data to the component
  //     } catch (error) {
  //       const msg = error.response?.data?.message || 'Email Already Exists';
  //       toast.error(msg);
  //       return null; // Return null so handleSignUp knows it failed
  //     } finally {
  //     }
  //   };

  //   const verifyOtp = async (email, otp) => {
  //     try {
  //       setIsLoading(true);
  //       const res = await API.post('/auth/admin/authenticate', { email, otp });
  //       setToken(res.data.accessToken);
  //       toast.success(res.data.message);
  //       setIsAuthenticated(true);
  //       return true; // Success
  //     } catch (error) {
  //       const msg = error.response?.data?.message || 'Invalid Security Token';
  //       toast.error(msg);
  //       return false; // Failure
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   const setPassword = async (role, data) => {
  //     try {
  //       const res = await API.post(`/auth/${role}/set-password`, data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isAuthenticated,
        setIsAuthenticated,
        getMe,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }

  return context;
};
