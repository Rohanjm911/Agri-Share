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
  CheckCircle2,
  MapPin,
  Zap,
} from "lucide-react";

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "72px",
        paddingBottom: "96px",
        background: `
          radial-gradient(circle at 85% 20%, var(--primary-light) 0%, transparent 40%),
          radial-gradient(circle at 15% 70%, var(--accent-gold-light) 0%, transparent 35%),
          linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-main) 100%)
        `,
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Background ambient light */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "56px",
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
                padding: "6px 16px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                fontSize: "0.85rem",
                fontWeight: "700",
                color: "var(--primary)",
                marginBottom: "24px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <Sparkles size={16} />
              <span>Next-Gen Agricultural Machinery Marketplace</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                fontWeight: "900",
                lineHeight: "1.1",
                letterSpacing: "-0.035em",
                color: "var(--text-main)",
                marginBottom: "20px",
              }}
            >
              Agricultural Machinery <br />
              <span
                style={{
                  background: "var(--primary-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                On-Demand.
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.15rem",
                lineHeight: "1.7",
                color: "var(--text-muted)",
                marginBottom: "36px",
              }}
            >
              Rent high-performance tractors, combine harvesters, precision seeders, and sprayers
              directly from verified equipment owners in your region.
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
                <span>Explore Catalog</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/equipment/new" className="btn btn-secondary btn-lg">
                <Tractor size={18} />
                <span>List Your Machinery</span>
              </Link>
            </div>

            {/* Verified Stats Bar */}
            <div
              className="card-glass"
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
                    fontSize: "1.75rem",
                    fontWeight: "900",
                    color: "var(--primary)",
                    lineHeight: "1.2",
                  }}
                >
                  100+
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>
                  Verified Machines
                </div>
              </div>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "16px" }}>
                <div
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "900",
                    color: "var(--accent-gold)",
                    lineHeight: "1.2",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  4.9 <Star size={18} fill="var(--accent-gold)" />
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>
                  Average Rating
                </div>
              </div>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "16px" }}>
                <div
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "900",
                    color: "var(--primary)",
                    lineHeight: "1.2",
                  }}
                >
                  100%
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>
                  Secure Escrow
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card */}
          <div style={{ position: "relative" }}>
            {/* Ambient Backlight */}
            <div
              style={{
                position: "absolute",
                inset: "-10px",
                background: "var(--primary-gradient)",
                opacity: 0.15,
                borderRadius: "var(--radius-xl)",
                filter: "blur(24px)",
                zIndex: 0,
              }}
            />

            <div
              className="card-glass"
              style={{
                position: "relative",
                zIndex: 1,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--primary-gradient)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 10px var(--primary-glow)",
                    }}
                  >
                    <Zap size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "800", fontSize: "0.95rem" }}>Live Machine Network</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Instant Availability</div>
                  </div>
                </div>
                <span className="badge badge-success">Available Today</span>
              </div>

              {/* Real-Life Equipment Photo Preview */}
              <div
                style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  position: "relative",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <div style={{ height: "200px", position: "relative" }}>
                  <img
                    src="/images/equipment/tractor_john_deere.jpg"
                    alt="John Deere 8R 370 Row Crop Tractor"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      fontSize: "0.72rem",
                      fontWeight: "800",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "rgba(5, 150, 105, 0.92)",
                      color: "#ffffff",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    POPULAR RENTAL
                  </span>
                </div>

                <div style={{ padding: "16px", backgroundColor: "var(--bg-card)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h3 style={{ fontWeight: "800", fontSize: "1.1rem" }}>John Deere 8R 370 HP</h3>
                    <div style={{ color: "var(--primary)", fontWeight: "900", fontSize: "1.15rem" }}>
                      ₹4,500 <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "600" }}>/day</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                    <span className="badge badge-info"><MapPin size={11} /> Ludhiana, Punjab</span>
                    <span className="badge badge-success">GPS AutoTrac</span>
                    <span className="badge badge-muted">Year 2022</span>
                  </div>
                  <Link href="/equipment/1" className="btn btn-primary" style={{ width: "100%" }}>
                    Rent Machine Now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Trust Callout */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--primary-light)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  fontSize: "0.82rem",
                  color: "var(--text-main)",
                }}
              >
                <ShieldCheck size={20} style={{ color: "var(--primary)", flexShrink: 0 }} />
                <span><strong>Zero middleman commissions:</strong> Direct owner coordination & transparent deposit escrow.</span>
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
