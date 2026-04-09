import React, { useState } from "react";
import { useAuth } from "../ContextAPI/AuthContext";
// Replace with your actual path to the logo image
import REN_LOGO from "../assets/ren_logo_white.png";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("admin");
  const [joinUsingkey, setJoinUsingkey] = useState(false);
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login(data, role);
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* LEFT SECTION: BRAND & DOODLES */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center relative border-r border-white/5">
        {/* Animated Background Doodles (SVG Pattern) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <img
            src={REN_LOGO}
            alt="REN Logo"
            className="w-80  h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] "
          />
        </div>
      </div>

      {joinUsingkey ? (
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-[#0f0f0f]">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Join Using Key
              </h1>
              <p className="text-white/50 mt-2">
                Select your access level and credentials.
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
              {["manager", "employee"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                    role === r
                      ? "bg-white text-black shadow-lg"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <input
                  type="email"
                  required
                  placeholder="Enter Valid Mail"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all outline-none placeholder:text-white/20"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <input
                  type="password"
                  required
                  placeholder="Security Token"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all outline-none placeholder:text-white/20"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-black uppercase tracking-tighter rounded-xl hover:bg-slate-200 transition-transform active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Verify {role}
              </button>
            </form>

            {/* Footer Navigation */}
            <div className="pt-8 border-t border-white/5 space-y-6">
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => setJoinUsingkey(false)}
                  className="py-3 flex justify-center items-center gap-2 rounded-lg bg-white/10 border border-white/10 text-[15px] text-white uppercase font-bold tracking-widest hover:bg-white/80 hover:text-black group transition-all"
                >
                  Have Account Sign In{" "}
                  <ArrowRight className="group-hover:translate-x-10 transition-transform duration-300 " />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-[#0f0f0f]">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                System Login
              </h1>
              <p className="text-white/50 mt-2">
                Select your access level and credentials.
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
              {["admin", "manager", "employee"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                    role === r
                      ? "bg-white text-black shadow-lg"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <input
                  type="email"
                  required
                  placeholder="Email Identifier"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all outline-none placeholder:text-white/20"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <input
                  type="password"
                  required
                  placeholder="Security Token"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all outline-none placeholder:text-white/20"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-black uppercase tracking-tighter rounded-xl hover:bg-slate-200 transition-transform active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Login as {role}
              </button>
            </form>

            {/* Footer Navigation */}
            <div className="pt-8 border-t border-white/5 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setJoinUsingkey(true)}
                  className="py-3 px-4 rounded-lg bg-white border border-white/10 text-[10px] text-black uppercase font-bold tracking-widest hover:bg-white/5 hover:text-white transition-all"
                >
                  Join Using Key
                </button>
                <button
                  onClick={() => {
                    Navigate("/signup");
                  }}
                  className="py-3 px-4 rounded-lg bg-transparent border border-white/10 text-[10px] uppercase font-bold tracking-widest hover:bg-white/5 transition-all"
                >
                  New to REN ?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
