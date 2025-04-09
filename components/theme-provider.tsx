"use client";

import { useState, useEffect } from "react";
import * as React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Default to dark (will be overridden)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run on client after mounting
    setIsMounted(true);
    
    // Get saved theme or system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    
    setTheme(savedTheme || (systemPrefersLight ? "light" : "dark"));
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Apply theme classes
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light-mode-gradient", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Prevent flash of wrong theme before mounting
  if (!isMounted) {
    return <div className="hidden">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const ThemeContext = React.createContext({
  theme: "dark" as "light" | "dark",
  toggleTheme: () => {},
});

export const useTheme = () => React.useContext(ThemeContext);