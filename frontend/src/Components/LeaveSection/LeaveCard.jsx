import React, { useState } from "react";
import { timeFormatter } from "../../Libs/lib";
import { useAdmin } from "../../ContextAPI/AdminContext";
import { Calendar as CalIcon, ChevronRight } from "lucide-react";
const LeaveCard = ({ req }) => {
  const [processingId, setProcessingId] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { respondLeaveRequest } = useAdmin();

  const handleResponse = async (id, status) => {
    if (!adminResponse && status === "rejected") {
      alert("Please provide a reason for rejection.");
      return;
    }

    setLoading(true);
    try {
      await respondLeaveRequest(id, status, adminResponse);
      setProcessingId(null);
      setAdminResponse("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="bg-white/[0.02] border border-white/10 rounded-none p-6 space-y-4 hover:border-white/30 transition-all"
      style={{
        borderLeftWidth: "4px",
        borderLeftColor: req.status === "approved" ? "#10b981" : "#3b82f6",
      }}
    >
      {/* TOP SECTION: User Info & Initial Actions */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-white text-black font-bold flex items-center justify-center text-lg">
            {req.applicant_id.name[0]}
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight">
              {req.applicant_id.name}
            </h3>
            <p className="text-sm text-white/40">{req.applicant_id.email}</p>
          </div>
        </div>

        {/* Toggle Response View */}
        {processingId !== req._id && (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setProcessingId(req._id);
                setAdminResponse("");
              }}
              className="px-4 py-2 bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
            >
              Take Action
            </button>
          </div>
        )}
      </div>

      {/* MIDDLE SECTION: Reason & Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 border-y border-white/5">
        <div className="space-y-1">
          <span className="text-[10px] uppercase text-white/30 font-bold">
            Duration
          </span>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <CalIcon size={14} className="text-blue-500" />
            <span>{timeFormatter(req.start_date)}</span>
            <ChevronRight size={12} className="text-white/20" />
            <span>{timeFormatter(req.end_date)}</span>
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase text-white/30 font-bold">
            Manager's Reason
          </span>
          <p className="text-sm text-white/70 italic">
            "{req.reason || "No reason provided"}"
          </p>
        </div>
      </div>

      {/* ATTACHMENT SECTION */}
      {req.file && (
        <a
          href={req.file}
          target="_blank"
          className="inline-flex items-center gap-2 text-[11px] text-blue-400 hover:underline"
        >
          <FileText size={14} /> View Document
        </a>
      )}

      {/* DYNAMIC RESPONSE AREA: Only shows when 'Take Action' is clicked */}
      {processingId === req._id && (
        <div className="mt-4 pt-4 border-t border-blue-500/30 animate-in slide-in-from-top-2 duration-300">
          <span className="text-[10px] uppercase text-blue-500 font-bold mb-2 block">
            Admin Response / Remarks
          </span>
          <textarea
            value={adminResponse}
            onChange={(e) => setAdminResponse(e.target.value)}
            placeholder="Enter reason for approval or rejection..."
            className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-blue-500 min-h-[80px] rounded-none"
          />
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => handleResponse(req._id, "approved")}
              disabled={loading}
              className="flex-1 bg-emerald-500 text-black font-bold py-2 text-xs uppercase tracking-widest hover:bg-emerald-400 disabled:opacity-50"
            >
              Confirm Approval
            </button>
            <button
              onClick={() => handleResponse(req._id, "rejected")}
              disabled={loading}
              className="flex-1 border border-red-500 text-red-500 font-bold py-2 text-xs uppercase tracking-widest hover:bg-red-500 hover:text-black disabled:opacity-50"
            >
              Confirm Rejection
            </button>
            <button
              onClick={() => setProcessingId(null)}
              className="px-4 py-2 text-white/40 text-[10px] uppercase font-bold hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveCard;
