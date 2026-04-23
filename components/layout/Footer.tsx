"use client";

import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-10 mt-auto shrink-0">
      <div className="flex flex-col gap-3">
        <Image
          src="/Yumm_text.png"
          alt="Yumm"
          width={100}
          height={32}
          className="h-auto w-20 md:w-28 object-contain"
        />
        <p className="text-[10px] font-bold text-[#141414]/40 tracking-widest uppercase">
          © {currentYear} Yumm. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
