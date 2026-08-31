"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NotificationDrawer } from "@/components/notifications/NotificationDrawer";
import {
  Tractor,
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
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "var(--bg-glass)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        transition: "all 0.2s ease",
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
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "1.35rem",
            fontWeight: "800",
            color: "var(--text-main)",
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--primary)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px var(--primary-glow)",
            }}
          >
            <Tractor size={22} />
          </div>
          <span>
            Agri<span style={{ color: "var(--primary)" }}>Share</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: "none",
            gap: "28px",
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
                  fontSize: "0.95rem",
                  fontWeight: isActive ? "700" : "500",
                  color: isActive ? "var(--primary)" : "var(--text-muted)",
                  transition: "color 0.15s ease",
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
                  fontSize: "0.95rem",
                  fontWeight: pathname === "/bookings" ? "700" : "500",
                  color: pathname === "/bookings" ? "var(--primary)" : "var(--text-muted)",
                }}
              >
                Bookings
              </Link>
              <Link
                href="/dashboard"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: pathname === "/dashboard" ? "700" : "500",
                  color: pathname === "/dashboard" ? "var(--primary)" : "var(--text-muted)",
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
            gap: "12px",
          }}
          className="desktop-nav"
        >
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <NotificationDrawer />

              <Link href="/equipment/new" className="btn btn-primary btn-sm">
                <PlusCircle size={16} />
                <span>List Equipment</span>
              </Link>

              {/* User Avatar Menu */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary-light)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "0.8rem",
                    }}
                  >
                    {user?.first_name ? user.first_name[0].toUpperCase() : "U"}
                  </div>
                  <span style={{ fontSize: "0.88rem", fontWeight: "600" }}>
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
                        width: "220px",
                        zIndex: 91,
                        padding: "8px",
                        boxShadow: "var(--shadow-xl)",
                      }}
                    >
                      <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)", marginBottom: "4px" }}>
                        <div style={{ fontWeight: "700", fontSize: "0.9rem" }}>{user?.first_name} {user?.last_name}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.email}</div>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="btn btn-ghost btn-sm"
                        style={{ width: "100%", justifyContent: "flex-start" }}
                      >
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>

                      <Link
                        href="/my-equipment"
                        onClick={() => setUserDropdownOpen(false)}
                        className="btn btn-ghost btn-sm"
                        style={{ width: "100%", justifyContent: "flex-start" }}
                      >
                        <Wrench size={16} /> My Equipment
                      </Link>

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
                        style={{ width: "100%", justifyContent: "flex-start", color: "#ef4444" }}
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

        {/* Mobile menu trigger */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="mobile-toggle">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary btn-sm"
            style={{ padding: "8px" }}
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--bg-surface)",
            padding: "16px 20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "1rem",
                fontWeight: pathname === link.href ? "700" : "500",
                color: pathname === link.href ? "var(--primary)" : "var(--text-main)",
                padding: "8px 0",
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
              >
                <PlusCircle size={18} /> List Equipment
              </Link>
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
