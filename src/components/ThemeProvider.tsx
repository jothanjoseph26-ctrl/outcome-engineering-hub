"use client";

import { useEffect } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
};

// Lightweight theme provider to avoid next-themes injecting a <script />
// (which Next can reject when rendered inside components).
export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
}: ThemeProviderProps) {
  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
      let theme = stored ?? defaultTheme;

      if (theme === "system" && enableSystem && typeof window !== "undefined") {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }

      if (attribute === "class") {
        if (theme === "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.setAttribute(attribute, theme);
      }
    } catch (e) {
      // ignore storage access errors in some environments
    }
  }, [attribute, defaultTheme, enableSystem]);

  return <>{children}</>;
}
