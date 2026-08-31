"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "full" | "light" | "dark";
  className?: string;
}

export function LogoIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="leafGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#58a053" />
          <stop offset="0.6" stopColor="#3f7d3a" />
          <stop offset="1" stopColor="#2c5c28" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="12" y1="20" x2="36" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <filter id="logoShadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2c5c28" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Background Rounded Diamond Shield */}
      <rect
        x="5"
        y="5"
        width="38"
        height="38"
        rx="12"
        fill="url(#leafGrad)"
        filter="url(#logoShadow)"
      />

      {/* Central Agricultural Dynamic Sprout & Connection Ring */}
      <path
        d="M24 11C24 11 29 16 29 23C29 27.4183 25.4183 31 21 31C16.5817 31 13 27.4183 13 23C13 18 19 13 24 11Z"
        fill="#ffffff"
        fillOpacity="0.95"
      />

      {/* Golden Rising Growth Sprout Leaf */}
      <path
        d="M24 14C24 14 35 17 35 27C35 32 30.5 36 25 36C21.5 36 18.5 34.5 17 32C22 33 27 30 28 25C29 20 25 16 24 14Z"
        fill="url(#goldGrad)"
      />

      {/* Modern Center Core Node */}
      <circle cx="24" cy="24" r="3" fill="#ffffff" />
      <path
        d="M24 21V16M24 32V27M16 24H21M27 24H32"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  size = "md",
  showText = true,
  variant = "full",
  className = "",
}: LogoProps) {
  const iconSizes = {
    sm: 26,
    md: 34,
    lg: 42,
    xl: 52,
  };

  const fontSizes = {
    sm: "1.1rem",
    md: "1.35rem",
    lg: "1.65rem",
    xl: "2.1rem",
  };

  const pxSize = iconSizes[size];
  const fontSize = fontSizes[size];

  return (
    <Link
      href="/"
      className={`agrishare-brand-logo ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? "8px" : size === "xl" ? "14px" : "10px",
        textDecoration: "none",
        userSelect: "none",
      }}
    >
      <LogoIcon size={pxSize} />
      {showText && (
        <span
          style={{
            fontFamily: "Outfit, Inter, sans-serif",
            fontWeight: "900",
            fontSize: fontSize,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ color: "var(--primary)" }}>AGRI</span>
          <span
            style={{
              color: variant === "light" ? "#ffffff" : "var(--text-main)",
              marginLeft: "1px",
              background: "linear-gradient(135deg, var(--accent-gold), #eab308)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SHARE
          </span>
        </span>
      )}
    </Link>
  );
}
