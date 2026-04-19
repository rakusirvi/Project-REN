import React, { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  PowerOff,
  Users,
  X,
  ChevronDown,
  Mail,
  Phone,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

const MANAGER_TYPES = [
  "Project Manager",
  "HR Manager",
  "Marketing Manager",
  "Sales Manager",
  "Finance Manager",
  "Operations Manager",
];

const INITIAL_MANAGERS = [
  {
    id: 1,
    name: "Ayesha Raza",
    role: "HR Manager",
    email: "ayesha@company.com",
    phone: "+91 98200 11234",
    employees: 8,
    status: "active",
    joined: "Jan 2024",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    role: "Project Manager",
    email: "rohan@company.com",
    phone: "+91 98200 55678",
    employees: 12,
    status: "active",
    joined: "Mar 2024",
  },
  {
    id: 3,
    name: "Sara Khan",
    role: "Marketing Manager",
    email: "sara@company.com",
    phone: "+91 98200 99012",
    employees: 5,
    status: "inactive",
    joined: "Feb 2024",
  },
  {
    id: 4,
    name: "Dev Patel",
    role: "Sales Manager",
    email: "dev@company.com",
    phone: "+91 98200 33456",
    employees: 9,
    status: "active",
    joined: "Apr 2024",
  },
];

const roleColors = {
  "HR Manager": "#a78bfa",
  "Project Manager": "#34d399",
  "Marketing Manager": "#fb923c",
  "Sales Manager": "#38bdf8",
  "Finance Manager": "#f472b6",
  "Operations Manager": "#facc15",
};

const getRoleColor = (role) => roleColors[role] || "#94a3b8";

export default function ManagersContent() {
  const [managers, setManagers] = useState(INITIAL_MANAGERS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [modal, setModal] = useState(null); // { type: 'add'|'edit'|'delete'|'deactivate'|'employees', data? }
  const [form, setForm] = useState({
    name: "",
    role: MANAGER_TYPES[0],
    email: "",
    phone: "",
  });
  const [formError, setFormError] = useState("");

  const filtered = managers.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || m.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => {
    setForm({ name: "", role: MANAGER_TYPES[0], email: "", phone: "" });
    setFormError("");
    setModal({ type: "add" });
  };

  const openEdit = (mgr) => {
    setForm({
      name: mgr.name,
      role: mgr.role,
      email: mgr.email,
      phone: mgr.phone,
    });
    setFormError("");
    setModal({ type: "edit", data: mgr });
    setOpenMenuId(null);
  };

  const openDelete = (mgr) => {
    setModal({ type: "delete", data: mgr });
    setOpenMenuId(null);
  };

  const openDeactivate = (mgr) => {
    setModal({ type: "deactivate", data: mgr });
    setOpenMenuId(null);
  };

  const openEmployees = (mgr) => {
    setModal({ type: "employees", data: mgr });
    setOpenMenuId(null);
  };

  const closeModal = () => {
    setModal(null);
    setFormError("");
  };

  const handleFormSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      setFormError("Name and email are required.");
      return;
    }
    if (modal.type === "add") {
      const newMgr = {
        id: Date.now(),
        ...form,
        employees: 0,
        status: "active",
        joined: new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
      };
      setManagers((prev) => [newMgr, ...prev]);
    } else if (modal.type === "edit") {
      setManagers((prev) =>
        prev.map((m) => (m.id === modal.data.id ? { ...m, ...form } : m)),
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    setManagers((prev) => prev.filter((m) => m.id !== modal.data.id));
    closeModal();
  };

  const handleToggleStatus = () => {
    setManagers((prev) =>
      prev.map((m) =>
        m.id === modal.data.id
          ? { ...m, status: m.status === "active" ? "inactive" : "active" }
          : m,
      ),
    );
    closeModal();
  };

  const activeCount = managers.filter((m) => m.status === "active").length;
  const totalEmployees = managers.reduce((s, m) => s + m.employees, 0);

  return (
    <div className="space-y-6">
      {/* ── Stats strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Total managers", value: managers.length },
          { label: "Active", value: activeCount },
          { label: "Total employees", value: totalEmployees },
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

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search managers…"
            className="w-full bg-white/[0.03] border border-white/5 rounded-lg pl-9 pr-4 py-2.5 text-[12px] text-white/70 placeholder-white/20 outline-none focus:border-white/15 transition-colors"
          />
        </div>

        <div className="flex gap-2">
          {["all", "active", "inactive"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                filterStatus === s
                  ? "bg-white/10 text-white"
                  : "text-white/30 hover:text-white/60 hover:bg-white/5"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-white/90 active:scale-95 transition-all"
        >
          <Plus size={13} />
          Add Manager
        </button>
      </div>

      {/* ── Manager grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-white/20 text-[12px] uppercase tracking-widest">
          No managers found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((mgr) => (
            <ManagerCard
              key={mgr.id}
              mgr={mgr}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              onEdit={openEdit}
              onDelete={openDelete}
              onDeactivate={openDeactivate}
              onEmployees={openEmployees}
            />
          ))}
        </div>
      )}

      {/* ── Modals ── */}
      {modal && (
        <Modal onClose={closeModal}>
          {(modal.type === "add" || modal.type === "edit") && (
            <ManagerForm
              type={modal.type}
              form={form}
              setForm={setForm}
              error={formError}
              onSubmit={handleFormSubmit}
              onCancel={closeModal}
            />
          )}
          {modal.type === "delete" && (
            <ConfirmDialog
              icon={<Trash2 size={20} className="text-red-400" />}
              title={`Delete ${modal.data.name}?`}
              desc="This will permanently remove the manager and cannot be undone."
              confirmLabel="Delete"
              confirmClass="bg-red-500/20 text-red-400 hover:bg-red-500/30"
              onConfirm={handleDelete}
              onCancel={closeModal}
            />
          )}
          {modal.type === "deactivate" && (
            <ConfirmDialog
              icon={<PowerOff size={20} className="text-amber-400" />}
              title={
                modal.data.status === "active"
                  ? `Deactivate ${modal.data.name}?`
                  : `Activate ${modal.data.name}?`
              }
              desc={
                modal.data.status === "active"
                  ? "Manager will lose access until reactivated."
                  : "Manager will regain full access."
              }
              confirmLabel={
                modal.data.status === "active" ? "Deactivate" : "Activate"
              }
              confirmClass="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
              onConfirm={handleToggleStatus}
              onCancel={closeModal}
            />
          )}
          {modal.type === "employees" && (
            <EmployeesPanel mgr={modal.data} onClose={closeModal} />
          )}
        </Modal>
      )}
    </div>
  );
}

/* ─── Manager Card ─── */
function ManagerCard({
  mgr,
  openMenuId,
  setOpenMenuId,
  onEdit,
  onDelete,
  onDeactivate,
  onEmployees,
}) {
  const color = getRoleColor(mgr.role);
  const isOpen = openMenuId === mgr.id;

  return (
    <div className="relative bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
      {/* Status dot */}
      <span
        className={`absolute top-4 right-12 w-1.5 h-1.5 rounded-full ${
          mgr.status === "active" ? "bg-emerald-400" : "bg-white/20"
        }`}
      />

      {/* Menu button */}
      <button
        onClick={() => setOpenMenuId(isOpen ? null : mgr.id)}
        className="absolute top-3 right-3 p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-all"
      >
        <MoreVertical size={14} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-10 right-3 z-20 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[170px]">
          {[
            { icon: Edit2, label: "Edit details", action: () => onEdit(mgr) },
            {
              icon: Users,
              label: "View employees",
              action: () => onEmployees(mgr),
            },
            {
              icon: PowerOff,
              label: mgr.status === "active" ? "Deactivate" : "Activate",
              action: () => onDeactivate(mgr),
              className: "text-amber-400/80",
            },
            {
              icon: Trash2,
              label: "Delete",
              action: () => onDelete(mgr),
              className: "text-red-400/80",
            },
          ].map(({ icon: Icon, label, action, className }) => (
            <button
              key={label}
              onClick={action}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${
                className || "text-white/50"
              }`}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-black mb-4"
        style={{ background: color + "22", color }}
      >
        {mgr.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
      </div>

      {/* Name + role */}
      <p className="text-[13px] font-black tracking-tight text-white/90 mb-1">
        {mgr.name}
      </p>
      <span
        className="inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest mb-4"
        style={{ background: color + "18", color }}
      >
        {mgr.role}
      </span>

      {/* Info rows */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-[11px] text-white/30">
          <Mail size={10} className="shrink-0" />
          <span className="truncate">{mgr.email}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/30">
          <Phone size={10} className="shrink-0" />
          <span>{mgr.phone}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <button
          onClick={() => onEmployees(mgr)}
          className="flex items-center gap-1.5 text-[10px] text-white/30 hover:text-white/60 transition-colors"
        >
          <Users size={11} />
          <span className="font-bold">{mgr.employees}</span>
          <span>employees</span>
        </button>
        <span className="text-[9px] text-white/20 uppercase tracking-widest">
          Joined {mgr.joined}
        </span>
      </div>
    </div>
  );
}

/* ─── Modal wrapper ─── */
function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Add / Edit Form ─── */
function ManagerForm({ type, form, setForm, error, onSubmit, onCancel }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[13px] font-black uppercase tracking-widest text-white/90">
          {type === "add" ? "Add New Manager" : "Edit Manager"}
        </h2>
        <button
          onClick={onCancel}
          className="text-white/20 hover:text-white/60 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="space-y-3">
        <Field label="Full name" required>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Ayesha Raza"
            className="input-style"
          />
        </Field>

        <Field label="Role / Type">
          <div className="relative">
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className="input-style appearance-none pr-8 cursor-pointer"
            >
              {MANAGER_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
            />
          </div>
        </Field>

        <Field label="Email" required>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="e.g. ayesha@company.com"
            className="input-style"
          />
        </Field>

        <Field label="Phone">
          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="e.g. +91 98200 11234"
            className="input-style"
          />
        </Field>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-[11px]">
            <AlertTriangle size={11} /> {error}
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest text-white/30 hover:text-white/60 border border-white/5 hover:bg-white/5 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest bg-white text-black hover:bg-white/90 active:scale-95 transition-all"
        >
          {type === "add" ? "Create" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── Confirm Dialog ─── */
function ConfirmDialog({
  icon,
  title,
  desc,
  confirmLabel,
  confirmClass,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-[13px] font-black text-white/90">{title}</p>
          <p className="text-[11px] text-white/30 mt-0.5">{desc}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest text-white/30 border border-white/5 hover:bg-white/5 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`flex-1 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest border border-white/5 transition-all ${confirmClass}`}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}

/* ─── Employees Panel ─── */
function EmployeesPanel({ mgr, onClose }) {
  const mockEmployees = Array.from({ length: mgr.employees }, (_, i) => ({
    id: i + 1,
    name:
      [
        "Arjun S.",
        "Priya M.",
        "Kabir R.",
        "Neha T.",
        "Aditya K.",
        "Zara H.",
        "Rohit P.",
        "Ananya L.",
        "Farhan Q.",
        "Divya N.",
      ][i] || `Employee ${i + 1}`,
    role: ["Developer", "Designer", "Analyst", "Coordinator", "Executive"][
      i % 5
    ],
  }));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[13px] font-black uppercase tracking-widest text-white/90">
            {mgr.name}'s Team
          </h2>
          <p className="text-[10px] text-white/30 mt-0.5 uppercase tracking-widest">
            {mgr.role}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white/20 hover:text-white/60 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {mgr.employees === 0 ? (
        <p className="text-center text-white/20 text-[11px] uppercase tracking-widest py-8">
          No employees yet
        </p>
      ) : (
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {mockEmployees.map((emp) => (
            <div
              key={emp.id}
              className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black text-white/60">
                {emp.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-white/80 truncate">
                  {emp.name}
                </p>
                <p className="text-[10px] text-white/30">{emp.role}</p>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-white/20 uppercase tracking-widest">
          {mgr.employees} total employees
        </span>
        <button
          onClick={onClose}
          className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
