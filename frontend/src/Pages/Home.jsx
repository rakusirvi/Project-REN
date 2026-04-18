import React from "react";
import { useAuth } from "../ContextAPI/AuthContext";
import AdminDashboard from "./DashBoard/AdminDashboard";
import ManagerDashboard from "./DashBoard/ManagerDashborad";
import EmployeeDashboard from "./DashBoard/EmployeeDashboard";
const Home = () => {
  const { user, isAuthenticated, getMe, isLoading, logout } = useAuth();

  return (
    <>
      {user.role === "admin" && <AdminDashboard />}
      {user.role === "manager" && <ManagerDashboard />}
      {user.role === "employee" && <EmployeeDashboard />}
    </>
  );
};
export default Home;
