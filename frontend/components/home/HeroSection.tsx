"use client";

import React from "react";
import Link from "next/link";
import {
  Tractor,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Search,
  Sparkles,
} from "lucide-react";

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "64px",
        paddingBottom: "80px",
        background: "linear-gradient(180deg, var(--primary-light) 0%, var(--bg-main) 100%)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Background glow effects */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Hero Left Content */}
          <div style={{ maxWidth: "680px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "var(--primary)",
                marginBottom: "24px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <Sparkles size={16} />
              <span>Modern Agricultural Machinery Sharing</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                fontWeight: "900",
                lineHeight: "1.12",
                letterSpacing: "-0.03em",
                color: "var(--text-main)",
                marginBottom: "20px",
              }}
            >
              Agricultural Equipment <br />
              <span
                style={{
                  background: "linear-gradient(135deg, var(--primary) 0%, #2f692b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Made Accessible.
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.15rem",
                lineHeight: "1.65",
                color: "var(--text-muted)",
                marginBottom: "32px",
              }}
            >
              Rent the equipment you need, when you need it. AgriShare connects farmers with
              reliable agricultural equipment owners in their area.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "48px",
              }}
            >
              <Link href="/equipment" className="btn btn-primary btn-lg">
                <Search size={18} />
                <span>Browse Equipment</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/equipment/new" className="btn btn-secondary btn-lg">
                <Tractor size={18} />
                <span>List Your Equipment</span>
              </Link>
            </div>

            {/* Verified Stats Bar */}
            <div
              className="glass-panel"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                padding: "20px 24px",
                gap: "16px",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "800",
                    color: "var(--primary)",
                    lineHeight: "1.2",
                  }}
                >
                  100+
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "500" }}>
                  Equipment Items
                </div>
              </div>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "16px" }}>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "800",
                    color: "var(--primary)",
                    lineHeight: "1.2",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  50+
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "500" }}>
                  Active Farmers
                </div>
              </div>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "16px" }}>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "800",
                    color: "var(--accent-gold)",
                    lineHeight: "1.2",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  4.8 <Star size={18} fill="var(--accent-gold)" />
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "500" }}>
                  Average Rating
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div
            className="card"
            style={{
              padding: "32px",
              background: "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-xl)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              position: "relative",
            }}
          >
            {/* Visual Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--primary)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tractor size={26} />
                </div>
                <div>
                  <div style={{ fontWeight: "800", fontSize: "1.1rem" }}>Heavy Machinery Hub</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Verified Local Listings</div>
                </div>
              </div>
              <span className="badge badge-success">Instant Booking</span>
            </div>

            {/* Interactive Preview Item */}
            <div
              style={{
                backgroundColor: "var(--bg-card)",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontWeight: "700", fontSize: "0.95rem" }}>John Deere 8R 370 HP</span>
                <span style={{ color: "var(--primary)", fontWeight: "800" }}>$450 / day</span>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span className="badge badge-info">Cedar Rapids, IA</span>
                <span className="badge badge-success">AutoTrac GPS</span>
                <span className="badge badge-muted">Year 2022</span>
              </div>
            </div>

            {/* Trust badge item */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(63, 125, 58, 0.08)",
                border: "1px dashed var(--primary)",
              }}
            >
              <ShieldCheck size={24} style={{ color: "var(--primary)", flexShrink: 0 }} />
              <div style={{ fontSize: "0.85rem", color: "var(--text-main)" }}>
                <strong>Zero middleman markup:</strong> Secure deposits, direct owner coordination, and vetted farm equipment.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 992px) {
          :global(.hero-grid) {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
