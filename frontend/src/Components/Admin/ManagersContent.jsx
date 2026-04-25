import React, { useState, useEffect } from "react";

import { useAdmin } from "../../ContextAPI/AdminContext";
import ManagerCard from "./ManagerCard";
export default function ManagersContent() {
  const { AddManager, getManagers, managers, employees } = useAdmin();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "" });

  const openForm = () => setModal(true);
  const closeForm = () => setModal(false);

  const HandleAddManager = () => {
    AddManager(form);
    closeForm();
    setForm({ name: "", email: "", type: "" });
  };

  useEffect(() => {
    getManagers();
  }, []);

  return (
    <div>
      <div className="grid w-full grid-cols-2 gap-3">
        {[
          { label: "Total Managers", value: managers?.length || 0 },
          { label: "Total Employees", value: employees?.length || 0 },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white/[0.03] border border-white/5 rounded-xl p-4"
          >
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-1">
              {s.label}
            </p>
            <p className="text-2xl font-black tracking-tighter text-white/90">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-end mt-10 gap-3">
        <button
          onClick={() => {}}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/5 text-white border border-white/5 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-white/90 hover:text-black active:scale-95 transition-all duration-300"
        >
          Import Excel
        </button>
        <button
          onClick={openForm}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-white/90 active:scale-95 transition-all"
        >
          + Add Manager
        </button>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={closeForm}
        >
          <div
            className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[13px] font-black uppercase tracking-widest text-white/90">
                Add New Manager
              </h2>
              <button
                onClick={closeForm}
                className="text-white/20 hover:text-white/60 transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/80 mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rakesh Choudhary"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2.5 text-[12px] text-white/70 placeholder-white/20 outline-none focus:border-white/20 transition-colors"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/80 mb-1.5">
                  Email
                </label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. [EMAIL_ADDRESS]"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2.5 text-[12px] text-white/70 placeholder-white/20 outline-none focus:border-white/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/80 mb-1.5">
                  Manager Role
                </label>
                <input
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  placeholder="e.g. System Manager"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2.5 text-[12px] text-white/70 placeholder-white/20 outline-none focus:border-white/20 transition-colors"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeForm}
                className="flex-1 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest text-white/30 border border-white/5 hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={HandleAddManager}
                className="flex-1 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest bg-white text-black hover:bg-white/90 active:scale-95 transition-all"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {managers && managers.length === 0 ? (
        <div className="flex items-center justify-center h-100">
          <p className="text-white/30 font-black text-lg">No Managers Yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {managers?.map((m) => (
            <ManagerCard key={m._id} m={m} />
          ))}
        </div>
      )}

      <div className="flex mt-10 items-center gap-2">
        <div className="w-full">
          <hr className="border-white/5" />
        </div>
        <h1 className="text-center font-black text-white/30 w-full text-sm tracking-widest">
          Non Verified Manager's
        </h1>
        <div className="w-full">
          <hr className="border-white/5" />
        </div>
      </div>
    </div>
  );
}
