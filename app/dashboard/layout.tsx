"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import Header from "@/components/dashboard/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground">
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block shrink-0 sticky top-0 h-screen transition-[width] duration-200 ease-out ${isSidebarCollapsed ? "w-24" : "w-[280px]"}`}
      >
        <Sidebar collapsed={isSidebarCollapsed} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <Sidebar
          mobile
          open={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          onNavigateMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6 xl:px-8 xl:py-8">
          <div className="w-full max-w-[1400px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
