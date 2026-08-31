"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-sm"
      style={{
        width: "38px",
        height: "38px",
        padding: "0",
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--border)",
      }}
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon size={18} style={{ color: "var(--text-main)" }} />
      ) : (
        <Sun size={18} style={{ color: "var(--accent-gold)" }} />
      )}
    </button>
  );
}
