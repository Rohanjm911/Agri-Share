"use client";

import React from "react";
import { Tractor, MapPin, Star, Sparkles, IndianRupee, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export function FeaturesSection() {
  const bentoItems = [
    {
      icon: Tractor,
      badge: "Fleet Scale",
      title: "Wide Agricultural Fleet",
      subtitle: "500+ Verified Machines",
      description:
        "High-performance tractors, multi-crop combine harvesters, rotavators, and laser levelers from Mahindra, Swaraj, John Deere, and Shaktiman.",
      colSpan: "2",
      accent: "var(--primary)",
      highlight: "Direct Owner Fleet",
    },
    {
      icon: MapPin,
      badge: "Hyper-Local",
      title: "District & Taluka Proximity",
      subtitle: "Near Your Farmland",
      description:
        "Find equipment in your neighboring villages. Minimize diesel transport expenses and harvest on exact seasonal schedules.",
      colSpan: "1",
      accent: "var(--accent)",
      highlight: "Save Transport Fuel",
    },
    {
      icon: IndianRupee,
      badge: "Fair Price",
      title: "Transparent Daily Rates",
      subtitle: "0% Brokerage Markup",
      description:
        "Clear pricing with refundable deposits. Rent by day or acre with zero hidden fees.",
      colSpan: "1",
      accent: "var(--primary)",
      highlight: "Pure Peer-to-Peer",
    },
    {
      icon: Star,
      badge: "Trusted",
      title: "Verified Kisan Reviews",
      subtitle: "Real Field Experience",
      description:
        "Ratings left exclusively by neighboring farmers who have operated the machinery in actual Indian soils and crops.",
      colSpan: "2",
      accent: "var(--accent)",
      highlight: "100% Genuine Feedback",
    },
  ];

  return (
    <section
      id="features"
      className="apple-spotlight"
      style={{
        paddingTop: "96px",
        paddingBottom: "96px",
        backgroundColor: "var(--bg-main)",
        position: "relative",
        transition: "background-color 0.15s ease",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 64px" }}>
          <h2
            style={{
              fontSize: "clamp(2.1rem, 4vw, 3rem)",
              fontWeight: "900",
              letterSpacing: "-0.04em",
              lineHeight: "1.12",
              color: "var(--text-main)",
              marginBottom: "16px",
            }}
          >
            Everything your farm needs. <br />
            <span className="apple-gradient-emerald">
              Engineered with zero friction.
            </span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1.08rem",
              lineHeight: "1.6",
              letterSpacing: "-0.01em",
            }}
          >
            AgriShare connects machinery owners with farmers across India through a modern, secure, and intuitive digital network.
          </p>
        </div>

        {/* Apple Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="apple-bento-grid"
        >
          {bentoItems.map((item, idx) => {
            const Icon = item.icon;
            const isWide = item.colSpan === "2";

            return (
              <div
                key={idx}
                className="apple-card"
                style={{
                  gridColumn: isWide ? "span 2" : "span 1",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "var(--radius-squircle)",
                  minHeight: "260px",
                }}
              >
                <div>
                  {/* Top Bar: Icon Squircle + Tag */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "16px",
                        backgroundColor: item.accent === "var(--primary)" ? "rgba(16, 185, 129, 0.14)" : "rgba(251, 191, 36, 0.14)",
                        color: item.accent,
                        border: `1px solid ${item.accent === "var(--primary)" ? "rgba(16, 185, 129, 0.28)" : "rgba(251, 191, 36, 0.28)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <span
                      className="apple-badge"
                      style={{
                        fontSize: "0.74rem",
                        padding: "4px 12px",
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    style={{
                      fontSize: isWide ? "1.45rem" : "1.25rem",
                      fontWeight: "800",
                      letterSpacing: "-0.03em",
                      color: "var(--text-main)",
                      marginBottom: "6px",
                      lineHeight: "1.2",
                    }}
                  >
                    {item.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.86rem",
                      fontWeight: "700",
                      color: item.accent,
                      marginBottom: "12px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.95rem",
                      lineHeight: "1.65",
                      letterSpacing: "-0.01em",
                      maxWidth: isWide ? "560px" : "100%",
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom Highlight Pill */}
                <div
                  style={{
                    marginTop: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "16px",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: "700",
                      color: "var(--text-main)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Zap size={14} style={{ color: item.accent }} />
                    {item.highlight}
                  </span>

                  <ArrowUpRight
                    size={16}
                    style={{
                      color: "var(--text-muted)",
                      transition: "transform 0.2s ease",
                    }}
                    className="card-arrow"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.apple-bento-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.apple-bento-grid > div) {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
