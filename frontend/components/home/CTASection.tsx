"use client";

import React from "react";
import Link from "next/link";
import { Tractor, ArrowRight, ShieldCheck } from "lucide-react";

export function CTASection() {
  return (
    <section
      style={{
        paddingTop: "96px",
        paddingBottom: "96px",
        backgroundColor: "var(--bg-main)",
      }}
    >
      <div className="container">
        <div
          className="card"
          style={{
            padding: "clamp(36px, 6vw, 64px)",
            background: "linear-gradient(135deg, var(--primary) 0%, #295726 100%)",
            color: "#ffffff",
            borderRadius: "var(--radius-xl)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(63, 125, 58, 0.25)",
          }}
        >
          {/* Subtle background decoration */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <h2
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
                fontWeight: "900",
                lineHeight: "1.15",
                letterSpacing: "-0.03em",
                marginBottom: "20px",
              }}
            >
              Grow more. <br />
              Spend less.
            </h2>
            <p
              style={{
                fontSize: "1.15rem",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: "1.6",
                marginBottom: "36px",
              }}
            >
              Join hundreds of progressive farmers optimizing their machinery overhead.
              Whether renting or listing, AgriShare keeps farm power working for you.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "center",
                marginBottom: "28px",
              }}
            >
              <Link
                href="/register"
                className="btn btn-lg"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#295726",
                  fontWeight: "700",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Tractor size={18} />
                <span>Browse Inventory</span>
              </Link>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.88rem",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <ShieldCheck size={18} /> No upfront listing fees &bull; Secure damage deposits
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
