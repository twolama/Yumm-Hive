"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type DropdownOption = {
  value: string;
  label: string;
  description?: string;
};

type DropdownOptionItemProps = {
  option: DropdownOption;
  selected: boolean;
  onSelect: (value: string) => void;
};

export function DropdownOptionItem({ option, selected, onSelect }: DropdownOptionItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(option.value)}
        className={cn(
          "flex w-full items-start justify-between gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
          selected
            ? "bg-[color:var(--primary)]/15 text-foreground"
            : "text-foreground hover:bg-[color:var(--surface-2)]"
        )}
      >
        <span>
          <span className="block text-sm font-semibold">{option.label}</span>
          {option.description && <span className="mt-0.5 block text-xs text-[color:var(--muted)]">{option.description}</span>}
        </span>

        <span
          className={cn(
            "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
            selected
              ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
              : "border-[color:var(--border-soft)] text-transparent"
          )}
        >
          <Check className="h-3 w-3" />
        </span>
      </button>
    </li>
  );
}

type CustomDropdownProps = {
  id: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
};

export default function CustomDropdown({ id, value, options, onChange, error, placeholder = "Select an option" }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(() => options.find((option) => option.value === value), [options, value]);

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current || rootRef.current.contains(event.target as Node)) {
        return;
      }
      setIsOpen(false);
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          "flex h-14 w-full items-center justify-between gap-3 rounded-2xl border bg-[color:var(--surface-2)] px-4 text-left text-base text-foreground transition-colors focus:outline-none focus:ring-2",
          isOpen
            ? "border-[color:var(--primary)]/70 ring-[color:var(--primary)]/40"
            : "border-[color:var(--border-soft)] focus:ring-[color:var(--primary)]/40",
          error && "border-[color:var(--status-critical)] focus:ring-[color:var(--status-critical)]/40"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn("truncate", !selected && "text-[color:var(--muted)]")}>{selected?.label ?? placeholder}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[color:var(--muted)] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-2 shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
          <ul role="listbox" aria-labelledby={id} className="max-h-64 space-y-1 overflow-auto">
            {options.map((option) => (
              <DropdownOptionItem
                key={option.value}
                option={option}
                selected={option.value === value}
                onSelect={handleSelect}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
