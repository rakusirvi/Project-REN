import React, { useState } from "react";
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

const AdminLeaveDashboard = () => {
  const requests = [
    {
      _id: "1",
      applicant_id: {
        name: "Rakesh Choudhary",
        email: "rakeshChoudhary1154@gmail.com",
      },
      start_date: "2024-05-20",
      end_date: "2024-05-25",
      file: "https://google.com",
      status: "rejected",
      reason: "i am ill",
    },
    {
      _id: "2",
      applicant_id: {
        name: "Rakesh Choudhary",
        email: "rakeshChoudhary1154@gmail.com",
      },
      start_date: "2024-05-20",
      end_date: "2024-05-25",
      file: "https://google.com",
      status: "approved",
      reason: "i am ill",
    },
    {
      _id: "3",
      applicant_id: {
        name: "Rakesh Choudhary",
        email: "rakeshChoudhary1154@gmail.com",
      },
      start_date: "2024-05-20",
      end_date: "2024-05-25",
      file: "https://google.com",
      status: "approved",
      reason: "i am ill",
    },
    {
      _id: "4",
      applicant_id: {
        name: "Rakesh Choudhary",
        email: "rakeshChoudhary1154@gmail.com",
      },
      start_date: "2024-05-20",
      end_date: "2024-05-25",
      file: "https://google.com",
      status: "approved",
      reason: "i am ill",
    },
    {
      _id: "5",
      applicant_id: {
        name: "Rakesh Choudhary",
        email: "rakeshChoudhary1154@gmail.com",
      },
      start_date: "2024-05-20",
      end_date: "2024-05-25",
      file: "https://google.com",
      status: "approved",
      reason: "i am ill",
    },
    {
      _id: "6",
      applicant_id: {
        name: "Rakesh Choudhary",
        email: "rakeshChoudhary1154@gmail.com",
      },
      start_date: "2024-05-20",
      end_date: "2024-05-25",
      file: "https://google.com",
      status: "approved",
      reason: "i am ill",
    },
    {
      _id: "7",
      applicant_id: {
        name: "Rakesh Choudhary",
        email: "rakeshChoudhary1154@gmail.com",
      },
      start_date: "2024-05-20",
      end_date: "2024-05-25",
      file: "https://google.com",
      status: "approved",
      reason: "i am ill",
    },
  ];

  // Existing holidays in Database
  const [savedHolidays, setSavedHolidays] = useState(["2026-04-10"]);
  // Dates selected in current session but not yet posted
  const [selectedBatch, setSelectedBatch] = useState([]);
  // Current view of the calendar
  const [viewDate, setViewDate] = useState(new Date(2026, 3, 1)); // April 2026

  // --- Add these states at the top of your component ---
  const [processingId, setProcessingId] = useState(null); // Which card is being responded to
  const [adminResponse, setAdminResponse] = useState(""); // The message text
  const [loading, setLoading] = useState(false);

  // --- The Submission Function ---
  const handleResponse = async (id, status) => {
    if (!adminResponse && status === "rejected") {
      alert("Please provide a reason for rejection.");
      return;
    }

    setLoading(true);
    try {
      // In your real REN App:
      // await axios.post(`/api/leave/respond/${id}`, { status, response: adminResponse });

      alert(`Request ${status} successfully!`);
      setProcessingId(null);
      setAdminResponse("");
      // Here you would typically re-fetch your requests
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- CALENDAR LOGIC ---
  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDay = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1,
  ).getDay();
  const monthName = viewDate.toLocaleString("default", { month: "long" });

  const handleDateClick = (day) => {
    const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // 1. Prevent clicking already saved holidays
    if (savedHolidays.includes(dateStr)) return;

    // 2. Toggle in the "to-be-posted" batch
    if (selectedBatch.includes(dateStr)) {
      setSelectedBatch(selectedBatch.filter((d) => d !== dateStr));
    } else {
      setSelectedBatch([...selectedBatch, dateStr]);
    }
  };

  const postHolidays = () => {
    // In real app: axios.post('/api/holidays', { dates: selectedBatch })
    setSavedHolidays([...savedHolidays, ...selectedBatch]);
    setSelectedBatch([]);
    alert(
      `Successfully synced ${selectedBatch.length} new holidays! Notifications sent.`,
    );
  };

  const changeMonth = (offset) => {
    setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + offset)));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6  text-white animate-in fade-in duration-500">
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
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white/[0.02] border border-white/10 rounded-none p-6 space-y-4 hover:border-white/30 transition-all"
              style={{
                borderLeftWidth: "4px",
                borderLeftColor:
                  req.status === "approved" ? "#10b981" : "#3b82f6",
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
                    <p className="text-sm text-white/40">
                      {req.applicant_id.email}
                    </p>
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
                    <span>{req.start_date}</span>
                    <ChevronRight size={12} className="text-white/20" />
                    <span>{req.end_date}</span>
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
          ))}
        </div>
      </div>

      {/* RIGHT: DYNAMIC HOLIDAY PLANNER */}
      <div className="w-full lg:w-96 space-y-4">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <CalIcon className="text-blue-500" size={18} />
              Holiday Planner
            </h2>
            <div className="flex gap-1">
              <button
                onClick={() => changeMonth(-1)}
                className="p-1 hover:bg-white/10 rounded-md"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => changeMonth(1)}
                className="p-1 hover:bg-white/10 rounded-md"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="text-center text-sm font-medium mb-4 text-white/60">
            {monthName} {viewDate.getFullYear()}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="text-[10px] font-bold text-white/20">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {[...Array(firstDay)].map((_, i) => (
              <div key={i} />
            ))}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isSaved = savedHolidays.includes(dateStr);
              const isSelected = selectedBatch.includes(dateStr);

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  disabled={isSaved}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all
                    ${isSaved ? "bg-emerald-500/20 text-emerald-400 cursor-not-allowed border border-emerald-500/30" : ""}
                    ${isSelected ? "bg-orange-500 text-white shadow-lg shadow-orange-500/40 scale-95" : "hover:bg-white/10 text-white/70"}
                    ${!isSaved && !isSelected ? "border border-white/5" : ""}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Action Area */}
          <div className="mt-6 pt-6 border-t border-white/10">
            {selectedBatch.length > 0 ? (
              <div className="space-y-4 animate-in slide-in-from-top-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/50">
                    {selectedBatch.length} dates selected
                  </span>
                  <button
                    onClick={() => setSelectedBatch([])}
                    className="text-red-400 flex items-center gap-1 hover:underline"
                  >
                    <Trash2 size={12} /> Clear
                  </button>
                </div>
                <button
                  onClick={postHolidays}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30"
                >
                  <UploadCloud size={18} />
                  Post {selectedBatch.length} Holidays
                </button>
              </div>
            ) : (
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl">
                <AlertCircle className="text-white/20 mt-1" size={16} />
                <p className="text-[11px] text-white/40 leading-relaxed">
                  Select multiple dates to bulk-assign holidays. Saved holidays
                  are highlighted in green.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-3 backdrop-blur-xl shadow-2xl flex flex-col h-[500px]">
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
          <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
            {requests.filter(
              (r) => r.status === "approved" || r.status === "rejected",
            ).length > 0 ? (
              requests
                .filter(
                  (r) => r.status === "approved" || r.status === "rejected",
                )
                .map((log) => (
                  <div
                    key={log._id}
                    className="group relative flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    {/* Status Indicator Line */}
                    <div
                      className={`w-1 rounded-full shrink-0 ${
                        log.status === "approved"
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-[13px] font-bold text-white/90 truncate">
                          {log.applicant_id.name}
                        </p>
                        <span
                          className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded ${
                            log.status === "approved"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-white/30">
                        <CalIcon size={10} />
                        <span>{log.start_date}</span>
                        <Dot size={10} />
                        <span>{log.end_date}</span>
                        {log.reason && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-white/10" />
                            <span className="truncate italic">
                              "{log.reason}"
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
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
