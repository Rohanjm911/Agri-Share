"use client";

import React from "react";
import Link from "next/link";
import { EquipmentListItem } from "@/types";
import { formatCurrency, getConditionColor } from "@/lib/utils";
import { MapPin, Star, Tractor, ArrowRight } from "lucide-react";

interface EquipmentCardProps {
  equipment: EquipmentListItem;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  const condColor = getConditionColor(equipment.condition);

  return (
    <div
      className="card card-interactive"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "var(--bg-card)",
      }}
    >
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
            top: "10px",
            left: "10px",
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: "700",
              padding: "3px 8px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: condColor.bg,
              color: condColor.text,
              border: `1px solid ${condColor.border}`,
            }}
          >
            {equipment.condition}
          </span>
          {!equipment.is_available && (
            <span className="badge badge-warning">
              Reserved
            </span>
          )}
        </div>

        {/* Rating Badge */}
        {equipment.total_reviews > 0 && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "#1c241e",
              color: "#ffffff",
              padding: "3px 8px",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.75rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              zIndex: 2,
            }}
          >
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span>{equipment.average_rating}</span>
            <span style={{ opacity: 0.7, fontSize: "0.7rem" }}>({equipment.total_reviews})</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: "18px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--primary)",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            marginBottom: "4px",
          }}
        >
          {equipment.brand} &bull; {equipment.category_name}
        </div>

        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: "800",
            color: "var(--text-main)",
            lineHeight: "1.35",
            marginBottom: "8px",
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
            gap: "5px",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            marginBottom: "16px",
          }}
        >
          <MapPin size={14} style={{ color: "var(--primary)", flexShrink: 0 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {equipment.location}
          </span>
        </div>

        {/* Card Footer with Price & CTA */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "14px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: "900",
                color: "var(--primary)",
              }}
            >
              {formatCurrency(equipment.price_per_day)}
              <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "var(--text-muted)" }}> / day</span>
            </div>
            {Number(equipment.security_deposit) > 0 && (
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                Deposit: {formatCurrency(equipment.security_deposit)}
              </div>
            )}
          </div>

          <Link href={`/equipment/${equipment.id}`} className="btn btn-primary btn-sm">
            <span>View</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
