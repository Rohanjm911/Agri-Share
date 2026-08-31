"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { equipmentService } from "@/services/equipmentService";
import { EquipmentListItem } from "@/types";
import { formatCurrency, getConditionColor } from "@/lib/utils";
import {
  Tractor,
  PlusCircle,
  Trash2,
  ExternalLink,
  MapPin,
  Star,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function MyEquipmentPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [equipmentList, setEquipmentList] = useState<EquipmentListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchMyListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res: any = await equipmentService.getMyEquipment();
      const items = Array.isArray(res) ? res : res.results || [];
      setEquipmentList(items);
    } catch (err: any) {
      setError(err.message || "Failed to load your equipment listings.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login?redirect=/my-equipment");
      } else {
        fetchMyListings();
      }
    }
  }, [authLoading, isAuthenticated, router, fetchMyListings]);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to remove '${name}' from your listings?`)) return;

    try {
      await equipmentService.deleteEquipment(id);
      setActionMessage(`Equipment '${name}' has been deleted.`);
      setEquipmentList((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete listing.");
    }
  };

  if (authLoading || isLoading) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <Tractor size={48} className="animate-spin" style={{ color: "var(--primary)" }} />
        <p style={{ fontWeight: "600", color: "var(--text-muted)" }}>Loading your equipment inventory...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", padding: "48px 0 80px" }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-main)", marginBottom: "6px" }}>
              My Equipment Listings
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
              Manage your agricultural machinery inventory, availability, and rental rates.
            </p>
          </div>

          <Link href="/equipment/new" className="btn btn-primary btn-lg">
            <PlusCircle size={18} />
            <span>List New Equipment</span>
          </Link>
        </div>

        {actionMessage && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              color: "#15803d",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <CheckCircle2 size={18} />
            <span>{actionMessage}</span>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#dc2626",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {equipmentList.length === 0 ? (
          <div
            className="card"
            style={{
              padding: "64px 24px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Tractor size={56} style={{ color: "var(--text-muted)", opacity: 0.4, marginBottom: "16px" }} />
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "8px" }}>
              No Equipment Listed Yet
            </h3>
            <p style={{ color: "var(--text-muted)", maxWidth: "460px", marginBottom: "24px" }}>
              You haven't listed any farm machinery yet. Start generating revenue from your idle equipment today.
            </p>
            <Link href="/equipment/new" className="btn btn-primary">
              <PlusCircle size={18} /> Add Your First Machine
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {equipmentList.map((eq) => {
              const condColor = getConditionColor(eq.condition);
              return (
                <div key={eq.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      height: "180px",
                      position: "relative",
                      backgroundColor: "var(--bg-subtle)",
                      overflow: "hidden",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {eq.primary_image ? (
                      <img src={eq.primary_image} alt={eq.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                        <Tractor size={40} style={{ opacity: 0.4 }} />
                      </div>
                    )}
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        fontSize: "0.72rem",
                        fontWeight: "700",
                        padding: "3px 8px",
                        borderRadius: "var(--radius-full)",
                        backgroundColor: condColor.bg,
                        color: condColor.text,
                        border: `1px solid ${condColor.border}`,
                      }}
                    >
                      {eq.condition}
                    </span>
                  </div>

                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: "700", textTransform: "uppercase", marginBottom: "4px" }}>
                      {eq.brand} &bull; {eq.category_name}
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }}>
                      {eq.name}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "16px" }}>
                      <MapPin size={15} style={{ color: "var(--primary)" }} /> {eq.location}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "10px 12px", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-md)" }}>
                      <div>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Daily Rate:</span>
                        <div style={{ fontWeight: "800", color: "var(--primary)" }}>{formatCurrency(eq.price_per_day)}/day</div>
                      </div>
                      {eq.total_reviews > 0 && (
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Rating:</span>
                          <div style={{ fontWeight: "700", color: "var(--accent-gold)", display: "flex", alignItems: "center", gap: "2px" }}>
                            <Star size={14} fill="var(--accent-gold)" /> {eq.average_rating}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ marginTop: "auto", display: "flex", gap: "8px", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                      <Link href={`/equipment/${eq.id}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                        <ExternalLink size={14} /> View
                      </Link>
                      <button
                        onClick={() => handleDelete(eq.id, eq.name)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: "#ef4444" }}
                        title="Delete listing"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
