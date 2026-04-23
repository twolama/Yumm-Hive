"use client";

import Link from "next/link";
import { Mail, Lock, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#f2a316] flex flex-col font-sans selection:bg-[#714b00] selection:text-white">
      <Navbar variant="auth" />

      {/* MAIN CONTENT - COMPACT SIGN UP CARD */}
      <main className="flex-1 flex items-center justify-center px-4 py-6 md:py-10">
        <div className="w-full max-w-[420px] bg-[#141818] rounded-[36px] p-6 md:p-9 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center mb-6 md:mb-7">
            <h1 className="text-2xl md:text-3xl font-[950] text-white tracking-tight leading-none mb-2">
              Create Account
            </h1>
            <p className="text-[11px] md:text-xs font-medium text-white/50 tracking-wide">
              Join the colony today.
            </p>
          </div>

          <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#f2a316] ml-0.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full h-[48px] bg-[#fde3b4] rounded-xl px-4 text-[14px] font-bold text-[#141818] placeholder:text-[#141818]/30 focus:outline-none focus:ring-2 focus:ring-[#f2a316]/50 transition-all border-none"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#f2a316] ml-0.5">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="john@yumm.com"
                  className="w-full h-[48px] bg-[#fde3b4] rounded-xl pl-4 pr-10 text-[14px] font-bold text-[#141818] placeholder:text-[#141818]/30 focus:outline-none focus:ring-2 focus:ring-[#f2a316]/50 transition-all border-none"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#141818]/40 transition-colors group-focus-within:text-[#714b00]">
                  <Mail className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-[#f2a316] ml-0.5">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-[48px] bg-[#fde3b4] rounded-xl pl-4 pr-10 text-[14px] font-bold text-[#141818] placeholder:text-[#141818]/30 focus:outline-none focus:ring-2 focus:ring-[#f2a316]/50 transition-all border-none"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#141818]/40 transition-colors group-focus-within:text-[#714b00]">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-[#f2a316] ml-0.5">
                  Confirm
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-[48px] bg-[#fde3b4] rounded-xl px-4 text-[14px] font-bold text-[#141818] placeholder:text-[#141818]/30 focus:outline-none focus:ring-2 focus:ring-[#f2a316]/50 transition-all border-none"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="px-0.5 pt-0.5">
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <div className="relative flex items-center h-4 md:h-5">
                  <input
                    type="checkbox"
                    className="peer w-3.5 h-3.5 rounded border-none bg-white/10 checked:bg-[#f2a316] focus:ring-offset-0 focus:ring-0 transition-all cursor-pointer appearance-none"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                    <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />
                  </div>
                </div>
                <span className="text-[10px] md:text-[11px] font-medium text-white/70 leading-relaxed">
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-[#f2a316] font-bold hover:underline"
                  >
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link
                    href="#"
                    className="text-[#f2a316] font-bold hover:underline"
                  >
                    Privacy
                  </Link>
                </span>
              </label>
            </div>

            {/* Create Account Button */}
            <Link
              href="/dashboard"
              className="flex w-full h-[52px] items-center justify-center gap-2 bg-[#d98a12] rounded-[16px] text-[15px] font-black text-white shadow-[0_8px_16px_-4px_rgba(217,138,18,0.4)] hover:brightness-110 active:scale-[0.98] transition-all group mt-2"
            >
              Create Account
            </Link>
          </form>

          {/* Footer Link */}
          <p className="text-center text-[11px] font-medium text-white/50 mt-8 md:mt-9">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#f2a316] font-bold hover:underline underline-offset-4"
            >
              Login
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
