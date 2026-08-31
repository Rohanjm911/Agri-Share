"use client";

import React from "react";
import Link from "next/link";
import { Tractor, ShieldCheck, Heart, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-card)",
        borderTop: "1px solid var(--border)",
        paddingTop: "64px",
        paddingBottom: "32px",
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
          {/* Brand Col */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "1.3rem",
                fontWeight: "800",
                color: "var(--text-main)",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--primary)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Tractor size={20} />
              </div>
              <span>
                Agri<span style={{ color: "var(--primary)" }}>Share</span>
              </span>
            </Link>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "16px" }}>
              Empowering farmers with on-demand access to premium agricultural equipment and machinery rentals directly from local owners.
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
