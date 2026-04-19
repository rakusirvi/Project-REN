import React, { useContext, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [managers, setManager] = useState([]);

  const getManagers = async () => {
    try {
      const res = await API.get("/admin/get-all-managers");
      setManager(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const AddManager = async (data) => {
    try {
      const res = await API.post("/admin/add-manager", data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <AdminContext.Provider value={{ managers, getManagers, AddManager }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
