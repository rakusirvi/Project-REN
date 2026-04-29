import { useContext, createContext, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [managers, setManager] = useState([]);
  const [managerEmployess, setManagerEmployess] = useState([]);
  const [pendingManagers, setPendingManagers] = useState([]);
  const [managerLeaveRequests, setManagerLeaveRequests] = useState([]);

  const getManagers = async () => {
    try {
      const res = await API.get("/admin/get-all-managers");
      console.log("list of manager:", res.data.data);
      setManager(res.data.data);
    } catch (error) {
      console.error("Fetch Managers Error:", error);
    }
  };

  const AddManager = async (data) => {
    try {
      const res = await API.post("/admin/add-manager", data);
      toast.success(res.data.message || "Manager created, Joining Token sent");
      await getManagers();
    } catch (error) {
      console.error("Add Manager Error:", error);
      const errorMsg = error.response?.data?.message || "Internal Server Error";

      toast.error(
        typeof errorMsg === "string" ? errorMsg : "Validation Failed",
      );
      return false;
    }
  };

  const DeleteManager = async (id) => {
    try {
      const res = await API.delete(`/admin/delete-manager/${id}`);
      toast.success(res.data.message);
      await getManagers();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getManagerEmployess = async (id) => {
    try {
      const res = await API.get(`/admin/getManagerEmployee/${id}`);
      if (!res.data.data || res.data.data.length === 0) {
        setManagerEmployess([]);
        return;
      }
      setManagerEmployess(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingManagers = async () => {
    try {
      const res = await API.get("/admin/get-pending-managers");
      console.log("list of pending manager:", res.data.data);
      setPendingManagers(res.data.data);
    } catch (error) {
      console.error("Fetch Managers Error:", error);
    }
  };

  const getManagerLeaveRequests = async () => {
    try {
      const res = await API.get("/admin/manager-leave-requests");
      setManagerLeaveRequests(res.data.data);
    } catch (error) {
      console.error("Fetch Manager Leave Requests Error:", error);
    }
  };

  const respondLeaveRequest = async (id, status, response) => {
    try {
      await API.put(`/admin/respond-manager-leave/${id}`, {
        status,
        response,
      });
      toast.success("Leave " + status);
      await getManagerLeaveRequests();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const resendManagerInvitation = async (id) => {
    try {
      const res = await API.post(`/admin/resend-manager-invitation/${id}`);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        managers,
        getManagers,
        AddManager,
        managerEmployess,
        getManagerEmployess,
        DeleteManager,
        pendingManagers,
        getPendingManagers,
        resendManagerInvitation,
        getManagerLeaveRequests,
        managerLeaveRequests,
        respondLeaveRequest,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => useContext(AdminContext);
