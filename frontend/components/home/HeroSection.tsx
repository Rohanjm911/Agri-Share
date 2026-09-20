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
      style={{
        position: "relative",
        paddingTop: "64px",
        paddingBottom: "80px",
        backgroundColor: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
        transition: "background-color 0.15s ease, border-color 0.15s ease",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Hero Left Content */}
          <div style={{ maxWidth: "660px" }}>
            <div
              className="animate-reveal stagger-1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--primary-light)",
                border: "1px solid var(--border)",
                fontSize: "0.85rem",
                fontWeight: "700",
                color: "var(--primary)",
                marginBottom: "20px",
              }}
            >
              <Sparkles size={15} style={{ color: "var(--accent)" }} />
              <span>India&apos;s Agricultural Machinery Sharing Network</span>
            </div>

            <h1
              className="animate-reveal stagger-2"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: "900",
                lineHeight: "1.15",
                letterSpacing: "-0.03em",
                color: "var(--text-main)",
                marginBottom: "18px",
              }}
            >
              Agricultural Machinery <br />
              <span style={{ color: "var(--primary)" }}>
                Directly from Local Farmers.
              </span>
            </h1>

            <p
              className="animate-reveal stagger-3"
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.65",
                color: "var(--text-muted)",
                marginBottom: "32px",
              }}
            >
              Rent high-capacity tractors, combine harvesters, rotavators, and laser levelers from verified equipment
              owners across Punjab, Haryana, Madhya Pradesh, Gujarat, Maharashtra, and beyond.
            </p>

            {/* CTA Buttons - Modern Sleek Dual-Tone Pair */}
            <div
              className="animate-reveal stagger-4"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                marginBottom: "40px",
              }}
            >
              <Link
                href="/equipment"
                className="btn btn-primary btn-lg"
                style={{
                  borderRadius: "9999px",
                  padding: "12px 28px",
                  fontSize: "0.98rem",
                  letterSpacing: "-0.01em",
                }}
              >
                <Search size={17} />
                <span>Search Equipment</span>
                <ArrowRight size={17} className="card-arrow" />
              </Link>
              <Link
                href="/equipment/new"
                className="btn btn-secondary btn-lg"
                style={{
                  borderRadius: "9999px",
                  padding: "12px 26px",
                  fontSize: "0.98rem",
                  letterSpacing: "-0.01em",
                }}
              >
                <Tractor size={17} />
                <span>List Your Tractor & Implements</span>
              </Link>
            </div>

            {/* Frosted Glass Verified Metric Bar */}
            <div
              className="card glass-panel animate-reveal stagger-5 hero-metrics-bar"
              style={{
                display: "grid",
                padding: "18px 20px",
                gap: "14px",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "1.65rem",
                    fontWeight: "900",
                    color: "var(--primary)",
                    lineHeight: "1.2",
                  }}
                >
                  500+
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "700" }}>
                  Verified Machines
                </div>
              </div>
              <div className="metric-col" style={{ borderLeft: "1px solid var(--border)", paddingLeft: "18px" }}>
                <div
                  style={{
                    fontSize: "1.65rem",
                    fontWeight: "900",
                    color: "var(--accent)",
                    lineHeight: "1.2",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  4.9 <Star size={16} fill="var(--accent)" color="var(--accent)" />
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "700" }}>
                  Farmer Rating
                </div>
              </div>
              <div className="metric-col" style={{ borderLeft: "1px solid var(--border)", paddingLeft: "18px" }}>
                <div
                  style={{
                    fontSize: "1.65rem",
                    fontWeight: "900",
                    color: "var(--primary)",
                    lineHeight: "1.2",
                  }}
                >
                  ₹0
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "700" }}>
                  Platform Brokerage
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card */}
          <div>
            <div
              className="card"
              style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "var(--primary)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Tractor size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "800", fontSize: "0.95rem", color: "var(--text-main)" }}>
                      Featured Machinery
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      Ready for Immediate Field Work
                    </div>
                  </div>
                </div>
                <span className="badge badge-success">Available</span>
              </div>

              {/* Machinery Photo */}
              <div
                style={{
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ height: "220px", position: "relative", backgroundColor: "var(--bg-subtle)" }}>
                  <img
                    key={featuredItem.id}
                    src={featuredItem.image}
                    alt={featuredItem.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "opacity 0.3s ease",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      fontSize: "0.72rem",
                      fontWeight: "800",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--primary)",
                      color: "#ffffff",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {featuredItem.tag}
                  </span>
                </div>

                <div style={{ padding: "18px 18px 16px", backgroundColor: "var(--bg-subtle)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "12px" }}>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontWeight: "800",
                          fontSize: "1.1rem",
                          lineHeight: "1.3",
                          color: "var(--text-main)",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          marginBottom: "4px",
                        }}
                      >
                        {featuredItem.name}
                      </h3>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600" }}>
                        {featuredItem.category_name}
                      </div>
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        flexShrink: 0,
                        backgroundColor: "var(--bg-card)",
                        padding: "6px 12px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div style={{ color: "var(--primary)", fontWeight: "900", fontSize: "1.25rem", lineHeight: "1.1" }}>
                        {formatCurrency(featuredItem.price_per_day)}
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "700" }}>per day</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                    <span className="badge badge-info"><MapPin size={11} /> {featuredItem.location}</span>
                    <span className="badge badge-success">{featuredItem.feature}</span>
                    <span className="badge badge-muted">{featuredItem.year}</span>
                  </div>

                  <Link href={`/equipment/${featuredItem.id}`} className="btn btn-primary" style={{ width: "100%" }}>
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
                  borderRadius: "var(--radius-sm)",
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
