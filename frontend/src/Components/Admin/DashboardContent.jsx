import {
  Activity,
  Globe,
  Shield,
  Zap,
  ArrowUpRight,

} from "lucide-react";

const DashboardContent = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Active Nodes",
            val: "1,204",
            icon: Globe,
            color: "text-blue-400",
          },
          {
            label: "Auth Requests",
            val: "48.2k",
            icon: Activity,
            color: "text-green-400",
          },
          {
            label: "Security Level",
            val: "Optimal",
            icon: Shield,
            color: "text-purple-400",
          },
          {
            label: "Sys Load",
            val: "14%",
            icon: Zap,
            color: "text-yellow-400",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#0f0f0f] p-5 rounded-xl border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex justify-between items-start mb-3">
              <item.icon
                size={16}
                className={`${item.color} opacity-50 group-hover:opacity-100 transition-opacity`}
              />
              <span className="text-[9px] font-mono text-white/20">
                LIVE_DATA
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              {item.label}
            </p>
            <p className="text-3xl font-black tracking-tighter mt-1">
              {item.val}
            </p>
          </div>
        ))}
      </div>

      {/* Main Stats Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Analytics Box */}
        <div className="lg:col-span-2 bg-[#0f0f0f] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xs font-black uppercase tracking-[0.2em]">
              Network Throughput
            </h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-white/40"></span>{" "}
                Uplink
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white"></span>{" "}
                Downlink
              </div>
            </div>
          </div>

          {/* Mock CSS Graph */}
          <div className="h-44 flex items-end gap-1.5">
            {[30, 45, 35, 60, 55, 90, 40, 30, 50, 85, 40, 70, 50, 95, 60].map(
              (h, i) => (
                <div key={i} className="flex-1 group relative">
                  <div
                    className="w-full bg-white/5 rounded-t-sm group-hover:bg-white/20 transition-all duration-500"
                    style={{ height: `${h}%` }}
                  />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}ms
                  </div>
                </div>
              ),
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
            <p className="text-[10px] text-white/20 font-mono">
              ENCRYPTION: AES-256-GCM
            </p>
            <button className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors">
              Registry <ArrowUpRight size={12} />
            </button>
          </div>
        </div>

        {/* Quick Activity Log */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6">
            Security Logs
          </h3>
          <div className="space-y-5">
            {[
              { log: "Identity Confirmed", user: "Admin_01", time: "1m" },
              { log: "New Invite Sent", user: "HR_System", time: "12m" },
              { log: "Node Re-routed", user: "SYS", time: "1h" },
              { log: "Database Backup", user: "Auto_Mod", time: "2h" },
            ].map((entry, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-l border-white/10 pl-4 hover:border-white transition-colors cursor-default"
              >
                <div>
                  <p className="text-[11px] font-bold">{entry.log}</p>
                  <p className="text-[9px] text-white/20 uppercase tracking-tighter">
                    {entry.user}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-white/20">
                  {entry.time}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-2.5 text-[10px] font-bold uppercase tracking-widest border border-white/10 rounded-lg hover:bg-white text-black bg-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Clear Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
