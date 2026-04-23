"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within Providers");
  }

  return context;
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Initialize theme correctly (no useEffect needed for this)
  const [resolvedTheme, setResolvedTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark"; // SSR fallback

    const storedTheme = window.localStorage.getItem("theme");
    return storedTheme === "light" ? "light" : "dark";
  });

  // ✅ Apply theme when it changes
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // ✅ Update theme
  const setTheme = useCallback((theme: Theme) => {
    setResolvedTheme(theme);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  }, []);

  const value = useMemo(
    () => ({ resolvedTheme, setTheme }),
    [resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
