import React from "react";
import { Shield, MessageSquareOff, GlobeXIcon as Globe } from "lucide-react";
// Import your logo
import REN_LOGO from "../assets/ren_logo_white.png";

const Footer = () => {
  return (
    <footer className="w-full relative bottom-0 bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8 px-6 md:px-12 font-sans text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Mission Section */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <img
              src={REN_LOGO}
              alt="REN"
              className="w-24 opacity-90 hover:opacity-100 transition-opacity"
            />
            <p className="text-white/50 max-w-sm leading-relaxed">
              The professional alternative to fragmented communication. Built
              for <span className="text-white font-medium">CEOs</span>,
              <span className="text-white font-medium"> Managers</span>, and
              <span className="text-white font-medium"> Employees</span> to
              reclaim their focus.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/30">
              System Nodes
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="hover:text-white transition-colors cursor-pointer">
                Admin Terminal
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Manager Suite
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Employee Portal
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Network Status
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/30">
              Protocol
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="hover:text-white transition-colors cursor-pointer">
                Security Whitepaper
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Terms of Access
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                API Documentation
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: System Info */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:row gap-6 justify-between items-center text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield size={12} strokeWidth={3} />
              End-to-End Encrypted
            </div>
          </div>

          <p className="order-first md:order-last">
            &copy; 2026 REN Systems Inc. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
