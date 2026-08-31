"use client";

import React from "react";
import { Tractor, MapPin, CalendarCheck, Star, Sparkles, Shield, Cpu, Clock } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Tractor,
      title: "Wide Machinery Fleet",
      description:
        "Access high-horsepower row crop tractors, combine harvesters, air seeders, boom sprayers, and tillage implements from top global and local brands.",
      tag: "100+ Listings",
      gradient: "var(--primary-gradient)",
    },
    {
      icon: MapPin,
      title: "Hyper-Local Proximity",
      description:
        "Find machines within your district or state to minimize transit haulage, cut freight costs, and deploy immediately when optimal weather windows open.",
      tag: "Geolocated Search",
      gradient: "linear-gradient(135deg, #0ea5e9, #0284c7)",
    },
    {
      icon: CalendarCheck,
      title: "Frictionless Booking",
      description:
        "Choose rental dates, view automated server-calculated totals and transparent security deposits with zero hidden fees.",
      tag: "Instant Contracts",
      gradient: "var(--accent-gold-gradient)",
    },
    {
      icon: Star,
      title: "Verified Farmer Reviews",
      description:
        "Read honest ratings and performance reviews left exclusively by growers who completed actual rental contracts on the platform.",
      tag: "100% Verified",
      gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    },
  ];

  return (
    <section
      id="features"
      style={{
        paddingTop: "96px",
        paddingBottom: "96px",
        backgroundColor: "var(--bg-main)",
        position: "relative",
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
              padding: "4px 14px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
              fontSize: "0.82rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "16px",
            }}
          >
            <Sparkles size={14} /> Core Platform Advantages
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: "900",
              letterSpacing: "-0.03em",
              color: "var(--text-main)",
              marginBottom: "16px",
            }}
          >
            Built for Modern Agricultural Productivity
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.65 }}>
            AgriShare unites cutting-edge technology with community farming networks to maximize machine efficiency and reduce capital expenditure.
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
                className="card card-interactive"
                style={{
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "var(--radius-md)",
                      background: f.gradient,
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                    }}
                  >
                    <Icon size={28} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "800",
                      color: "var(--text-main)",
                      marginBottom: "12px",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: "1.65" }}>
                    {f.description}
                  </p>
                </div>
                <div style={{ marginTop: "28px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
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
