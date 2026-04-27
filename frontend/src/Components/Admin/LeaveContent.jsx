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
} from "lucide-react";

const AdminLeaveDashboard = () => {
  // --- STATE ---
  const [requests] = useState([
    {
      _id: "1",
      applicant_id: { name: "Rakesh Choudhary", email: "rakesh@gmail.com" },
      start_date: "2024-05-20",
      end_date: "2024-05-25",
      file: "",
      status: "pending",
    },
  ]);

  // Existing holidays in Database
  const [savedHolidays, setSavedHolidays] = useState(["2026-04-10"]);
  // Dates selected in current session but not yet posted
  const [selectedBatch, setSelectedBatch] = useState([]);
  // Current view of the calendar
  const [viewDate, setViewDate] = useState(new Date(2026, 3, 1)); // April 2026

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
    <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-screen text-white animate-in fade-in duration-500">
      {/* LEFT: LEAVE REQUESTS */}
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold">Manager Requests</h1>
        <div className="grid gap-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                  {req.applicant_id.name[0]}
                </div>
                <div>
                  <p className="font-semibold">{req.applicant_id.name}</p>
                  <p className="text-xs text-white/40">
                    {req.start_date} to {req.end_date}
                  </p>
                  {req?.file && (
                    <p className="text-xs text-white/40 truncate">{req.file}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-emerald-500/20 text-emerald-500 rounded-lg">
                  <Check size={18} />
                </button>
                <button className="p-2 bg-red-500/20 text-red-500 rounded-lg">
                  <X size={18} />
                </button>
              </div>
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
      </div>
    </div>
  );
};

export default AdminLeaveDashboard;
