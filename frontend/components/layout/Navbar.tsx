"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { RealtimeClock } from "@/components/ui/RealtimeClock";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NotificationDrawer } from "@/components/notifications/NotificationDrawer";
import { Logo } from "@/components/ui/Logo";
import {
  Menu,
  X,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  Wrench,
} from "lucide-react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isOwner = user?.role === "OWNER";

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Equipment", href: "/equipment" },
    { name: "How It Works", href: "/#how-it-works" },
  ];

  return (
    <header
      className="glass-nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        transition: "background-color 0.15s ease, border-color 0.15s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: "none",
            gap: "8px",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  fontSize: "0.88rem",
                  fontWeight: isActive ? "600" : "500",
                  color: isActive ? "var(--primary)" : "var(--text-muted)",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  backgroundColor: isActive ? "var(--primary-light)" : "transparent",
                  transition: "all 0.15s ease",
                  letterSpacing: "-0.01em",
                }}
              >
                {link.name}
              </Link>
            );
          })}

          {isAuthenticated && (
            <>
              <Link
                href="/bookings"
                style={{
                  fontSize: "0.88rem",
                  fontWeight: pathname === "/bookings" ? "600" : "500",
                  color: pathname === "/bookings" ? "var(--primary)" : "var(--text-muted)",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  backgroundColor: pathname === "/bookings" ? "var(--primary-light)" : "transparent",
                  transition: "all 0.15s ease",
                  letterSpacing: "-0.01em",
                }}
              >
                Bookings
              </Link>
              <Link
                href="/dashboard"
                style={{
                  fontSize: "0.88rem",
                  fontWeight: pathname === "/dashboard" ? "600" : "500",
                  color: pathname === "/dashboard" ? "var(--primary)" : "var(--text-muted)",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  backgroundColor: pathname === "/dashboard" ? "var(--primary-light)" : "transparent",
                  transition: "all 0.15s ease",
                  letterSpacing: "-0.01em",
                }}
              >
                Dashboard
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Right Actions */}
        <div
          style={{
            display: "none",
            alignItems: "center",
            gap: "10px",
          }}
          className="desktop-nav"
        >
          {/* Realtime Live Clock */}
          <RealtimeClock />

          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <NotificationDrawer />

              {isOwner && (
                <Link
                  href="/equipment/new"
                  className="btn btn-primary btn-sm"
                  style={{
                    height: "36px",
                    padding: "0 14px",
                    borderRadius: "9999px",
                    fontSize: "0.84rem",
                    fontWeight: "600",
                    letterSpacing: "-0.01em",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                  }}
                >
                  <PlusCircle size={15} />
                  <span>List Equipment</span>
                </Link>
              )}

              {/* User Avatar Menu */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "36px",
                    padding: "0 12px 0 5px",
                    borderRadius: "9999px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "0.75rem",
                    }}
                  >
                    {user?.first_name ? user.first_name[0].toUpperCase() : "U"}
                  </div>
                  <span style={{ fontSize: "0.84rem", fontWeight: "600", color: "var(--text-main)" }}>
                    {user?.first_name || user?.username}
                  </span>
                </button>

                {userDropdownOpen && (
                  <>
                    <div
                      onClick={() => setUserDropdownOpen(false)}
                      style={{ position: "fixed", inset: 0, zIndex: 90 }}
                    />
                    <div
                      className="card"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        right: 0,
                        width: "230px",
                        zIndex: 91,
                        padding: "8px",
                        backgroundColor: "var(--bg-surface)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-lg)",
                      }}
                    >
                      <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)", marginBottom: "4px" }}>
                        <div style={{ fontWeight: "800", fontSize: "0.92rem", color: "var(--text-main)" }}>
                          {user?.first_name} {user?.last_name}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {user?.email}
                        </div>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="btn btn-ghost btn-sm"
                        style={{ width: "100%", justifyContent: "flex-start" }}
                      >
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>

                      {isOwner && (
                        <Link
                          href="/my-equipment"
                          onClick={() => setUserDropdownOpen(false)}
                          className="btn btn-ghost btn-sm"
                          style={{ width: "100%", justifyContent: "flex-start" }}
                        >
                          <Wrench size={16} /> My Equipment
                        </Link>
                      )}

                      <Link
                        href="/bookings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="btn btn-ghost btn-sm"
                        style={{ width: "100%", justifyContent: "flex-start" }}
                      >
                        <CalendarDays size={16} /> My Bookings
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="btn btn-ghost btn-sm"
                        style={{ width: "100%", justifyContent: "flex-start" }}
                      >
                        <UserIcon size={16} /> Profile Settings
                      </Link>

                      <div style={{ borderTop: "1px solid var(--border)", margin: "4px 0" }} />

                      <button
                        onClick={handleLogout}
                        className="btn btn-ghost btn-sm"
                        style={{ width: "100%", justifyContent: "flex-start", color: "#dc2626" }}
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="mobile-toggle">
          <RealtimeClock />
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary btn-sm"
            style={{ padding: "8px" }}
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--bg-surface)",
            padding: "16px 20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "1rem",
                fontWeight: pathname === link.href ? "800" : "600",
                color: pathname === link.href ? "var(--primary)" : "var(--text-main)",
                padding: "8px 12px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: pathname === link.href ? "var(--primary-light)" : "transparent",
              }}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <div style={{ borderTop: "1px solid var(--border)", margin: "8px 0" }} />
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start" }}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link
                href="/bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start" }}
              >
                <CalendarDays size={18} /> Bookings
              </Link>
              {isOwner && (
                <>
                  <Link
                    href="/my-equipment"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-secondary"
                    style={{ justifyContent: "flex-start" }}
                  >
                    <Wrench size={18} /> My Equipment
                  </Link>
                  <Link
                    href="/equipment/new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary"
                    style={{ justifyContent: "flex-start" }}
                  >
                    <PlusCircle size={18} /> List Equipment
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="btn btn-danger"
                style={{ marginTop: "8px" }}
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ width: "100%" }}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @media (min-width: 840px) {
          :global(.desktop-nav) {
            display: flex !important;
          }
          :global(.mobile-toggle) {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
