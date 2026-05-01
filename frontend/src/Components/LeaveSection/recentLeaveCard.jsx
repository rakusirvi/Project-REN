import { Calendar as CalIcon, Dot } from "lucide-react";
import { timeFormatter } from "../../Libs/lib";

const RecentLeaveCard = ({ log }) => {
  return (
    <div className="relative overflow-hidden">
      {/* 🟢 Swipeable Card */}
      <div
        // Changed bg-white/[0.02] to bg-zinc-900 (or any solid color)
        // Changed z-11 to z-20
        className="group relative flex gap-4 p-4 z-20 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/10 transition-all duration-300"
      >
        {/* Status Indicator */}
        <div
          className={`w-1 rounded-full shrink-0 ${
            log.status === "approved" ? "bg-emerald-500" : "bg-red-500"
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
            <span>{timeFormatter(log.start_date)}</span>
            <Dot size={10} />
            <span>{timeFormatter(log.end_date)}</span>
          </div>

          <div className="flex mt-2 items-center gap-2 text-[11px] text-white/30">
            <span className="truncate italic">{log.reason}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentLeaveCard;
