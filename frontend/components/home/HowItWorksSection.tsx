"use client";

import React from "react";
import Link from "next/link";
import { Search, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Find Equipment",
      description:
        "Filter machinery by category, location, horsepower, condition, and daily rate to find exactly what fits your crop season requirements.",
    },
    {
      step: "02",
      icon: Calendar,
      title: "Choose Your Dates",
      description:
        "Select your rental duration. Our system calculates total days, daily cost, and security deposit automatically with no hidden fees.",
    },
    {
      step: "03",
      icon: CheckCircle2,
      title: "Book & Farm",
      description:
        "Submit the booking request. Once the owner approves, coordinate equipment pickup or field delivery and get straight to farming.",
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
            Streamlined Process
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
            How AgriShare Works
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            From discovery to field operation in three easy steps.
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
                className="card card-hover"
                style={{
                  padding: "36px 28px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
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
                      <Icon size={24} />
                    </div>
                    <span
                      style={{
                        fontSize: "2rem",
                        fontWeight: "900",
                        color: "var(--primary)",
                        opacity: 0.35,
                      }}
                    >
                      {s.step}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "var(--text-main)",
                      marginBottom: "12px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link href="/equipment" className="btn btn-primary btn-lg">
            <span>Explore Equipment Catalog</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
