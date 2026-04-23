"use client";

import Image from "next/image";
import { Bell, ChevronLeft, Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "@/app/providers";

type HeaderProps = {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onOpenMobileMenu: () => void;
};

export default function Header({
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenMobileMenu,
}: HeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const handleThemeToggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    setTheme(isDark ? "light" : "dark");

    window.setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 220);
  };

  return (
    <header className="h-[74px] sticky top-0 z-30 bg-[color:var(--surface-2)]/95 backdrop-blur-md border-b border-[color:var(--border-soft)]">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8 h-full flex items-center justify-between">
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        <div className="lg:hidden">
          <button
            onClick={onOpenMobileMenu}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[color:var(--fg)] hover:bg-[color:var(--surface-1)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={onToggleSidebar}
          className="hidden lg:inline-flex items-center justify-center w-10 h-10 rounded-full text-[color:var(--fg)] hover:bg-[color:var(--surface-1)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Toggle sidebar collapse"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-200 ${isSidebarCollapsed ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        <div className="hidden md:flex relative w-full max-w-[320px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[color:var(--muted)]" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 border border-[color:var(--border-soft)] rounded-full bg-[color:var(--surface-1)] text-sm text-foreground placeholder-[color:var(--muted)] focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            placeholder="Search apiary..."
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-3 md:gap-5">
        <button
          className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[color:var(--muted)] hover:text-foreground hover:bg-[color:var(--surface-1)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Notifications"
        >
          <Bell className="h-[20px] w-[20px]" />
        </button>

        <button
          onClick={handleThemeToggle}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[color:var(--muted)] hover:text-foreground hover:bg-[color:var(--surface-1)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-[20px] w-[20px]" /> : <Moon className="h-[20px] w-[20px]" />}
        </button>

        <div className="flex items-center gap-3 pl-3 md:pl-5 border-l border-[color:var(--border-soft)]">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[15px] font-bold text-foreground leading-none">Natnael Behaylu</span>
            <span className="text-[11px] font-bold text-[color:var(--muted)] mt-1 tracking-widest uppercase">Admin</span>
          </div>
          <Image
            className="h-[40px] w-[40px] rounded-full object-cover border border-[color:var(--border-soft)]"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
            alt="User profile"
            width={40}
            height={40}
          />
        </div>
      </div>
      </div>
    </header>
  );
}
