import React from "react";
import { useAuth } from "../ContextAPI/AuthContext";
import AdminDashboard from "./DashBoard/AdminDashboard";
import ManagerDashboard from "./DashBoard/ManagerDashborad";
import EmployeeDashboard from "./DashBoard/EmployeeDashboard";
import { AdminProvider } from "../ContextAPI/AdminContext";
const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <AdminProvider>
        {user.role === "admin" && <AdminDashboard />}
        {user.role === "manager" && <ManagerDashboard />}
        {user.role === "employee" && <EmployeeDashboard />}
      </AdminProvider>
    </>
  );
};
export default Home;
