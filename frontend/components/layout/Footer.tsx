"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  ShieldCheck,
} from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-surface)",
        borderTop: "1px solid var(--border)",
        padding: "64px 0 32px",
        marginTop: "auto",
        transition: "background-color 0.15s ease, border-color 0.15s ease",
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
              Connecting tractor owners with neighboring kisans with zero middlemen.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--primary)",
                backgroundColor: "var(--primary-light)",
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                fontSize: "0.82rem",
                fontWeight: "700",
              }}
            >
              <ShieldCheck size={16} /> Verified Indian Farmers & Machinery
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div>
            <h4
              style={{
                fontSize: "0.95rem",
                fontWeight: "800",
                marginBottom: "16px",
                color: "var(--text-main)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Marketplace
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/equipment" style={{ color: "var(--text-muted)", fontSize: "0.9rem", transition: "color 0.15s" }}>
                  Browse All Machinery
                </Link>
              </li>
              <li>
                <Link href="/equipment?category_slug=tractors" style={{ color: "var(--text-muted)", fontSize: "0.9rem", transition: "color 0.15s" }}>
                  Tractors & Loaders (4WD/2WD)
                </Link>
              </li>
              <li>
                <Link href="/equipment?category_slug=harvesters-combines" style={{ color: "var(--text-muted)", fontSize: "0.9rem", transition: "color 0.15s" }}>
                  Combine Harvesters
                </Link>
              </li>
              <li>
                <Link href="/equipment/new" style={{ color: "var(--text-muted)", fontSize: "0.9rem", transition: "color 0.15s" }}>
                  List Your Tractor or Implements
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform */}
          <div>
            <h4
              style={{
                fontSize: "0.95rem",
                fontWeight: "800",
                marginBottom: "16px",
                color: "var(--text-main)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Platform
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/#how-it-works" style={{ color: "var(--text-muted)", fontSize: "0.9rem", transition: "color 0.15s" }}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard" style={{ color: "var(--text-muted)", fontSize: "0.9rem", transition: "color 0.15s" }}>
                  Kisan Dashboard
                </Link>
              </li>
              <li>
                <Link href="/bookings" style={{ color: "var(--text-muted)", fontSize: "0.9rem", transition: "color 0.15s" }}>
                  Rental Management
                </Link>
              </li>
              <li>
                <a
                  href="http://127.0.0.1:8000/api/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-muted)", fontSize: "0.9rem", transition: "color 0.15s" }}
                >
                  REST API Docs (Swagger)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div>
            <h4
              style={{
                fontSize: "0.95rem",
                fontWeight: "800",
                marginBottom: "16px",
                color: "var(--text-main)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Contact & Support
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Mail size={16} style={{ color: "var(--primary)" }} />
                <span>support@agrishare.com</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={16} style={{ color: "var(--primary)" }} />
                <span>+91 1800 180 1551 (Toll-Free)</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={16} style={{ color: "var(--primary)" }} />
                <span>Ludhiana, Punjab & New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
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
            &copy; {new Date().getFullYear()} AgriShare India. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>Built for Modern Indian Agriculture</span>
            <Heart size={14} style={{ color: "var(--accent)" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
