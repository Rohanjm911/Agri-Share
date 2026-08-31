"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  Tractor,
  Mail,
  Phone,
  MapPin,
  Heart,
  ShieldCheck,
  Award,
  Clock,
} from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "64px 0 32px",
        marginTop: "auto",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Col 1: Brand & Bio */}
          <div style={{ maxWidth: "340px" }}>
            <div style={{ marginBottom: "16px" }}>
              <Logo size="md" />
            </div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.92rem",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              AgriShare is India&apos;s leading agricultural equipment sharing and rental marketplace.
              Empowering farmers with scalable farm machinery on-demand.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary)", fontSize: "0.85rem", fontWeight: "600" }}>
              <ShieldCheck size={16} /> Verified Owners & Machinery
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "16px", color: "var(--text-main)" }}>
              Marketplace
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/equipment" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Browse All Equipment
                </Link>
              </li>
              <li>
                <Link href="/equipment?category_slug=tractors" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Tractors & Loaders
                </Link>
              </li>
              <li>
                <Link href="/equipment?category_slug=harvesters-combines" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Harvesters & Combines
                </Link>
              </li>
              <li>
                <Link href="/equipment/new" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  List Your Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* How it Works */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "16px", color: "var(--text-main)" }}>
              Platform
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/#how-it-works" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Farmer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/bookings" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Rental Management
                </Link>
              </li>
              <li>
                <a href="http://127.0.0.1:8000/api/docs/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  API Documentation (Swagger)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "16px", color: "var(--text-main)" }}>
              Contact & Support
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Mail size={16} style={{ color: "var(--primary)" }} />
                <span>support@agrishare.com</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={16} style={{ color: "var(--primary)" }} />
                <span>+1 (800) 555-AGRI</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={16} style={{ color: "var(--primary)" }} />
                <span>Des Moines, Iowa, USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} AgriShare Inc. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            Built with modern agricultural tech <Heart size={14} style={{ color: "var(--primary)" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
