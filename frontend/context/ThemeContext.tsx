"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("agrishare_theme") as Theme | null;
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const applyTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    localStorage.setItem("agrishare_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = (origin?: { x: number; y: number }) => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";

    // If browser supports Modern View Transition API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? window.innerHeight / 2;

      // Calculate max radius to furthest corner
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.style.setProperty("--theme-origin-x", `${x}px`);
      document.documentElement.style.setProperty("--theme-origin-y", `${y}px`);
      document.documentElement.classList.add("theme-transitioning");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transition = (document as any).startViewTransition(() => {
        applyTheme(nextTheme);
      });

      transition.ready
        .then(() => {
          // Buttery smooth organic wave animation originating directly from button center
          if (nextTheme === "dark") {
            // Expanding Dark Wave outward from button across whole screen
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 650,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
          } else {
            // Reverting to Light: Dark screen shrinks back directly into button revealing light mode
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                  `circle(0px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 650,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                pseudoElement: "::view-transition-old(root)",
              }
            );
          }
        })
        .catch(() => {
          // Fallback if rejected
        })
        .finally(() => {
          transition.finished.finally(() => {
            document.documentElement.classList.remove("theme-transitioning");
          });
        });
    } else {
      // Fallback for browsers without View Transitions
      applyTheme(nextTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: mounted ? theme : "light", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
