"use client";

import React from "react";
import Link from "next/link";
import { EquipmentListItem } from "@/types";
import { formatCurrency, getConditionColor } from "@/lib/utils";
import { MapPin, Star, Tractor, Calendar } from "lucide-react";

interface EquipmentCardProps {
  equipment: EquipmentListItem;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  const condColor = getConditionColor(equipment.condition);

  return (
    <div className="card card-hover" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Card Image Banner */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "210px",
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
              transition: "transform 0.3s ease",
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
            <span style={{ fontSize: "0.85rem", fontWeight: "500" }}>{equipment.category_name}</span>
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
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: "700",
              padding: "3px 8px",
              borderRadius: "var(--radius-full)",
              backgroundColor: condColor.bg,
              color: condColor.text,
              border: `1px solid ${condColor.border}`,
              backdropFilter: "blur(6px)",
            }}
          >
            {equipment.condition}
          </span>
          {!equipment.is_available && (
            <span className="badge badge-warning" style={{ backdropFilter: "blur(6px)" }}>
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
              backgroundColor: "rgba(13, 20, 14, 0.8)",
              color: "#ffffff",
              padding: "4px 8px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.75rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              backdropFilter: "blur(4px)",
            }}
          >
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span>{equipment.average_rating}</span>
            <span style={{ opacity: 0.7 }}>({equipment.total_reviews})</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
          {equipment.brand} &bull; {equipment.category_name}
        </div>

        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "var(--text-main)",
            lineHeight: "1.35",
            marginBottom: "12px",
          }}
        >
          <Link href={`/equipment/${equipment.id}`} style={{ color: "inherit" }}>
            {equipment.name}
          </Link>
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "16px" }}>
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
            <div style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--primary)" }}>
              {formatCurrency(equipment.price_per_day)}
              <span style={{ fontSize: "0.8rem", fontWeight: "500", color: "var(--text-muted)" }}> / day</span>
            </div>
            {Number(equipment.security_deposit) > 0 && (
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                Deposit: {formatCurrency(equipment.security_deposit)}
              </div>
            )}
          </div>

          <Link href={`/equipment/${equipment.id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
