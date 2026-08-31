"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Tractor } from "lucide-react";

export function CTASection() {
  return (
    <section
      style={{
        paddingTop: "96px",
        paddingBottom: "96px",
        backgroundColor: "var(--bg-main)",
        position: "relative",
      }}
    >
      <div className="container">
        <div
          style={{
            padding: "clamp(40px, 7vw, 72px)",
            background: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 75%, #059669 100%)",
            color: "#ffffff",
            borderRadius: "var(--radius-xl)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 24px 48px -12px rgba(4, 120, 87, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          {/* Subtle background ambient light */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              backgroundColor: "rgba(52, 211, 153, 0.25)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-100px",
              left: "-100px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                fontSize: "0.85rem",
                fontWeight: "700",
                color: "#ffffff",
                marginBottom: "24px",
              }}
            >
              <Sparkles size={16} /> Maximize Machine ROI & Operational Power
            </div>

            <h2
              style={{
                fontSize: "clamp(2.4rem, 4.8vw, 3.6rem)",
                fontWeight: "900",
                lineHeight: "1.12",
                letterSpacing: "-0.035em",
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              Grow More. <br />
              Invest Smarter.
            </h2>

            <p
              style={{
                fontSize: "1.15rem",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: "1.65",
                marginBottom: "40px",
              }}
            >
              Join thousands of progressive growers optimizing their farm capital.
              Whether renting machinery on-demand or monetizing idle equipment, AgriShare delivers peak performance.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "center",
                marginBottom: "32px",
              }}
            >
              <Link
                href="/register"
                className="btn btn-lg"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#064e3b",
                  fontWeight: "800",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                  border: "none",
                }}
              >
                <span>Get Started Free</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/equipment"
                className="btn btn-lg"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(8px)",
                  fontWeight: "700",
                }}
              >
                <Tractor size={18} />
                <span>Browse Machinery</span>
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
              <ShieldCheck size={16} /> Free registration &bull; Verified farmers &bull; Direct coordination
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
