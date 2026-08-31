"use client";

import React from "react";
import Link from "next/link";
import { Search, Calendar, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Search Nearby Machinery",
      description:
        "Select category, state/district, brand, condition, and daily budget to discover farm equipment in your farming cluster.",
    },
    {
      step: "02",
      icon: Calendar,
      title: "Pick Rental Dates",
      description:
        "Choose start and end dates. Total days, rental fees, and security deposit are automatically calculated upfront in Indian Rupees (₹).",
    },
    {
      step: "03",
      icon: CheckCircle2,
      title: "Confirm & Start Fieldwork",
      description:
        "The equipment owner reviews and approves your request. Coordinate field pickup or implement delivery to begin your operations.",
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        paddingTop: "80px",
        paddingBottom: "80px",
        backgroundColor: "var(--bg-surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 56px" }}>
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
            <Sparkles size={14} /> Simple 3-Step Process
          </div>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)",
              fontWeight: "800",
              color: "var(--text-main)",
              marginBottom: "14px",
            }}
          >
            How AgriShare Works
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.02rem" }}>
            From search to field operations in three straightforward steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="card card-interactive"
                style={{
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "var(--bg-card)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
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
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <span
                      style={{
                        fontSize: "2rem",
                        fontWeight: "900",
                        color: "var(--primary)",
                        opacity: 0.25,
                      }}
                    >
                      {s.step}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "800",
                      color: "var(--text-main)",
                      marginBottom: "10px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: "1.6" }}>
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA below steps */}
        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <Link href="/equipment" className="btn btn-primary btn-lg">
            <span>Browse All Machinery</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
