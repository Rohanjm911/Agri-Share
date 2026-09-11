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
            padding: "clamp(36px, 6vw, 64px)",
            backgroundColor: "var(--primary)",
            color: "#ffffff",
            borderRadius: "var(--radius-lg)",
            textAlign: "center",
            boxShadow: "var(--shadow-lg)",
            border: "1px solid var(--primary-hover)",
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
              <Sparkles size={16} style={{ color: "var(--accent)" }} />
              <span>Empowering Indian Kisans & Machinery Owners</span>
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
              Save on Capital Equipment Costs.
            </h2>

            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255, 255, 255, 0.9)",
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
                  color: "#0f3d24",
                  fontWeight: "800",
                  border: "1px solid #ffffff",
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
              <ShieldCheck size={16} style={{ color: "var(--accent)" }} />
              <span>Free registration &bull; 100% Verified Indian Farmers &bull; Direct Coordination</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
