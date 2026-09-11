"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsAnimating(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    toggleTheme({ x, y });

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <button
      onClick={handleToggle}
      className={`btn btn-ghost btn-sm ${isAnimating ? "theme-toggle-animate" : ""}`}
      style={{
        width: "36px",
        height: "36px",
        padding: "0",
        borderRadius: "50%",
        border: "1px solid var(--border)",
        backgroundColor: "var(--bg-card)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
      aria-label="Toggle theme"
    >
      <span
        key={theme}
        className="theme-icon-animate"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {theme === "light" ? (
          <Moon size={17} style={{ color: "var(--text-main)" }} />
        ) : (
          <Sun size={17} style={{ color: "var(--accent)" }} />
        )}
      </span>
    </button>
  );
}
