import React, { useState } from "react";
import { useAuth } from "../../ContextAPI/AuthContext";
import DashboardContent from "../../Components/Admin/DashboardContent";
import ManagersContent from "../../Components/Admin/ManagersContent";
import SettingsContent from "../../Components/Admin/SettingsContent";
import LeaveContent from "../../Components/Admin/LeaveContent";
import NotificationContent from "../../Components/NotificationContent";
import REN_LOGO from "../../assets/ren_logo_white.png";
import {
  BarChart3,
  Users,
  Settings,
  Bell,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  CalendarOff,
} from "lucide-react";

// eslint-disable-next-line no-unused-vars
const SidebarLink = ({ Icon, label, id, activeSection, handleNav }) => (
  <button
    onClick={() => handleNav(id)}
    className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all group ${
      activeSection === id
        ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.02)]"
        : "text-white/30 hover:text-white/70 hover:bg-white/5"
    }`}
  >
    <Icon
      size={14}
      className={`${activeSection === id ? "text-white" : "text-white/20 group-hover:text-white/50"}`}
    />
    {label}
  </button>
);

const SidebarContent = ({ activeSection, handleNav, user, logout }) => (
  <>
    <div className="mb-8 mt-2 px-2">
      <img
        src={REN_LOGO}
        alt="REN"
        className="w-24 h-auto opacity-90 filter brightness-125"
      />
    </div>

    <nav className="space-y-1.5 flex-1">
      <SidebarLink
        Icon={BarChart3}
        label="Dashboard"
        id="dashboard"
        activeSection={activeSection}
        handleNav={handleNav}
      />
      <SidebarLink
        Icon={Users}
        label="Managers"
        id="managers"
        activeSection={activeSection}
        handleNav={handleNav}
      />
      <SidebarLink
        Icon={CalendarOff}
        label="Leave"
        id="leave"
        activeSection={activeSection}
        handleNav={handleNav}
      />
      <SidebarLink
        Icon={Settings}
        label="Settings"
        id="settings"
        activeSection={activeSection}
        handleNav={handleNav}
      />
    </nav>

    <div className="pt-4 border-t border-white/5 space-y-3">
      <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-white/10 flex items-center justify-center">
            <ShieldCheck size={12} className="text-green-500" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">
            {user?.role || "Root"}
          </span>
        </div>
        <button
          onClick={logout}
          className="text-white/20 hover:text-red-400 transition-colors"
        >
          <LogOut size={14} />
        </button>
      </div>
    </div>
  </>
);

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNav = (id) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white/90 overflow-hidden font-sans text-[13px]">
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-[220px] flex-col border-r border-white/5 p-4 bg-[#0f0f0f] z-20">
        <SidebarContent
          activeSection={activeSection}
          handleNav={handleNav}
          user={user}
          logout={logout}
        />
      </aside>

      {/* ── Mobile overlay backdrop ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile slide-in sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-[240px] flex flex-col bg-[#0f0f0f] border-r border-white/5 p-4 z-40 lg:hidden transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <SidebarContent
          activeSection={activeSection}
          handleNav={handleNav}
          user={user}
          logout={logout}
        />
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col bg-[#0a0a0a] relative min-w-0">
        {/* Subtle glow background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/2 blur-[100px] rounded-full pointer-events-none" />

        {/* ── Header ── */}
        <header className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-white/5 z-10 backdrop-blur-sm bg-[#0a0a0a]/50">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white transition-all"
            >
              <Menu size={16} />
            </button>

            <h1 className="text-xl font-black tracking-tighter uppercase">
              {activeSection}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60">
              {user?.company_name || "REN"}
            </div>
            <button
              onClick={() => {
                setActiveSection("notification");
              }}
              className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white transition-all"
            >
              <Bell size={16} />
            </button>
          </div>
        </header>

        {/* ── Page content ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 z-10 custom-scrollbar">
          {activeSection === "dashboard" && <DashboardContent />}
          {activeSection === "managers" && <ManagersContent />}
          {activeSection === "settings" && <SettingsContent />}
          {activeSection === "notification" && <NotificationContent />}
          {activeSection === "leave" && <LeaveContent />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
