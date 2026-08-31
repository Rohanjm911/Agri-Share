"use client";

import React from "react";
import Link from "next/link";
import {
  Tractor,
  ArrowRight,
  ShieldCheck,
  Star,
  Search,
  Sparkles,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        paddingTop: "64px",
        paddingBottom: "80px",
        backgroundColor: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container">
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
          <div style={{ maxWidth: "660px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--primary-light)",
                border: "1px solid var(--border)",
                fontSize: "0.85rem",
                fontWeight: "700",
                color: "var(--primary)",
                marginBottom: "20px",
              }}
            >
              <Sparkles size={15} />
              <span>India&apos;s Agricultural Equipment Sharing Network</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: "900",
                lineHeight: "1.15",
                letterSpacing: "-0.03em",
                color: "var(--text-main)",
                marginBottom: "18px",
              }}
            >
              Agricultural Machinery <br />
              <span style={{ color: "var(--primary)" }}>
                Directly from Local Farmers.
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.65",
                color: "var(--text-muted)",
                marginBottom: "32px",
              }}
            >
              Rent tractors, combine harvesters, rotavators, and super seeders from verified farm owners
              across Punjab, Haryana, Madhya Pradesh, Gujarat, Maharashtra, and beyond.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                marginBottom: "40px",
              }}
            >
              <Link href="/equipment" className="btn btn-primary btn-lg">
                <Search size={18} />
                <span>Search Equipment</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/equipment/new" className="btn btn-secondary btn-lg">
                <Tractor size={18} />
                <span>List Your Tractor & Implements</span>
              </Link>
            </div>

            {/* Solid Verified Stats Bar */}
            <div
              className="card"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                padding: "18px 22px",
                gap: "16px",
                backgroundColor: "var(--bg-main)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "900",
                    color: "var(--primary)",
                    lineHeight: "1.2",
                  }}
                >
                  500+
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>
                  Verified Machines
                </div>
              </div>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "16px" }}>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "900",
                    color: "var(--accent-gold)",
                    lineHeight: "1.2",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  4.9 <Star size={16} fill="var(--accent-gold)" />
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>
                  Farmer Rating
                </div>
              </div>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "16px" }}>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "900",
                    color: "var(--primary)",
                    lineHeight: "1.2",
                  }}
                >
                  ₹0
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>
                  Platform Brokerage
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card - Indian Tractor & Equipment */}
          <div>
            <div
              className="card"
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                backgroundColor: "var(--bg-card)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "var(--primary)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Tractor size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "800", fontSize: "0.95rem" }}>Featured Machinery</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Available for Booking</div>
                  </div>
                </div>
                <span className="badge badge-success">Ready in Field</span>
              </div>

              {/* Real Indian Mahindra Tractor Photo */}
              <div
                style={{
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ height: "220px", position: "relative" }}>
                  <img
                    src="/images/equipment/mahindra_tractor.jpg"
                    alt="Mahindra Yuvo Tech+ 585 DI Tractor"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      fontSize: "0.72rem",
                      fontWeight: "800",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--primary)",
                      color: "#ffffff",
                    }}
                  >
                    POPULAR IN PUNJAB
                  </span>
                </div>

                <div style={{ padding: "16px", backgroundColor: "var(--bg-main)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <h3 style={{ fontWeight: "800", fontSize: "1.1rem" }}>Mahindra Yuvo 585 DI (49 HP)</h3>
                    <div style={{ color: "var(--primary)", fontWeight: "900", fontSize: "1.15rem" }}>
                      ₹2,800 <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "600" }}>/day</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                    <span className="badge badge-info"><MapPin size={11} /> Ludhiana, Punjab</span>
                    <span className="badge badge-success">4WD Power</span>
                    <span className="badge badge-muted">Year 2023</span>
                  </div>
                  <Link href="/equipment/1" className="btn btn-primary" style={{ width: "100%" }}>
                    <span>Book This Tractor</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Direct Connection Note */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--primary-light)",
                  border: "1px solid var(--border)",
                  fontSize: "0.82rem",
                  color: "var(--text-main)",
                }}
              >
                <ShieldCheck size={18} style={{ color: "var(--primary)", flexShrink: 0 }} />
                <span>Direct farmer-to-farmer rental with zero middleman commissions.</span>
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
