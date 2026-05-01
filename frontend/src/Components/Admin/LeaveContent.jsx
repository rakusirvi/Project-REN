import React, { useEffect } from "react";
import {
  Check,
  X,
  Calendar as CalIcon,
  Bell,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  UploadCloud,
  Trash2,
  Eye,
  Dot,
} from "lucide-react";

import { useAdmin } from "../../ContextAPI/AdminContext";
import LeaveCard from "../LeaveSection/LeaveCard";
import Callendercard from "../LeaveSection/Callendercard";
import RecentLeaveCard from "../LeaveSection/recentLeaveCard";

const AdminLeaveDashboard = () => {
  const { getManagerLeaveRequests, managerLeaveRequests } = useAdmin();

  useEffect(() => {
    try {
      getManagerLeaveRequests();
    } catch (err) {
      console.log(err);
    }
  }, [getManagerLeaveRequests]);

  const requests = managerLeaveRequests.filter(
    (req) => req.status === "pending",
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-6 py-1  text-white animate-in fade-in duration-500">
      {/* LEFT: LEAVE REQUESTS */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manager Requests</h1>
          <h1 className="text-xl font-bold">
            Total Request :-
            <span className="text-blue-500 ml-12 mr-12">{requests.length}</span>
          </h1>
        </div>

        <div className="grid overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar gap-6">
          {requests && requests.length > 0 ? (
            requests.map((req) => <LeaveCard key={req._id} req={req} />)
          ) : (
            <div className="text-center h-20 md:h-40 text-white/50 w-full flex justify-center items-center">
              No Requests Found
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-96 space-y-4">
        {/* HOLIDAY PLANNER */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl  backdrop-blur-xl shadow-2xl">
          <Callendercard />
        </div>

        {/* ACTION LOGS */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-3 backdrop-blur-xl shadow-2xl flex flex-col h-[400px]">
          {/* Header for the Container */}
          <div className="flex items-center justify-between mb-6 shrink-0">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Bell className="text-blue-500" size={18} />
              Action Logs
            </h2>
            <span className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-white/40 font-bold uppercase tracking-widest">
              History
            </span>
          </div>

          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto  pr-2 space-y-2 custom-scrollbar">
            {managerLeaveRequests.filter(
              (r) => r.status === "approved" || r.status === "rejected",
            ).length > 0 ? (
              managerLeaveRequests
                .filter(
                  (r) => r.status === "approved" || r.status === "rejected",
                )
                .map((log) => <RecentLeaveCard key={log._id} log={log} />)
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/20 text-sm gap-2 opacity-50">
                <FileText size={24} />
                <p className="font-bold uppercase tracking-widest text-[10px]">
                  No past requests found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaveDashboard;
