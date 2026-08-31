"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Tractor } from "lucide-react";

export function CTASection() {
  return (
    <section
      style={{
        paddingTop: "80px",
        paddingBottom: "80px",
        backgroundColor: "var(--bg-main)",
      }}
    >
      <div className="container">
        <div
          style={{
            padding: "clamp(36px, 6vw, 64px)",
            backgroundColor: "var(--primary)",
            color: "#ffffff",
            borderRadius: "var(--radius-lg)",
            textAlign: "center",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div style={{ maxWidth: "660px", margin: "0 auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "5px 14px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                fontSize: "0.85rem",
                fontWeight: "700",
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              <Sparkles size={16} /> Empowering Indian Kisans & Machinery Owners
            </div>

            <h2
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
                fontWeight: "900",
                lineHeight: "1.15",
                letterSpacing: "-0.03em",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              Maximize Crop Output. <br />
              Save on Capital Costs.
            </h2>

            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255, 255, 255, 0.92)",
                lineHeight: "1.65",
                marginBottom: "36px",
              }}
            >
              Join thousands of Indian farmers sharing and renting tractors, harvesters, rotavators, and implements.
              Monetize idle machinery or rent on-demand with zero middleman commissions.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                justifyContent: "center",
                marginBottom: "28px",
              }}
            >
              <Link
                href="/register"
                className="btn btn-lg"
                style={{
                  backgroundColor: "#ffffff",
                  color: "var(--primary)",
                  fontWeight: "800",
                  border: "none",
                }}
              >
                <span>Create Free Account</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/equipment"
                className="btn btn-lg"
                style={{
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  fontWeight: "700",
                }}
              >
                <Tractor size={18} />
                <span>Search Equipment</span>
              </Link>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: "0.85rem",
                fontWeight: "600",
              }}
            >
              <ShieldCheck size={16} /> Free signup &bull; Verified Indian Farmers &bull; Direct Coordination
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
