import React from "react";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./ContextAPI/AuthContext";
import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // Add useLocation
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const App = () => {
  const { isLoading, isAuthenticated, getMe } = useAuth();
  const location = useLocation(); // Get the current URL path

  useEffect(() => {
    getMe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0a0a]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/signup" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster position="bottom-right" duration={8000} />
    </>
  );
};

export default App;
