"use client";

import React, { useState, useEffect } from "react";

export function RealtimeClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set time after mounting to prevent SSR hydration mismatch
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 12px",
          height: "32px",
          borderRadius: "9999px",
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: "0.78rem",
          fontWeight: "500",
          whiteSpace: "nowrap",
          opacity: 0.6,
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--text-muted)",
          }}
        />
        <span>--:--:--</span>
      </div>
    );
  }

  const hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = String(hours % 12 || 12).padStart(2, "0");

  const dateTooltip = time.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      title={`Current Time • ${dateTooltip}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "0 12px",
        height: "36px",
        borderRadius: "9999px",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "none",
        color: "var(--text-main)",
        fontSize: "0.8rem",
        fontWeight: "600",
        whiteSpace: "nowrap",
        userSelect: "none",
        cursor: "default",
        letterSpacing: "0.01em",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Live green pulsing indicator dot */}
      <span
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "8px",
          height: "8px",
        }}
      >
        <span
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "var(--primary)",
            opacity: 0.75,
            animation: "ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
          }}
        />
        <span
          style={{
            position: "relative",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--primary)",
          }}
        />
      </span>

      {/* Digits with tabular layout & sleek am/pm badge */}
      <span
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontVariantNumeric: "tabular-nums",
          fontSize: "0.8rem",
          fontWeight: "600",
          letterSpacing: "0.03em",
          color: "var(--text-main)",
        }}
      >
        {formattedHours}:{minutes}
        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: "400" }}>
          :{seconds}
        </span>
      </span>

      <span
        style={{
          fontSize: "0.68rem",
          fontWeight: "700",
          letterSpacing: "0.04em",
          padding: "1px 5px",
          borderRadius: "4px",
          backgroundColor: "var(--primary-light)",
          color: "var(--primary)",
          lineHeight: "1.2",
        }}
      >
        {ampm}
      </span>
    </div>
  );
}
