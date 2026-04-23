"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Paperclip,
  Plus,
  Search,
  SendHorizontal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  hiveChoices,
  recommendationActions,
  recommendationCopy,
  type HiveChoice,
} from "@/lib/recommendations";

const toneClassMap: Record<HiveChoice["tone"], string> = {
  optimal: "text-[color:var(--status-optimal)]",
  active: "text-[color:var(--muted)]",
  alert: "text-[color:var(--status-critical)]",
};

export default function RecommendationsPanel() {
  const [selectedHiveIds, setSelectedHiveIds] = useState<string[]>([]);
  const [activeAction, setActiveAction] = useState(
    recommendationActions[0]?.id ?? "",
  );
  const [isHivePickerOpen, setIsHivePickerOpen] = useState(false);
  const [hiveSearchTerm, setHiveSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; hives?: string[] }[]
  >([]);

  const pickerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll management
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Close hive picker on click outside
  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsHivePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  const toggleHiveSelection = (hiveId: string) => {
    setSelectedHiveIds((current) => {
      const isSelecting = !current.includes(hiveId);
      if (isSelecting && isHivePickerOpen) {
        const lastAtPos = message.lastIndexOf("@");
        if (lastAtPos !== -1) {
          const newMessage = message.substring(0, lastAtPos).trimEnd() + " ";
          setMessage(newMessage);
        }
        setIsHivePickerOpen(false);
        setHiveSearchTerm("");
        inputRef.current?.focus();
      }
      return isSelecting
        ? [...current, hiveId]
        : current.filter((id) => id !== hiveId);
    });
  };

  const removeHiveTag = (hiveId: string) => {
    setSelectedHiveIds((current) => current.filter((id) => id !== hiveId));
  };

  const selectedHives = useMemo(
    () =>
      selectedHiveIds
        .map((id) => hiveChoices.find((h) => h.id === id))
        .filter(Boolean) as HiveChoice[],
    [selectedHiveIds],
  );

  const filteredHives = useMemo(() => {
    const term = hiveSearchTerm.trim().toLowerCase();
    if (!term) return hiveChoices;
    return hiveChoices.filter(
      (hive) =>
        hive.label.toLowerCase().includes(term) ||
        hive.id.toLowerCase().includes(term),
    );
  }, [hiveSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);

    const lastAtPos = value.lastIndexOf("@");
    if (lastAtPos !== -1) {
      const textAfterAt = value.substring(lastAtPos + 1);
      if (lastAtPos === 0 || value[lastAtPos - 1] === " ") {
        if (!textAfterAt.includes(" ")) {
          setIsHivePickerOpen(true);
          setHiveSearchTerm(textAfterAt);
          return;
        }
      }
    }
    if (isHivePickerOpen) setIsHivePickerOpen(false);
  };

  const handleSendMessage = (customContent?: string) => {
    const finalContent = customContent || message;
    if (!finalContent.trim() && selectedHiveIds.length === 0) return;

    const userMsg = {
      role: "user" as const,
      content: finalContent,
      hives: [...selectedHiveIds],
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customContent) setMessage("");
    setSelectedHiveIds([]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I've processed your request. Based on the sensor data, everything appears optimal. Would you like a detailed report?",
        },
      ]);
    }, 1000);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background">
      {/* Scrollable area with inline-styled fade mask and no-scrollbar logic */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-smooth px-4 sm:px-6"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 80%, transparent 96%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 80%, transparent 96%)",
        }}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[800px] flex-col pb-20 transition-all duration-500",
            hasMessages
              ? "pt-12 sm:pt-16 lg:pt-24"
              : "min-h-[calc(100vh-180px)] items-center justify-center text-center",
          )}
        >
          {/* Welcome Area */}
          <div
            className={cn(
              "shrink-0 space-y-6 lg:space-y-8 transition-all duration-500",
              !hasMessages ? "max-w-[640px]" : "w-full",
            )}
          >
            <div
              className={cn(
                "space-y-4",
                !hasMessages && "flex flex-col items-center text-center",
              )}
            >
              <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
                {recommendationCopy.heading}
              </h1>
              <p className="text-base text-[color:var(--muted)] sm:text-lg leading-relaxed max-w-[600px]">
                {recommendationCopy.intro}{" "}
                <span className="font-bold text-[color:var(--status-warning)]">
                  {recommendationCopy.highlightedHive}
                </span>{" "}
                {recommendationCopy.outro}
              </p>
            </div>

            <div
              className={cn(
                "flex flex-wrap gap-2",
                !hasMessages && "justify-center",
              )}
            >
              {recommendationActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleSendMessage(action.label)}
                  className="rounded-xl border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] px-4 py-2 text-xs font-bold text-[color:var(--muted)] hover:bg-[color:var(--surface-3)] hover:text-foreground transition-all active:scale-95 shadow-sm"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          {hasMessages && (
            <div className="mt-12 flex w-full flex-col gap-8">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex flex-col gap-3",
                    msg.role === "user" ? "items-end" : "items-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-[24px] px-5 py-3.5 text-[15px] leading-relaxed shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300",
                      msg.role === "user"
                        ? "rounded-tr-none bg-[color:var(--primary)] text-white"
                        : "rounded-tl-none border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] text-foreground",
                    )}
                  >
                    {msg.hives && msg.hives.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {msg.hives.map((id) => (
                          <span
                            key={id}
                            className="rounded-md bg-black/10 dark:bg-white/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider"
                          >
                            @{hiveChoices.find((h) => h.id === id)?.label || id}
                          </span>
                        ))}
                      </div>
                    )}
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Input Section */}
      <div className="relative w-full shrink-0 bg-background pt-4 pb-4 px-4 sm:px-6 z-20">
        <div className="relative mx-auto max-w-[760px]">
          {isHivePickerOpen && (
            <div
              ref={pickerRef}
              className="absolute bottom-full mb-3 left-0 w-full sm:w-[320px] rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-2 shadow-2xl z-50"
            >
              <div className="flex items-center gap-2 px-3 py-2 border-b border-[color:var(--border-soft)]/50 mb-1">
                <Search className="h-3.5 w-3.5 text-[color:var(--muted)]" />
                <input
                  autoFocus
                  type="text"
                  value={hiveSearchTerm}
                  onChange={(e) => setHiveSearchTerm(e.target.value)}
                  placeholder="Mention hive..."
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                />
              </div>
              <ul
                className="max-h-[220px] overflow-y-auto space-y-0.5"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {filteredHives.map((hive) => (
                  <li key={hive.id}>
                    <button
                      onClick={() => toggleHiveSelection(hive.id)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 hover:bg-[color:var(--surface-2)] transition-colors group text-left"
                    >
                      <span className="text-sm font-bold text-foreground group-hover:text-[color:var(--primary)]">
                        {hive.label}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-black uppercase tracking-tighter",
                          toneClassMap[hive.tone],
                        )}
                      >
                        {hive.statusText}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="relative flex flex-col rounded-[26px] border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] shadow-sm focus-within:border-[color:var(--primary)]/40 focus-within:ring-2 focus-within:ring-[color:var(--primary)]/5 transition-all">
            {selectedHives.length > 0 && (
              <div className="flex flex-wrap gap-1.5 px-3 pt-2 pb-1 border-b border-[color:var(--border-soft)]/30">
                {selectedHives.map((hive) => (
                  <span
                    key={hive.id}
                    className="inline-flex items-center gap-1 rounded-lg bg-[color:var(--primary)]/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[color:var(--primary)]"
                  >
                    @{hive.label}
                    <button
                      onClick={() => removeHiveTag(hive.id)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center h-12 px-2 gap-0.5">
              <button className="h-9 w-9 flex items-center justify-center rounded-full text-[color:var(--muted)] hover:bg-[color:var(--surface-1)] transition-colors">
                <Paperclip className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => setIsHivePickerOpen(!isHivePickerOpen)}
                className="h-9 w-9 flex items-center justify-center rounded-full text-[color:var(--muted)] hover:bg-[color:var(--surface-1)] transition-colors"
              >
                <Plus className="h-4.5 w-4.5" />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                placeholder={recommendationCopy.promptPlaceholder}
                className="flex-1 bg-transparent px-2 text-sm focus:outline-none placeholder:text-[color:var(--muted)]/40"
              />
              <button
                disabled={!message.trim() && selectedHiveIds.length === 0}
                onClick={() => handleSendMessage()}
                className="h-9 w-9 flex items-center justify-center rounded-xl bg-[color:var(--primary)] text-white shadow transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale"
              >
                <SendHorizontal className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[color:var(--muted)]/30">
            Secure BeeGuard AI &bull; Hive Health Verification
          </p>
        </div>
      </div>
    </div>
  );
}
