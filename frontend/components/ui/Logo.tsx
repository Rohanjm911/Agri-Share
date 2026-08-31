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
      {/* Solid Forest Green Background Shield */}
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="10"
        fill="var(--primary)"
      />

      {/* Solid White Sprout Shape */}
      <path
        d="M24 11C24 11 29 16 29 23C29 27.4183 25.4183 31 21 31C16.5817 31 13 27.4183 13 23C13 18 19 13 24 11Z"
        fill="#ffffff"
      />

      {/* Solid Amber Growth Leaf */}
      <path
        d="M24 14C24 14 35 17 35 27C35 32 30.5 36 25 36C21.5 36 18.5 34.5 17 32C22 33 27 30 28 25C29 20 25 16 24 14Z"
        fill="var(--accent-gold)"
      />

      {/* Center Pin Node */}
      <circle cx="24" cy="24" r="3" fill="#ffffff" />
      <path
        d="M24 20V16M24 32V28M16 24H20M28 24H32"
        stroke="#ffffff"
        strokeWidth="2.5"
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
    xl: 50,
  };

  const fontSizes = {
    sm: "1.1rem",
    md: "1.35rem",
    lg: "1.65rem",
    xl: "2rem",
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
        gap: size === "sm" ? "8px" : size === "xl" ? "12px" : "10px",
        textDecoration: "none",
        userSelect: "none",
      }}
    >
      <LogoIcon size={pxSize} />
      {showText && (
        <span
          style={{
            fontFamily: "var(--font-family-heading)",
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
              color: "var(--accent-gold)",
              marginLeft: "1px",
            }}
          >
            SHARE
          </span>
        </span>
      )}
    </Link>
  );
}
