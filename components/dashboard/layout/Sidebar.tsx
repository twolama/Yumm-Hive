"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutGrid,
  Hexagon,
  BarChart,
  Lightbulb,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Overview", href: "/dashboard", icon: LayoutGrid },
  { name: "My Hives", href: "/dashboard/my-hives", icon: Hexagon },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  {
    name: "Recommendations",
    href: "/dashboard/recommendations",
    icon: Lightbulb,
  },
];

const BOTTOM_LINKS = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
];

type SidebarProps = {
  collapsed?: boolean;
  mobile?: boolean;
  open?: boolean;
  onCloseMobile?: () => void;
  onNavigateMobile?: () => void;
};

export default function Sidebar({
  collapsed = false,
  mobile = false,
  open = false,
  onCloseMobile,
  onNavigateMobile,
}: SidebarProps) {
  const pathname = usePathname();

  const shell = (
    <div
      className={cn(
        "h-screen flex flex-col bg-[color:var(--sidebar-panel)] text-[color:var(--sidebar-text)] border-r border-[color:var(--sidebar-divider)]",
        collapsed ? "w-24" : "w-[280px]",
      )}
    >
      {/* Logo Area */}
      <div
        className={cn(
          "px-5 bg-sidebar border-b border-[color:var(--sidebar-divider)]",
          collapsed ? "pt-6 pb-6" : "pt-7 pb-7",
        )}
      >
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "gap-3",
          )}
        >
          <Image
            src="/Yumm_Logo.png"
            alt="Yumm logo"
            width={56}
            height={56}
            priority
            quality={100}
            unoptimized
            className={cn(
              "h-auto shrink-0 transition-[width] duration-200 drop-shadow-[0_8px_24px_rgba(0,0,0,0.22)]",
              collapsed ? "w-[52px]" : "w-[64px] sm:w-[72px] md:w-[78px]",
            )}
          />

          {!collapsed && (
            <Image
              src="/Yumm_text.png"
              alt="Yumm"
              width={150}
              height={46}
              priority
              quality={100}
              unoptimized
              className="h-auto max-w-full w-[92px] sm:w-[104px] md:w-[112px] transition-[width] duration-200"
            />
          )}
        </div>
      </div>

      {/* Main Nav */}
      <div
        className={cn(
          "flex-1 space-y-1",
          collapsed ? "px-3 py-5" : "px-5 py-6",
        )}
      >
        {NAV_LINKS.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" &&
              pathname.startsWith(`${link.href}/`));
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onNavigateMobile}
              className={cn(
                "group relative flex items-center rounded-2xl font-semibold text-[15px] transition-all",
                collapsed
                  ? "justify-center w-14 h-14 mx-auto"
                  : "gap-4 px-5 py-3.5",
                isActive
                  ? "bg-[color:var(--sidebar-active-bg)] text-[color:var(--sidebar-active-fg)] shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)]"
                  : "text-[color:var(--sidebar-text)] hover:bg-[color:var(--sidebar-hover)]",
              )}
              aria-label={collapsed ? link.name : undefined}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive
                    ? "text-[color:var(--sidebar-active-fg)]"
                    : "text-[color:var(--sidebar-muted)] group-hover:text-[color:var(--sidebar-text)]",
                )}
              />
              {!collapsed && link.name}
              {collapsed && !mobile && (
                <span className="pointer-events-none absolute left-full top-1/2 z-40 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-[color:var(--surface-1)] px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-lg ring-1 ring-[color:var(--border-soft)] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  {link.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Nav */}
      <div
        className={cn(
          "space-y-1 border-t border-[color:var(--sidebar-divider)]",
          collapsed ? "px-3 pt-4 pb-6" : "px-5 pt-4 pb-8",
        )}
      >
        {BOTTOM_LINKS.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" &&
              pathname.startsWith(`${link.href}/`));
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onNavigateMobile}
              className={cn(
                "group relative flex items-center rounded-2xl font-semibold text-[15px] transition-all",
                collapsed
                  ? "justify-center w-14 h-14 mx-auto"
                  : "gap-4 px-5 py-3",
                isActive
                  ? "bg-[color:var(--sidebar-active-bg)] text-[color:var(--sidebar-active-fg)] shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)]"
                  : "text-[color:var(--sidebar-text)] hover:bg-[color:var(--sidebar-hover)]",
              )}
              aria-label={collapsed ? link.name : undefined}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive
                    ? "text-[color:var(--sidebar-active-fg)]"
                    : "text-[color:var(--sidebar-muted)] group-hover:text-[color:var(--sidebar-text)]",
                )}
              />
              {!collapsed && link.name}
              {collapsed && !mobile && (
                <span className="pointer-events-none absolute left-full top-1/2 z-40 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-[color:var(--surface-1)] px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-lg ring-1 ring-[color:var(--border-soft)] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  {link.name}
                </span>
              )}
            </Link>
          );
        })}

        <button
          className={cn(
            "group relative w-full flex items-center rounded-2xl font-semibold text-[15px] text-[color:var(--sidebar-text)] hover:bg-[color:var(--sidebar-hover)] transition-colors",
            collapsed
              ? "justify-center w-14 h-14 mx-auto"
              : "gap-4 px-5 py-3 mt-2",
          )}
          aria-label={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 text-[color:var(--sidebar-muted)]" />
          {!collapsed && "Logout"}
          {collapsed && !mobile && (
            <span className="pointer-events-none absolute left-full top-1/2 z-40 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-[color:var(--surface-1)] px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-lg ring-1 ring-[color:var(--border-soft)] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );

  if (!mobile) {
    return shell;
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/55 backdrop-blur-[1px]"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          <div className="relative w-[280px] max-w-[85vw]">
            {shell}
            <button
              onClick={onCloseMobile}
              className="absolute right-3 top-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/15 text-[color:var(--sidebar-text)] hover:bg-black/25 transition-colors"
              aria-label="Close sidebar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
