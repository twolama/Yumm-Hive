"use client";

import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#f2a316] flex flex-col font-sans selection:bg-[#714b00] selection:text-white">
      <Navbar variant="auth" />

      {/* MAIN CONTENT - COMPACT FORGOT PASSWORD CARD */}
      <main className="flex-1 flex items-center justify-center px-4 py-6 md:py-10">
        <div className="w-full max-w-[400px] bg-[#141818] rounded-[36px] p-6 md:p-9 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center mb-6 md:mb-7">
            <h1 className="text-2xl md:text-3xl font-[950] text-white tracking-tight leading-none mb-2">
              Forgot Password
            </h1>
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
              Step 1: Verify Identity
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#f2a316] ml-0.5">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#141818]/40 transition-colors group-focus-within:text-[#714b00]">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <input
                  type="email"
                  placeholder="beekeeper@example.com"
                  className="w-full h-[48px] bg-[#fde3b4] rounded-xl pl-10 pr-4 text-[14px] font-bold text-[#141818] placeholder:text-[#141818]/30 focus:outline-none focus:ring-2 focus:ring-[#f2a316]/50 transition-all border-none"
                />
              </div>
              <p className="text-[10px] font-bold text-[#f2a316]/50 ml-1 mt-1">
                We&apos;ll send a secure reset link to this address.
              </p>
            </div>

            {/* Send Link Button */}
            <button
              type="submit"
              className="flex w-full h-[52px] items-center justify-center gap-2 bg-[#d98a12] rounded-[16px] text-[15px] font-black text-white shadow-[0_8px_16px_-4px_rgba(217,138,18,0.4)] hover:brightness-110 active:scale-[0.98] transition-all group mt-4"
            >
              Send Reset Link{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-white/5" />

          {/* Footer Link */}
          <div className="flex justify-center">
            <Link
              href="/login"
              className="flex items-center gap-2 text-[11px] font-bold text-[#f2a316] hover:underline underline-offset-4 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              Back to Login
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
