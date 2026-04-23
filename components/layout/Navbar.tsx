"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  variant?: "landing" | "auth";
}

export default function Navbar({ variant = "landing" }: NavbarProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <header className="w-full bg-[#f2a316] border-b border-[#714b00]/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-2 md:py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 md:gap-4 group cursor-pointer"
        >
          <div className="relative w-10 h-10 md:w-14 md:h-14 transition-transform duration-500 group-hover:rotate-12">
            <Image
              src="/Yumm_Logo.png"
              alt="Yumm Logo"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <Image
            src="/Yumm_text.png"
            alt="Yumm"
            width={100}
            height={32}
            className="h-auto w-18 md:w-24 object-contain"
            priority
          />
        </Link>

        {variant === "landing" ? (
          <Link
            href="/login"
            className="bg-[#714b00] text-white px-6 md:px-8 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold tracking-tight hover:bg-[#5a3c00] hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            Login
          </Link>
        ) : (
          <Link
            href={isLoginPage ? "/signup" : "/login"}
            className="bg-[#714b00] text-white px-6 md:px-7 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-black tracking-wide hover:brightness-110 transition-all shadow-lg active:scale-95"
          >
            {isLoginPage ? "Sign Up" : "Login"}
          </Link>
        )}
      </div>
    </header>
  );
}
