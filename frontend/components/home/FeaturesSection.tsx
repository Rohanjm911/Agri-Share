"use client";

import React from "react";
import { Tractor, MapPin, CalendarCheck, Star, Sparkles } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Tractor,
      title: "Wide Equipment Selection",
      description:
        "Access high-horsepower tractors, combine harvesters, planters, sprayers, and tillage implements from top brands like John Deere, Case IH, Kinze, and Kubota.",
      tag: "100+ Machinery",
    },
    {
      icon: MapPin,
      title: "Find Equipment Nearby",
      description:
        "Locate machinery in your county or state to minimize hauling times, reduce freight costs, and start field work immediately when weather windows open.",
      tag: "Localized Search",
    },
    {
      icon: CalendarCheck,
      title: "Simple Booking",
      description:
        "Select your rental dates, view upfront price calculations with transparent security deposits, and submit booking requests with instant status updates.",
      tag: "Direct Coordination",
    },
    {
      icon: Star,
      title: "Trusted Reviews",
      description:
        "Read verified feedback and star ratings left exclusively by farmers who completed actual rental contracts. Rent with total confidence.",
      tag: "100% Verified",
    },
  ];

  return (
    <section
      id="features"
      style={{
        paddingTop: "96px",
        paddingBottom: "96px",
        backgroundColor: "var(--bg-main)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 64px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
              fontSize: "0.85rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "12px",
            }}
          >
            <Sparkles size={14} /> Core Capabilities
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: "800",
              letterSpacing: "-0.02em",
              color: "var(--text-main)",
              marginBottom: "16px",
            }}
          >
            Built for modern farm operations.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            AgriShare combines modern marketplace technology with the trusted neighbor-to-neighbor farming ethos.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "28px",
          }}
        >
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="card card-hover"
                style={{
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: "var(--primary-light)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Icon size={26} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      color: "var(--text-main)",
                      marginBottom: "12px",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: "1.6" }}>
                    {f.description}
                  </p>
                </div>
                <div style={{ marginTop: "24px" }}>
                  <span className="badge badge-success">{f.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
