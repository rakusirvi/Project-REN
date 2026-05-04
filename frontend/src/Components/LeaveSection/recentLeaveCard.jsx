import { timeFormatter } from "../../Libs/lib";

const recentLeaveCard = ({ log }) => {
  // Guard against missing log
  if (!log) return null;

  // Destructure with defaults to avoid undefined errors
  const {
    applicant_id = {},
    status = "pending",
    start_date,
    end_date,
    reason = "No reason provided",
  } = log;

  return (
    <div className="relative overflow-hidden">
      <div className="group relative flex gap-4 p-4 z-20 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/10 transition-all duration-300">
        <div
          className={`w-1 rounded-full shrink-0 ${
            status === "approved" ? "bg-emerald-500" : "bg-red-500"
          }`}
        />

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <p className="text-[13px] font-bold text-white/90 truncate">
              {applicant_id?.name ?? "Unknown Applicant"}
            </p>

            <span
              className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded ${
                status === "approved"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {status}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-white/30">
            <CalIcon size={10} />
            <span>{timeFormatter(start_date)}</span>
            <Dot size={10} />
            <span>{timeFormatter(end_date)}</span>
          </div>

          <div className="flex mt-2 items-center gap-2 text-[11px] text-white/30">
            <span className="truncate italic">{reason}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default recentLeaveCard;
