"use client";

import React from "react";
import Link from "next/link";
import { Search, Calendar, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Discover Machinery",
      description:
        "Filter farm equipment by category, proximity, condition, and daily rate to find precisely what matches your seasonal field work.",
    },
    {
      step: "02",
      icon: Calendar,
      title: "Schedule Rental",
      description:
        "Select your rental duration. Our system calculates total days, daily cost, and security deposit automatically with no hidden charges.",
    },
    {
      step: "03",
      icon: CheckCircle2,
      title: "Deploy & Farm",
      description:
        "Submit the reservation. Once approved by the owner, coordinate equipment pickup or field delivery and begin operations.",
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        paddingTop: "96px",
        paddingBottom: "96px",
        backgroundColor: "var(--bg-subtle)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 64px" }}>
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
            <Sparkles size={14} /> Intuitive 3-Step Process
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
            How AgriShare Works
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            From search to field operations in three straightforward steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            position: "relative",
          }}
        >
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="card card-interactive"
                style={{
                  padding: "36px 28px",
                  position: "relative",
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
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--primary-gradient)",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 6px 14px var(--primary-glow)",
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <span
                      style={{
                        fontSize: "2.2rem",
                        fontWeight: "900",
                        color: "var(--primary)",
                        opacity: 0.25,
                        fontFamily: "var(--font-family-heading)",
                      }}
                    >
                      {s.step}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "800",
                      color: "var(--text-main)",
                      marginBottom: "12px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: "1.65" }}>
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action below steps */}
        <div style={{ marginTop: "56px", textAlign: "center" }}>
          <Link href="/equipment" className="btn btn-primary btn-lg">
            <span>Start Exploring Machinery</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
