"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, ShieldCheck, Sparkles, Tractor } from "lucide-react";

export function CTASection() {
  const { isAuthenticated } = useAuth();

  // Hide the registration CTA banner completely when user is logged in
  if (isAuthenticated) {
    return null;
  }

  return (
    <section
      style={{
        paddingTop: "80px",
        paddingBottom: "80px",
        backgroundColor: "var(--bg-main)",
        transition: "background-color 0.15s ease",
      }}
    >
      <div className="container">
        <div
          style={{
            padding: "clamp(40px, 6vw, 68px)",
            backgroundColor: "var(--primary)",
            color: "#ffffff",
            borderRadius: "var(--radius-squircle-lg)",
            textAlign: "center",
            boxShadow: "0 24px 50px -12px rgba(5, 150, 105, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
            border: "1px solid var(--primary-hover)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ maxWidth: "660px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div
              className="apple-badge"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.25)",
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              <Sparkles size={16} style={{ color: "#fcd34d" }} />
              <span>Empowering Indian Kisans & Machinery Owners</span>
            </div>

            <h2
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                fontWeight: "900",
                lineHeight: "1.12",
                letterSpacing: "-0.04em",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              Maximize Crop Output. <br />
              Save on Machinery Costs.
            </h2>

            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: "1.65",
                letterSpacing: "-0.01em",
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
                className="btn btn-lg apple-pill-btn"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#062413",
                  fontWeight: "800",
                  border: "1px solid #ffffff",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                }}
              >
                <span>Create Free Account</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/equipment"
                className="btn btn-lg apple-pill-btn"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(12px)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
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
              <ShieldCheck size={16} style={{ color: "var(--accent)" }} />
              <span>Free registration &bull; 100% Verified Indian Farmers &bull; Direct Coordination</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
