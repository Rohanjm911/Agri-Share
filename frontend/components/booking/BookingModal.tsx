"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { bookingService } from "@/services/bookingService";
import { EquipmentDetail } from "@/types";
import { formatCurrency, calculateDaysBetween } from "@/lib/utils";
import { X, Calendar, DollarSign, Shield, CheckCircle2, AlertCircle, Tractor } from "lucide-react";

interface BookingModalProps {
  equipment: EquipmentDetail;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function BookingModal({ equipment, isOpen, onClose, onSuccess }: BookingModalProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const todayStr = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(tomorrowStr);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalDays = useMemo(() => {
    return calculateDaysBetween(startDate, endDate);
  }, [startDate, endDate]);

  const pricePerDay = Number(equipment.price_per_day) || 0;
  const securityDeposit = Number(equipment.security_deposit) || 0;
  const rentalSubtotal = totalDays * pricePerDay;
  const grandTotal = rentalSubtotal + securityDeposit;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push(`/login?redirect=/equipment/${equipment.id}`);
      return;
    }

    if (user?.id === equipment.owner.id) {
      setError("You cannot rent your own equipment listing.");
      return;
    }

    if (totalDays <= 0) {
      setError("End date must be on or after the start date.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await bookingService.createBooking({
        equipment: equipment.id,
        start_date: startDate,
        end_date: endDate,
        notes: notes.trim(),
      });
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to create booking request. Please verify selected dates.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: "32px", maxWidth: "560px" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "var(--text-main)" }}>
              Rent Equipment
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {equipment.name} &bull; {equipment.brand}
            </p>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ padding: "6px" }}>
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: "center", padding: "32px 16px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "800", marginBottom: "8px" }}>
              Booking Request Submitted!
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "24px" }}>
              Your rental request has been sent to <strong>{equipment.owner.first_name || equipment.owner.username}</strong>. You will be notified once they review and approve the request.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button onClick={() => router.push("/bookings")} className="btn btn-primary">
                View My Bookings
              </button>
              <button onClick={onClose} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#dc2626",
                  fontSize: "0.88rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {/* Date Range Inputs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Calendar size={15} style={{ color: "var(--primary)" }} /> Start Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Calendar size={15} style={{ color: "var(--primary)" }} /> End Date
                </label>
                <input
                  type="date"
                  min={startDate || todayStr}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Rental Cost Breakdown Card */}
            <div
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "20px",
                border: "1px solid var(--border)",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-muted)", marginBottom: "12px" }}>
                Price Breakdown
              </h4>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem", marginBottom: "8px" }}>
                <span>
                  {formatCurrency(pricePerDay)} &times; {totalDays} {totalDays === 1 ? "day" : "days"}
                </span>
                <span style={{ fontWeight: "600" }}>{formatCurrency(rentalSubtotal)}</span>
              </div>

              {securityDeposit > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem", marginBottom: "8px", color: "var(--text-muted)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Shield size={14} /> Security Deposit (Refundable)
                  </span>
                  <span style={{ fontWeight: "600" }}>{formatCurrency(securityDeposit)}</span>
                </div>
              )}

              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  marginTop: "12px",
                  paddingTop: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.1rem",
                  fontWeight: "800",
                  color: "var(--text-main)",
                }}
              >
                <span>Estimated Total</span>
                <span style={{ color: "var(--primary)" }}>{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            {/* Optional Notes */}
            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label className="form-label">Rental Notes / Field Tasks (Optional)</label>
              <textarea
                placeholder="Describe intended crop use, preferred pickup time, or haulage questions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-textarea"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || totalDays <= 0}
                className="btn btn-primary"
                style={{ minWidth: "160px" }}
              >
                {isSubmitting ? "Submitting..." : "Confirm & Book"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
