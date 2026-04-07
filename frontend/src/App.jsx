import React, { useEffect } from "react";
import useAuthStore from "./Store/useAuthStore";
import API from "./api";

import Login from "./Pages/Login";
import HomePage from "./Pages/Home";

const App = () => {

  const checkAuth = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      useAuthStore.getState().finishChecking();
      return;
    }

    try {
      const res = await API.get("/get-me"); // backend endpoint required
      const user = res.data.data;
      const role = res.data.data.role;

      useAuthStore.getState().setAuth(user, role);
    } catch (err) {
      useAuthStore.getState().logout();
    }
  };


  useEffect(() => {
    checkAuth();
  }, []);


  if (isChecking) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 font-sans tracking-[0.3em] uppercase text-xs font-black text-slate-300 italic">
        REN / Synchronizing Ecosystem...
      </div>
    );
  }

  return <div>{isAuthenticated ? <HomePage /> : <Login />}</div>;
};

export default App;
