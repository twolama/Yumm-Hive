"use client";

import { useEffect } from "react";
import RecommendationsPanel from "@/components/dashboard/recommendations/RecommendationsPanel";

export default function RecommendationsPage() {
  /**
   * Enforce a clean, no-scroll interface for the dashboard layout
   * while this page is active. We target the main containers
   * to ensure only the chat component's internal logic applies.
   */
  useEffect(() => {
    // 1. Disable scrolling on the main dashboard container
    const mainContent = document.querySelector("main");

    if (mainContent) {
      mainContent.style.overflow = "hidden";
    }

    // 2. Hide scrollbars globally via style injection for this page session
    // This removes the visual scrollbar while maintaining independent scroll functionality.
    const style = document.createElement("style");
    style.id = "hide-global-scrollbar";
    style.innerHTML = `
      html, body, main {
        overflow: hidden !important;
      }
      /* Hide scrollbar for Chrome, Safari and Opera */
      *::-webkit-scrollbar {
        display: none !important;
      }
      /* Hide scrollbar for IE, Edge and Firefox */
      * {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Restore overflow when leaving the page
      if (mainContent) {
        mainContent.style.overflow = "";
      }
      const existingStyle = document.getElementById("hide-global-scrollbar");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="relative -mx-4 -my-4 flex h-[calc(100vh-74px)] flex-col overflow-hidden md:-mx-6 md:-my-6 xl:-mx-8 xl:-my-8">
      <RecommendationsPanel />
    </div>
  );
}
