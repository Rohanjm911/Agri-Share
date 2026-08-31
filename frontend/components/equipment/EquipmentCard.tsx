"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EquipmentListItem } from "@/types";
import { formatCurrency, getConditionColor } from "@/lib/utils";
import { MapPin, Star, Tractor, ArrowRight } from "lucide-react";

interface EquipmentCardProps {
  equipment: EquipmentListItem;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  const condColor = getConditionColor(equipment.condition);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card card-interactive"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Card Image Banner */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "220px",
          backgroundColor: "var(--bg-subtle)",
          overflow: "hidden",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {equipment.primary_image ? (
          <img
            src={equipment.primary_image}
            alt={equipment.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              gap: "8px",
            }}
          >
            <Tractor size={48} style={{ opacity: 0.4 }} />
            <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>{equipment.category_name}</span>
          </div>
        )}

        {/* Condition & Status Badges */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: "800",
              padding: "3px 10px",
              borderRadius: "var(--radius-full)",
              backgroundColor: condColor.bg,
              color: condColor.text,
              border: `1px solid ${condColor.border}`,
              backdropFilter: "blur(8px)",
              letterSpacing: "0.02em",
            }}
          >
            {equipment.condition}
          </span>
          {!equipment.is_available && (
            <span className="badge badge-warning" style={{ backdropFilter: "blur(8px)" }}>
              Reserved
            </span>
          )}
        </div>

        {/* Rating Badge */}
        {equipment.total_reviews > 0 && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: "rgba(12, 20, 14, 0.85)",
              color: "#ffffff",
              padding: "4px 10px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.78rem",
              fontWeight: "800",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              zIndex: 2,
            }}
          >
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>{equipment.average_rating}</span>
            <span style={{ opacity: 0.7, fontSize: "0.72rem" }}>({equipment.total_reviews})</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: "22px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--primary)",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "6px",
          }}
        >
          {equipment.brand} &bull; {equipment.category_name}
        </div>

        <h3
          style={{
            fontSize: "1.15rem",
            fontWeight: "800",
            color: "var(--text-main)",
            lineHeight: "1.35",
            marginBottom: "10px",
          }}
        >
          <Link href={`/equipment/${equipment.id}`} style={{ color: "inherit" }}>
            {equipment.name}
          </Link>
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            marginBottom: "20px",
          }}
        >
          <MapPin size={15} style={{ color: "var(--primary)", flexShrink: 0 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {equipment.location}
          </span>
        </div>

        {/* Card Footer with Price & CTA */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "16px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: "900",
                color: "var(--primary)",
                fontFamily: "var(--font-family-heading)",
              }}
            >
              {formatCurrency(equipment.price_per_day)}
              <span style={{ fontSize: "0.78rem", fontWeight: "600", color: "var(--text-muted)" }}> / day</span>
            </div>
            {Number(equipment.security_deposit) > 0 && (
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                Deposit: {formatCurrency(equipment.security_deposit)}
              </div>
            )}
          </div>

          <Link href={`/equipment/${equipment.id}`} className="btn btn-primary btn-sm">
            <span>View</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
