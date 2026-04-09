import React, { useState } from "react";
import { useAuth } from "../ContextAPI/AuthContext";
import REN_LOGO from "../assets/ren_logo_white.png";
import { ArrowRight, ArrowLeft, UserPlus, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const { signup, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    company_location: "",
    company_email: "",
    password: "",
    phone: "",
  });

  const [confirm_password, setConfirm_password] = useState("");

  const [verificationOtp, setVerificationOtp] = useState("");

  const isMismatch =
    confirm_password !== "" && confirm_password !== formData.password;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Keep this at the very top

    if (step === 1) {
      if (isMismatch) return toast.error("Passwords do not match");
      setStep(2);
    } else if (step === 2) {
      // IMPORTANT: Wait for the response
      const result = await signup(formData);

      // Only move to step 3 if the result is truthy (not null)
      if (result) {
        setStep(3);
      }
      // If result is null, the user stays on Step 2 to fix the error
    } else if (step === 3) {
      const isVerified = await verifyOtp(
        formData.company_email,
        verificationOtp,
      );
      if (isVerified) {
        // Use navigate immediately or after a short delay
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* LEFT SECTION: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-[#0f0f0f] z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/40 mb-4">
              <span
                className={`h-1 w-8 rounded-full ${step >= 1 ? "bg-white" : "bg-white/20"}`}
              />
              <span
                className={`h-1 w-8 rounded-full ${step >= 2 ? "bg-white" : "bg-white/20"}`}
              />
              <span
                className={`h-1 w-8 rounded-full ${step >= 3 ? "bg-white" : "bg-white/20"}`}
              />
            </div>
            <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
              {step === 3 ? "VERIFY" : "CREATE IDENTITY"}
              {step === 3 ? (
                <ShieldCheck size={32} className="text-green-500" />
              ) : (
                <UserPlus size={32} />
              )}
            </h1>
            <p className="text-white/50">
              {step === 1 && "Start with your personal details."}
              {step === 2 && "Tell us about your organization."}
              {step === 3 &&
                `Enter the 6-digit code sent to ${formData.company_email}`}
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/40 focus:ring-1 outline-none"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Contact Number"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/40 focus:ring-1 outline-none"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Secure Password"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/40 focus:ring-1 outline-none"
                  value={formData.password}
                  onChange={handleChange}
                />
                <input
                  name="confirm_password"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  className={`w-full px-5 py-4 bg-white/5 border rounded-xl focus:ring-1 transition-all outline-none ${
                    isMismatch
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-white/10 focus:border-white/40"
                  }`}
                  value={confirm_password}
                  onChange={(e) => setConfirm_password(e.target.value)}
                />
                {isMismatch && (
                  <p className="text-red-500 text-xs mt-1 animate-pulse">
                    * Passwords do not match
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <input
                  name="company_name"
                  type="text"
                  required
                  placeholder="Company Legal Name"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/40 focus:ring-1 outline-none"
                  value={formData.company_name}
                  onChange={handleChange}
                />
                <input
                  name="company_email"
                  type="email"
                  required
                  placeholder="Official Company Email"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/40 focus:ring-1 outline-none"
                  value={formData.company_email}
                  onChange={handleChange}
                />
                <input
                  name="company_location"
                  type="text"
                  required
                  placeholder="Headquarters Location"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/40 focus:ring-1 outline-none"
                  value={formData.company_location}
                  onChange={handleChange}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in zoom-in-95 duration-500">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <input
                    type="text"
                    maxLength="6"
                    required
                    placeholder="000000"
                    className="w-full text-center text-4xl tracking-[1em] font-mono py-6 bg-white/5 border border-white/20 rounded-2xl focus:border-white focus:ring-1 focus:ring-white/20 outline-none transition-all"
                    value={verificationOtp}
                    onChange={(e) =>
                      setVerificationOtp(e.target.value.replace(/\D/g, ""))
                    }
                  />
                  <button
                    type="button"
                    className="text-xs text-white/30 hover:text-white transition-colors uppercase tracking-widest"
                    onClick={() => toast.success("Code Resent")}
                  >
                    Resend Security Token
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="w-1/4 py-4 bg-white/5 border border-white/10 rounded-xl flex justify-center items-center hover:bg-white/10 transition-all"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <button
                type="submit"
                className="flex-1 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-transform active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {step === 1 ? "Next " : step === 2 ? "Send OTP" : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="pt-8 border-t border-white/5">
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 flex justify-center items-center gap-2 rounded-lg bg-transparent border border-white/10 text-[12px] text-white/50 uppercase font-bold tracking-[0.2em] hover:text-white transition-all group"
            >
              Back to Login
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 flex-col justify-center relative border-l border-white/5">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern
              id="pattern-grid"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern-grid)" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={REN_LOGO}
            alt="REN Logo"
            className="w-80 h-auto opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
