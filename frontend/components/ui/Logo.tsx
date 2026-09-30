"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "full" | "horizontal";
  className?: string;
}

/**
 * Brand Logo Icon: Emblem with 3 digital agro-leaves, circuit nodes & water waves.
 * Automatically adapts between Light & Dark themes with crisp high-resolution assets.
 */
export function LogoIcon({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`agrishare-logo-icon-container ${className}`}
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {/* Light Theme: Deep Agri Forest Green */}
      <Image
        src="/logo-icon.png"
        alt="AgriShare Emblem"
        width={size * 2}
        height={size * 2}
        priority
        className="logo-theme-light"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          filter: "drop-shadow(0 2px 4px rgba(15, 75, 6, 0.15))",
          transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {/* Dark Theme: Vibrant Agro-Tech Neon Emerald */}
      <Image
        src="/logo-icon-dark.png"
        alt="AgriShare Emblem"
        width={size * 2}
        height={size * 2}
        priority
        className="logo-theme-dark"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.35))",
          transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}

/**
 * Full Brand Logo component with responsive sizes, typography & layout options.
 */
export function Logo({
  size = "md",
  showText = true,
  variant = "default",
  className = "",
}: LogoProps) {
  const iconSizes: Record<NonNullable<LogoProps["size"]>, number> = {
    sm: 28,
    md: 38,
    lg: 48,
    xl: 60,
  };

  const fontSizes: Record<NonNullable<LogoProps["size"]>, string> = {
    sm: "1.15rem",
    md: "1.42rem",
    lg: "1.75rem",
    xl: "2.2rem",
  };

  const pxSize = iconSizes[size];
  const fontSize = fontSizes[size];

  // Full stacked lockup variant
  if (variant === "full") {
    const fullHeight = pxSize * 2.2;
    return (
      <Link
        href="/"
        className={`agrishare-brand-logo ${className}`}
        style={{
          display: "inline-block",
          textDecoration: "none",
          transition: "transform 0.2s ease",
        }}
      >
        <Image
          src="/logo.png"
          alt="AgriShare Full Logo"
          width={fullHeight}
          height={fullHeight}
          className="logo-theme-light"
          style={{ width: "auto", height: fullHeight, objectFit: "contain" }}
        />
        <Image
          src="/logo-dark.png"
          alt="AgriShare Full Logo"
          width={fullHeight}
          height={fullHeight}
          className="logo-theme-dark"
          style={{ width: "auto", height: fullHeight, objectFit: "contain" }}
        />
      </Link>
    );
  }

  // Horizontal lockup variant
  if (variant === "horizontal") {
    const hHeight = pxSize * 1.3;
    return (
      <Link
        href="/"
        className={`agrishare-brand-logo ${className}`}
        style={{
          display: "inline-block",
          textDecoration: "none",
          transition: "transform 0.2s ease",
        }}
      >
        <Image
          src="/logo-horizontal.png"
          alt="AgriShare Brand"
          width={hHeight * 3.4}
          height={hHeight}
          className="logo-theme-light"
          style={{ width: "auto", height: hHeight, objectFit: "contain" }}
        />
        <Image
          src="/logo-horizontal-dark.png"
          alt="AgriShare Brand"
          width={hHeight * 3.4}
          height={hHeight}
          className="logo-theme-dark"
          style={{ width: "auto", height: hHeight, objectFit: "contain" }}
        />
      </Link>
    );
  }

  // Default brand logo: Emblem icon + stylized text
  return (
    <Link
      href="/"
      className={`agrishare-brand-logo ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? "8px" : size === "xl" ? "14px" : "11px",
        textDecoration: "none",
        userSelect: "none",
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}
    >
      <LogoIcon size={pxSize} />
      {showText && (
        <span
          style={{
            fontFamily: "var(--font-family-heading)",
            fontWeight: "900",
            fontSize: fontSize,
            letterSpacing: "-0.035em",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "var(--primary)",
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            AGRI
          </span>
          <span
            style={{
              color: "var(--accent)",
              marginLeft: "2px",
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            SHARE
          </span>
        </span>
      )}
    </Link>
  );
}
