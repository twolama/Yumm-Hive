"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Camera, Eye, EyeOff, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/app/providers";

const OPENAI_MODELS = ["GPT-5.4", "GPT-4o", "o1-preview"];
const GEMINI_MODELS = [
  "Gemini 1.5 Pro",
  "Gemini 1.5 Flash",
  "Gemini 1.0 Ultra",
];

export default function SettingsPanel() {
  const { resolvedTheme, setTheme } = useTheme();
  const [showApiKey, setShowApiKey] = useState(false);
  const [aiProvider, setAiProvider] = useState<"openai" | "gemini">("openai");
  const [selectedModel, setSelectedModel] = useState(OPENAI_MODELS[0]);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentModels = aiProvider === "openai" ? OPENAI_MODELS : GEMINI_MODELS;

  // Sync selected model when provider changes
  useEffect(() => {
    setSelectedModel(
      aiProvider === "openai" ? OPENAI_MODELS[0] : GEMINI_MODELS[0],
    );
  }, [aiProvider]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsModelDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      {/* USER PROFILE SECTION */}
      <section className="rounded-[32px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-8 shadow-sm">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[color:var(--muted)] mb-8">
          User Profile
        </h3>
        <div className="flex flex-col md:flex-row items-start gap-8 md:items-center">
          <div className="relative group shrink-0">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={triggerFileUpload}
              className="h-28 w-28 overflow-hidden rounded-[24px] bg-[color:var(--surface-2)] border border-[color:var(--border-soft)] flex items-center justify-center relative cursor-pointer"
            >
              <Image
                src={profileImage}
                alt="Profile"
                width={112}
                height={112}
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <button
              onClick={triggerFileUpload}
              className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#d98a12] text-white shadow-lg border-4 border-[color:var(--surface-1)] hover:scale-110 transition-transform"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[color:var(--muted)]">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Natnael Behaylu"
                className="w-full rounded-2xl border border-transparent bg-[color:var(--surface-2)] px-6 py-4 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/20 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[color:var(--muted)]">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="natnaelbehaylu@gmail.com"
                className="w-full rounded-2xl border border-transparent bg-[color:var(--surface-2)] px-6 py-4 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/20 transition-all"
              />
            </div>
          </div>

          <button className="md:self-end h-[56px] px-8 rounded-2xl bg-[#d98a12] text-sm font-black text-white shadow-[0_8px_20px_-4px_rgba(217,138,18,0.4)] hover:brightness-110 active:scale-[0.98] transition-all whitespace-nowrap">
            Update Information
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECURITY SECTION */}
        <section className="rounded-[32px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-8 shadow-sm flex flex-col h-full">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[color:var(--muted)] mb-8">
            Security
          </h3>
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[color:var(--muted)]">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-transparent bg-[color:var(--surface-2)] px-6 py-4 text-sm font-bold text-foreground focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[color:var(--muted)]">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-transparent bg-[color:var(--surface-2)] px-6 py-4 text-sm font-bold text-foreground focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[color:var(--muted)]">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-transparent bg-[color:var(--surface-2)] px-6 py-4 text-sm font-bold text-foreground focus:outline-none"
              />
            </div>
          </div>
          <button className="mt-8 h-[56px] w-full rounded-2xl bg-[#eceaea] dark:bg-[color:var(--surface-2)] border border-transparent dark:border-[color:var(--border-soft)] text-sm font-black text-[#6d5b45] dark:text-[color:var(--muted)] hover:brightness-95 dark:hover:bg-[color:var(--surface-3)] transition-all">
            Change Password
          </button>
        </section>

        {/* AI CONFIGURATION SECTION */}
        <section className="rounded-[32px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-8 shadow-sm flex flex-col h-full">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[color:var(--muted)] mb-8">
            AI Configuration
          </h3>
          <div className="space-y-6 flex-1">
            {/* Provider Switcher */}
            <div className="flex rounded-2xl bg-[color:var(--surface-2)] p-1.5 border border-[color:var(--border-soft)]">
              <button
                onClick={() => setAiProvider("openai")}
                className={cn(
                  "flex-1 py-3.5 rounded-[14px] text-sm font-black transition-all",
                  aiProvider === "openai"
                    ? "bg-[color:var(--surface-1)] text-[color:var(--primary)] shadow-sm ring-1 ring-black/5"
                    : "text-[color:var(--muted)] hover:text-foreground",
                )}
              >
                OpenAI
              </button>
              <button
                onClick={() => setAiProvider("gemini")}
                className={cn(
                  "flex-1 py-3.5 rounded-[14px] text-sm font-black transition-all",
                  aiProvider === "gemini"
                    ? "bg-[color:var(--surface-1)] text-[color:var(--primary)] shadow-sm ring-1 ring-black/5"
                    : "text-[color:var(--muted)] hover:text-foreground",
                )}
              >
                Gemini
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[color:var(--muted)]">
                API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  defaultValue="sk-••••••••••••••••••••••"
                  className="w-full rounded-2xl border border-transparent bg-[color:var(--surface-2)] px-6 py-4 text-sm font-bold text-foreground focus:outline-none pr-12"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--muted)] hover:text-foreground"
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[color:var(--muted)]">
                Model
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                  className="flex h-[56px] w-full items-center justify-between rounded-2xl border border-transparent bg-[color:var(--surface-2)] px-6 text-sm font-bold text-foreground transition-all hover:bg-[color:var(--surface-3)]"
                >
                  {selectedModel}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform text-[color:var(--muted)]",
                      isModelDropdownOpen && "rotate-180",
                    )}
                  />
                </button>
                {isModelDropdownOpen && (
                  <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    {currentModels.map((model) => (
                      <button
                        key={model}
                        onClick={() => {
                          setSelectedModel(model);
                          setIsModelDropdownOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-bold hover:bg-[color:var(--surface-2)] transition-colors group"
                      >
                        <span
                          className={cn(
                            selectedModel === model
                              ? "text-[color:var(--primary)]"
                              : "text-foreground group-hover:text-[color:var(--primary)]",
                          )}
                        >
                          {model}
                        </span>
                        {selectedModel === model && (
                          <Check className="h-4 w-4 text-[color:var(--primary)]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button className="h-[56px] w-full rounded-2xl bg-[#d98a12] text-sm font-black text-white hover:brightness-110 transition-all uppercase tracking-widest shadow-[0_8px_20px_-4px_rgba(217,138,18,0.4)]">
              Connect API
            </button>
            <p className="text-[10px] text-center font-bold text-[color:var(--muted)]">
              Configure your model credentials to enable hive automation
              features.
            </p>
          </div>
        </section>
      </div>

      {/* SYSTEM PREFERENCES SECTION */}
      <section className="rounded-[32px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-8 shadow-sm">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[color:var(--muted)] mb-8">
          System Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-6 rounded-3xl bg-[color:var(--surface-2)] border border-[color:var(--border-soft)]/50">
            <div>
              <p className="text-[15px] font-black text-foreground">
                Dark Mode
              </p>
              <p className="text-[11px] font-bold text-[color:var(--muted)]">
                Switch UI appearance
              </p>
            </div>
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className={cn(
                "h-7 w-12 rounded-full relative transition-colors duration-300 ring-4 ring-transparent",
                resolvedTheme === "dark"
                  ? "bg-[color:var(--primary)]"
                  : "bg-gray-200 dark:bg-gray-800",
              )}
            >
              <div
                className={cn(
                  "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300",
                  resolvedTheme === "dark" ? "right-1" : "left-1",
                )}
              />
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-6 rounded-3xl bg-[color:var(--surface-2)] border border-[color:var(--border-soft)]/50">
            <div>
              <p className="text-[15px] font-black text-foreground">
                Notifications
              </p>
              <p className="text-[11px] font-bold text-[color:var(--muted)]">
                Enable email alerts
              </p>
            </div>
            <button className="h-7 w-12 rounded-full bg-[color:var(--primary)] relative transition-colors cursor-pointer">
              <div className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* Health Reports Toggle */}
          <div className="flex items-center justify-between p-6 rounded-3xl bg-[color:var(--surface-2)] border border-[color:var(--border-soft)]/50">
            <div>
              <p className="text-[15px] font-black text-foreground">
                Health Reports
              </p>
              <p className="text-[11px] font-bold text-[color:var(--muted)]">
                Weekly hive analytics
              </p>
            </div>
            <button className="h-7 w-12 rounded-full bg-[color:var(--primary)] relative transition-colors cursor-pointer">
              <div className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
