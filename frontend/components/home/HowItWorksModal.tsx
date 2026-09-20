"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Calendar,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tractor,
  DollarSign,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

export function HowItWorksModal() {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setIsOpen(false);
      return;
    }

    // Check if first-time popup has already been shown to this user
    const storageKey = `agrishare_how_it_works_shown_${user.id}`;
    const alreadyShown = localStorage.getItem(storageKey);

    if (!alreadyShown) {
      // Show modal on first login after slight delay for smooth page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user]);

  const handleClose = () => {
    if (user) {
      localStorage.setItem(`agrishare_how_it_works_shown_${user.id}`, "true");
    }
    setIsOpen(false);
  };

  if (!isOpen || !user) return null;

  const isOwner = user.role === "OWNER";

  // Owner-specific guide steps
  const ownerSteps = [
    {
      step: "01",
      icon: Tractor,
      title: "List Your Tractors & Machinery",
      desc: "Add your tractors, harvesters, rotavators, or implements with photos, daily rental rates (₹), and refundable security deposit.",
    },
    {
      step: "02",
      icon: ClipboardList,
      title: "Review Incoming Rental Requests",
      desc: "Farmers in your cluster request your machinery. Review their requested field dates, farmer details, and approve or decline with 1-click.",
    },
    {
      step: "03",
      icon: DollarSign,
      title: "Dispatch Machine & Earn Returns",
      desc: "Coordinate farm pickup or delivery, hand over the equipment, complete the rental contract, and earn consistent seasonal income.",
    },
  ];

  // Renter-specific guide steps
  const renterSteps = [
    {
      step: "01",
      icon: Search,
      title: "Discover Nearby Machinery",
      desc: "Filter by machinery category, state/district, horsepower, and daily rental budget to find verified equipment in your area.",
    },
    {
      step: "02",
      icon: Calendar,
      title: "Pick Field Schedule Dates",
      desc: "Select start and end dates. Rental total, days of work, and refundable security deposit are calculated automatically in Rupees (₹).",
    },
    {
      step: "03",
      icon: CheckCircle2,
      title: "Get Confirmed & Begin Farming",
      desc: "The owner approves your booking request. Connect directly via verified phone number for machine dispatch and start fieldwork.",
    },
  ];

  const steps = isOwner ? ownerSteps : renterSteps;

  return (
    <div
      className="modal-backdrop"
      onClick={handleClose}
      style={{
        zIndex: 99999,
        backgroundColor: "rgba(0, 0, 0, 0.78)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="modal-card glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "620px",
          padding: "36px 32px",
          border: "1px solid var(--border-hover)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.85), 0 0 30px var(--primary-glow)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "var(--bg-subtle)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Badge & Title */}
        <div style={{ textAlign: "center", marginBottom: "26px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 14px",
              borderRadius: "var(--radius-full)",
              backgroundColor: isOwner ? "rgba(245, 158, 11, 0.14)" : "var(--primary-light)",
              color: isOwner ? "var(--accent)" : "var(--primary)",
              fontSize: "0.8rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: "12px",
              border: "1px solid var(--border)",
            }}
          >
            <Sparkles size={14} style={{ color: "var(--accent)" }} />
            <span>{isOwner ? "Equipment Owner Guide" : "Renter / Kisan Guide"}</span>
          </div>

          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "900",
              color: "var(--text-main)",
              marginBottom: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            {isOwner ? "How AgriShare Works for Owners" : "How AgriShare Works for Renters"}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "460px", margin: "0 auto" }}>
            {isOwner
              ? `Welcome ${user.first_name || user.username}! Here is how you can list your farm machinery and manage incoming rental contracts.`
              : `Welcome ${user.first_name || user.username}! Here is how you can rent high-capacity farm machinery from nearby farmers.`}
          </p>
        </div>

        {/* 3 Interactive Step Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "14px 16px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    backgroundColor: isOwner ? "rgba(245, 158, 11, 0.15)" : "var(--primary-light)",
                    color: isOwner ? "var(--accent)" : "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "0.9rem",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "0.98rem", color: "var(--text-main)", marginBottom: "3px" }}>
                    <span style={{ color: isOwner ? "var(--accent)" : "var(--primary)", marginRight: "6px" }}>
                      {item.step}.
                    </span>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.45" }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Owner vs Renter Callout Banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 14px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: isOwner ? "rgba(245, 158, 11, 0.08)" : "rgba(16, 185, 129, 0.08)",
            border: isOwner ? "1px solid rgba(245, 158, 11, 0.25)" : "1px solid rgba(16, 185, 129, 0.25)",
            fontSize: "0.82rem",
            color: isOwner ? "var(--accent)" : "var(--primary)",
            marginBottom: "24px",
          }}
        >
          {isOwner ? (
            <>
              <TrendingUp size={18} style={{ flexShrink: 0 }} />
              <span>You have complete control to set per-day pricing, security deposits, and approve renter dates.</span>
            </>
          ) : (
            <>
              <ShieldCheck size={18} style={{ flexShrink: 0 }} />
              <span>Direct farmer-to-farmer rates, zero middlemen, and 100% refundable security deposits.</span>
            </>
          )}
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", gap: "10px" }}>
          {isOwner ? (
            <>
              <Link
                href="/equipment/new"
                onClick={handleClose}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  padding: "12px 18px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.95rem",
                  fontWeight: "800",
                  justifyContent: "center",
                }}
              >
                <Tractor size={17} />
                <span>List My First Equipment</span>
              </Link>
              <button
                onClick={handleClose}
                className="btn btn-secondary"
                style={{
                  padding: "12px 20px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                }}
              >
                Go to Dashboard
              </button>
            </>
          ) : (
            <button
              onClick={handleClose}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "12px 20px",
                borderRadius: "var(--radius-md)",
                fontSize: "0.98rem",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <span>Explore Equipment Catalog</span>
              <ArrowRight size={17} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
