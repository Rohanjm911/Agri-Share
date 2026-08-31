"use client";

import React from "react";
import { Tractor, MapPin, CalendarCheck, Star, Sparkles, Shield, IndianRupee } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Tractor,
      title: "Wide Agricultural Machinery Fleet",
      description:
        "Access top Indian tractors, combine harvesters, rotavators, and super seeders from trusted brands including Mahindra, Swaraj, Sonalika, Preet, Shaktiman, and John Deere.",
      tag: "500+ Farm Machines",
    },
    {
      icon: MapPin,
      title: "Local District Proximity",
      description:
        "Locate farm machinery in your taluka, district, or state to minimize transit time and save diesel freight costs during peak sowing and harvesting windows.",
      tag: "Punjab to Maharashtra",
    },
    {
      icon: IndianRupee,
      title: "Transparent Daily Rates (₹)",
      description:
        "Transparent pricing with automated daily rate calculation and refundable security deposits. Zero hidden charges or broker commissions.",
      tag: "Zero Middlemen",
    },
    {
      icon: Star,
      title: "Verified Kisan Reviews",
      description:
        "Read honest feedback and star ratings left exclusively by farmers who rented and operated the machinery in actual field conditions.",
      tag: "100% Verified Farmers",
    },
  ];

  return (
    <section
      id="features"
      style={{
        paddingTop: "80px",
        paddingBottom: "80px",
        backgroundColor: "var(--bg-main)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 56px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
              fontSize: "0.82rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: "14px",
            }}
          >
            <Sparkles size={14} /> Core Platform Features
          </div>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)",
              fontWeight: "800",
              color: "var(--text-main)",
              marginBottom: "14px",
            }}
          >
            Designed for Indian Agriculture & Modern Kisans
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.02rem" }}>
            AgriShare connects tractor owners with neighboring farmers to boost mechanization and maximize crop yield.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="card card-interactive"
                style={{
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "var(--bg-card)",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "var(--primary)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.18rem",
                      fontWeight: "800",
                      color: "var(--text-main)",
                      marginBottom: "10px",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: "1.6" }}>
                    {f.description}
                  </p>
                </div>
                <div style={{ marginTop: "24px", paddingTop: "14px", borderTop: "1px solid var(--border)" }}>
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
