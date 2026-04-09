import React from "react";
import { useAuth } from "../ContextAPI/AuthContext";
const Home = () => {
  const { user, isAuthenticated, getMe, isLoading, logout } = useAuth();
  return (
    <>
      <div>Home</div>

      <div>
        <h1>{user.name}</h1>
        <p>{user.company_email}</p>
        <p>{user.role}</p>
      </div>

      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default Home;
