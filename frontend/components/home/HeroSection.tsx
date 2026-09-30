"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Tractor,
  ArrowRight,
  ShieldCheck,
  Star,
  Search,
  Sparkles,
  MapPin,
} from "lucide-react";
import { equipmentService } from "@/services/equipmentService";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/utils";

// Curated featured pool matching active database seed
const DEFAULT_FEATURED_POOL = [
  {
    id: 9,
    name: "Mahindra Yuvo 585 DI (49 HP)",
    category_name: "Tractors",
    price_per_day: 2800,
    location: "Ludhiana, Punjab",
    tag: "POPULAR IN PUNJAB",
    feature: "4WD Power",
    year: "Year 2023",
    image: "/images/equipment/mahindra_tractor.jpg",
    actionLabel: "Book This Tractor",
  },
  {
    id: 10,
    name: "Swaraj 855 FE Heavy Duty (52 HP)",
    category_name: "Tractors",
    price_per_day: 2500,
    location: "Junagadh, Gujarat",
    tag: "BESTSELLER GUJARAT",
    feature: "High Torque",
    year: "Year 2022",
    image: "/images/equipment/swaraj_tractor.jpg",
    actionLabel: "Book This Tractor",
  },
  {
    id: 25,
    name: "John Deere 5310 GearPro (55 HP)",
    category_name: "Tractors",
    price_per_day: 3200,
    location: "Rajkot, Gujarat",
    tag: "TOP PERFORMANCE",
    feature: "Dual Clutch",
    year: "Year 2023",
    image: "/images/equipment/combine_harvester.jpg",
    actionLabel: "Book This Tractor",
  },
  {
    id: 11,
    name: "Preet 987 Combine Harvester",
    category_name: "Harvesters & Combines",
    price_per_day: 6500,
    location: "Ludhiana, Punjab",
    tag: "HARVEST SEASON SPECIAL",
    feature: "Multi-Crop Header",
    year: "Year 2022",
    image: "/images/equipment/preet_harvester.jpg",
    actionLabel: "Book This Harvester",
  },
  {
    id: 24,
    name: "Shaktiman Regular Light Rotavator",
    category_name: "Tillage & Cultivation",
    price_per_day: 950,
    location: "Ludhiana, Punjab",
    tag: "EXCELLENT TILLAGE",
    feature: "48 Blades",
    year: "Year 2023",
    image: "/images/equipment/shaktiman_rotavator.jpg",
    actionLabel: "Book This Rotavator",
  },
  {
    id: 17,
    name: "Kubota MU4501 4WD Tractor (45 HP)",
    category_name: "Tractors",
    price_per_day: 2700,
    location: "Karnal, Haryana",
    tag: "JAPANESE TECH",
    feature: "High Fuel Economy",
    year: "Year 2023",
    image: "/images/equipment/tractor_john_deere.jpg",
    actionLabel: "Book This Tractor",
  },
];

export function HeroSection() {
  const { user, isAuthenticated } = useAuth();
  const [featuredItem, setFeaturedItem] = useState(DEFAULT_FEATURED_POOL[0]);

  const selectRandomEquipment = (pool = DEFAULT_FEATURED_POOL) => {
    if (!pool || pool.length === 0) return;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setFeaturedItem(pool[randomIndex]);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadFeaturedOptions() {
      try {
        const res = await equipmentService.getEquipmentList();
        const list = res.results || [];
        // Prioritize impressive farm machinery (Tractors, Combines, Rotavators, Harvesters, Levelers, Balers)
        const primaryFleet = list.filter((item) => {
          const cat = item.category_name?.toLowerCase() || "";
          return !cat.includes("hand tool") && !cat.includes("cart");
        });
        const poolToUse = primaryFleet.length > 0 ? primaryFleet : list;

        if (poolToUse.length > 0 && isMounted) {
          const formatted = poolToUse.map((item) => {
            const isTractor = item.category_name?.toLowerCase().includes("tractor");
            const isHarvester = item.category_name?.toLowerCase().includes("harvester");
            const isRotavator = item.name?.toLowerCase().includes("rotavator");
            return {
              id: item.id,
              name: item.name,
              category_name: item.category_name,
              price_per_day: Number(item.price_per_day),
              location: item.location || "India",
              tag: `FEATURED IN ${item.location ? item.location.split(",").pop()?.trim().toUpperCase() : "AGRISHARE"}`,
              feature: item.condition || "Verified Machine",
              year: "Model 2023",
              image: item.primary_image || "/images/equipment/mahindra_tractor.jpg",
              actionLabel: isTractor
                ? "Book This Tractor"
                : isHarvester
                ? "Book This Harvester"
                : isRotavator
                ? "Book This Rotavator"
                : "Book This Machinery",
            };
          });

          // Pick random item on mount / session load
          const randomIndex = Math.floor(Math.random() * formatted.length);
          setFeaturedItem(formatted[randomIndex]);
        }
      } catch {
        // Fallback to curated pool on error
        selectRandomEquipment(DEFAULT_FEATURED_POOL);
      }
    }

    loadFeaturedOptions();

    // Listen to login event to guarantee fresh random machinery upon every login
    const handleLoginEvent = () => {
      loadFeaturedOptions();
    };

    window.addEventListener("agrishare_login", handleLoginEvent);
    return () => {
      isMounted = false;
      window.removeEventListener("agrishare_login", handleLoginEvent);
    };
  }, [user?.id, isAuthenticated]);
  return (
    <section
      className="apple-spotlight"
      style={{
        position: "relative",
        paddingTop: "76px",
        paddingBottom: "88px",
        backgroundColor: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
        transition: "background-color 0.15s ease, border-color 0.15s ease",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "52px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Hero Left Content */}
          <div style={{ maxWidth: "660px" }}>
            <h1
              className="animate-reveal stagger-2"
              style={{
                fontSize: "clamp(2.5rem, 5.2vw, 4.1rem)",
                fontWeight: "900",
                lineHeight: "1.08",
                letterSpacing: "-0.04em",
                color: "var(--text-main)",
                marginBottom: "20px",
              }}
            >
              Heavy Farm Machinery. <br />
              <span className="apple-gradient-emerald">
                Engineered for Kisans.
              </span>
            </h1>

            <p
              className="animate-reveal stagger-3"
              style={{
                fontSize: "1.12rem",
                lineHeight: "1.65",
                color: "var(--text-muted)",
                letterSpacing: "-0.015em",
                marginBottom: "36px",
                maxWidth: "600px",
              }}
            >
              Rent high-capacity 4WD tractors, combine harvesters, rotavators, and laser levelers directly from verified equipment
              owners in your district — with zero broker fees.
            </p>

            {/* Apple-Style Pill CTA Buttons */}
            <div
              className="animate-reveal stagger-4"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                marginBottom: "44px",
              }}
            >
              <Link
                href="/equipment"
                className="btn btn-primary apple-pill-btn btn-lg"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Search size={18} />
                <span>Explore Machinery</span>
                <ArrowRight size={17} className="card-arrow" />
              </Link>
              <Link
                href="/equipment/new"
                className="btn btn-secondary apple-pill-btn btn-lg"
                style={{
                  backdropFilter: "blur(16px)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Tractor size={18} />
                <span>List Your Machinery ›</span>
              </Link>
            </div>

            {/* Apple-Grade Frosted Glass Metrics Bar */}
            <div
              className="glass-panel animate-reveal stagger-5 hero-metrics-bar"
              style={{
                display: "grid",
                padding: "20px 24px",
                gap: "16px",
                borderRadius: "var(--radius-squircle)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "900",
                    letterSpacing: "-0.03em",
                    color: "var(--primary)",
                    lineHeight: "1.1",
                  }}
                >
                  500+
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600", marginTop: "2px" }}>
                  Verified Machines
                </div>
              </div>
              <div className="metric-col" style={{ borderLeft: "1px solid var(--border)", paddingLeft: "20px" }}>
                <div
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "900",
                    letterSpacing: "-0.03em",
                    color: "var(--accent)",
                    lineHeight: "1.1",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  4.9 <Star size={16} fill="var(--accent)" color="var(--accent)" />
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600", marginTop: "2px" }}>
                  Farmer Rating
                </div>
              </div>
              <div className="metric-col" style={{ borderLeft: "1px solid var(--border)", paddingLeft: "20px" }}>
                <div
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "900",
                    letterSpacing: "-0.03em",
                    color: "var(--primary)",
                    lineHeight: "1.1",
                  }}
                >
                  ₹0
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600", marginTop: "2px" }}>
                  Brokerage Fee
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card: Apple Pro Showcase */}
          <div>
            <div
              className="apple-card"
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                borderRadius: "var(--radius-squircle-lg)",
              }}
            >
              {/* Card Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      backgroundColor: "var(--primary)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px var(--primary-glow)",
                    }}
                  >
                    <Tractor size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "800", fontSize: "0.98rem", color: "var(--text-main)", letterSpacing: "-0.01em" }}>
                      Featured Machine
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      Live Field Availability
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    color: "var(--primary)",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary)",
                      boxShadow: "0 0 6px var(--primary)",
                    }}
                  />
                  Available Now
                </span>
              </div>

              {/* Machinery Photo with Floating Glass Chips */}
              <div
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  position: "relative",
                  boxShadow: "0 8px 24px -6px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div style={{ height: "235px", position: "relative", backgroundColor: "var(--bg-subtle)" }}>
                  <img
                    key={featuredItem.id}
                    src={featuredItem.image}
                    alt={featuredItem.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s var(--apple-ease)",
                    }}
                  />
                  {/* Frosted Tag Pill */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      display: "flex",
                      gap: "6px",
                      zIndex: 2,
                    }}
                  >
                    <span
                      className="apple-badge"
                      style={{
                        padding: "4px 12px",
                        fontSize: "0.72rem",
                        backgroundColor: "rgba(0, 0, 0, 0.65)",
                        color: "#ffffff",
                        borderColor: "rgba(255, 255, 255, 0.15)",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {featuredItem.tag}
                    </span>
                  </div>

                  {/* Bottom Spec Pills Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      right: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "8px",
                      zIndex: 2,
                    }}
                  >
                    <span
                      className="apple-badge"
                      style={{
                        padding: "4px 10px",
                        fontSize: "0.72rem",
                        backgroundColor: "rgba(0, 0, 0, 0.65)",
                        color: "#ffffff",
                        borderColor: "rgba(255, 255, 255, 0.15)",
                      }}
                    >
                      <MapPin size={11} style={{ color: "var(--accent)" }} />
                      <span>{featuredItem.location}</span>
                    </span>

                    <span
                      className="apple-badge"
                      style={{
                        padding: "4px 10px",
                        fontSize: "0.72rem",
                        backgroundColor: "rgba(0, 0, 0, 0.65)",
                        color: "#ffffff",
                        borderColor: "rgba(255, 255, 255, 0.15)",
                      }}
                    >
                      ⚡ {featuredItem.feature}
                    </span>
                  </div>
                </div>

                {/* Details Footer */}
                <div style={{ padding: "18px", backgroundColor: "var(--bg-card)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontWeight: "800",
                          fontSize: "1.15rem",
                          letterSpacing: "-0.02em",
                          lineHeight: "1.3",
                          color: "var(--text-main)",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          marginBottom: "4px",
                        }}
                      >
                        {featuredItem.name}
                      </h3>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>
                        {featuredItem.category_name} • {featuredItem.year}
                      </div>
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      <div style={{ color: "var(--primary)", fontWeight: "900", fontSize: "1.35rem", letterSpacing: "-0.03em", lineHeight: "1" }}>
                        {formatCurrency(featuredItem.price_per_day)}
                      </div>
                      <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontWeight: "600" }}>/ day</span>
                    </div>
                  </div>

                  <Link
                    href={`/equipment/${featuredItem.id}`}
                    className="btn btn-primary apple-pill-btn"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "10px 20px !important",
                      fontSize: "0.92rem",
                    }}
                  >
                    <span>{featuredItem.actionLabel}</span>
                    <ArrowRight size={16} className="card-arrow" />
                  </Link>
                </div>
              </div>

              {/* Direct Note */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "14px",
                  backgroundColor: "var(--primary-light)",
                  border: "1px solid var(--border)",
                  fontSize: "0.82rem",
                  color: "var(--text-main)",
                }}
              >
                <ShieldCheck size={18} style={{ color: "var(--primary)", flexShrink: 0 }} />
                <span>Direct kisan-to-kisan rental with 100% verified identities and zero broker fees.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.hero-metrics-bar) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 580px) {
          :global(.hero-metrics-bar) {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          :global(.metric-col) {
            border-left: none !important;
            border-top: 1px solid var(--border) !important;
            padding-left: 0 !important;
            padding-top: 12px !important;
          }
        }
        @media (min-width: 992px) {
          :global(.hero-grid) {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
