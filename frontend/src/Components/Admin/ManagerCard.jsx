import { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  Users,
  Mail,
  X,
  MoreHorizontal,
  Dice1,
} from "lucide-react";
import { useAdmin } from "../../ContextAPI/AdminContext";
import API from "../../api";
import { timeFormatter } from "../../Libs/lib";

export default function ManagerCard({ m }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [model, setModel] = useState(false);
  const { DeleteManager, resendManagerInvitation } = useAdmin();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, [menuOpen]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get(`/admin/getManagerEmployee/${m._id}`);
        if (res.data.data) {
          setEmployees(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    if (m?._id) {
      fetchEmployees();
    }
  }, [m?._id]);

  const noOfEmployees = employees?.length || 0;

  const initials = (val) =>
    val?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  return (
    <div className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
      {/* Top Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-4 items-center min-w-0">
          {/* Enhanced Avatar */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 text-white shadow-inner">
            {initials(m)}
          </div>

          <div className="min-w-0">
            <h3 className="text-[14px] font-semibold text-white/90 truncate tracking-tight">
              {m.name}
            </h3>
            <div className="flex items-center gap-1.5 text-white/40 mt-0.5">
              <Mail size={10} />
              <span className="text-[11px] truncate">{m.email}</span>
            </div>
          </div>
        </div>

        {/* Action Menu */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className={`p-2 rounded-lg transition-colors ${menuOpen ? "bg-white/10 text-white" : "text-white/30 hover:bg-white/5 hover:text-white"}`}
          >
            <MoreHorizontal size={16} />
          </button>

          {menuOpen && (
            <div className="absolute top-10 right-0 z-30 bg-[#161616] border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[160px] animate-in fade-in zoom-in duration-150">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-medium text-white/70 hover:bg-white/5 transition-colors border-b border-white/5">
                <Edit2 size={14} className="text-blue-400" /> EDIT PROFILE
              </button>
              {m.joined || (
                <button
                  onClick={() => {
                    resendManagerInvitation(m._id);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-medium text-white/70 hover:bg-white/5 transition-colors border-b border-white/5"
                >
                  <Users size={14} className="text-blue-400" /> Resend Token
                </button>
              )}
              <button
                onClick={() => {
                  DeleteManager(m._id);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-medium text-red-400/80 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 size={14} /> DELETE
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Role Tag */}
      <div className="mb-6 flex gap-2">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold text-white/80 uppercase tracking-wider bg-white/5 border border-white/10">
          {m.type}
        </span>
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold text-white/80 uppercase tracking-wider bg-white/5 border border-white/10">
          {timeFormatter(m.createdAt)}
        </span>
      </div>

      {/* Stats / Footer Toggle */}
      {m.joined && (
        <button
          onClick={() => setModel(true)}
          className="w-full flex items-center justify-between pt-4 border-t border-white/5 group/btn"
        >
          <div className="flex items-center gap-2 text-white/40 group-hover/btn:text-white/70 transition-colors">
            <div className="p-1.5 rounded-lg bg-white/5">
              <Users size={12} />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-[15px] font-bold text-white/90">
                {noOfEmployees}
              </span>
              <span className="text-[10px] text-white/70 uppercase tracking-tighter">
                Employees
              </span>
            </div>
          </div>
          <div className="text-[10px] font-bold text-blue-400 opacity-0 group-hover/btn:opacity-100 transition-all translate-x-2 group-hover/btn:translate-x-0">
            VIEW LIST →
          </div>
        </button>
      )}

      {model && (
        <div
          onClick={() => setModel(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60 animate-in fade-in duration-300"
        >
          <div
            className="w-full max-w-lg bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h2 className="text-lg font-bold text-white">Team Members</h2>
                <p className="text-xs text-white/40 font-medium">
                  Managing employees
                </p>
              </div>
              <button
                onClick={() => setModel(false)}
                className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 overflow-y-scroll max-h-96 text-white/20 italic">
              {employees &&
                employees?.map((em) => (
                  <div
                    className="py-4 flex  border-b gap-6 items-center"
                    key={em._id || em.email}
                  >
                    <span className="h-10 w-10 flex justify-center items-center text-center text-lg font-bold border border-white/10 rounded-full bg-white/5">
                      {initials(em)}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-white text-sm not-italic font-semibold">
                        {em.name}
                      </span>
                      <span className="text-white/60 text-xs not-italic">
                        {em.email}
                      </span>
                    </div>
                  </div>
                ))}
              {employees?.length === 0 && (
                <div className="flex items-center justify-center h-40">
                  <p className="text-white/30 font-black text-lg not-italic">
                    No Employees Yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
