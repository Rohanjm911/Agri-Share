"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { bookingService } from "@/services/bookingService";
import { Booking } from "@/types";
import { formatCurrency, formatDate, getStatusBadge } from "@/lib/utils";
import { ReviewModal } from "@/components/reviews/ReviewModal";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  Tractor,
  Star,
  DollarSign,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default function BookingsManagementPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"renter" | "owner">("renter");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Review modal state
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await bookingService.getBookings({ role: activeTab });
      setBookings(res.results);
    } catch (err: any) {
      setError(err.message || "Failed to load bookings.");
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login?redirect=/bookings");
      } else {
        fetchBookings();
      }
    }
  }, [authLoading, isAuthenticated, router, fetchBookings]);

  const handleApprove = async (id: number) => {
    try {
      await bookingService.approveBooking(id);
      setActionSuccess("Booking request approved!");
      fetchBookings();
    } catch (err: any) {
      setError(err.message || "Failed to approve booking.");
    }
  };

  const handleReject = async (id: number) => {
    if (!confirm("Are you sure you want to decline this booking request?")) return;
    try {
      await bookingService.rejectBooking(id);
      setActionSuccess("Booking request declined.");
      fetchBookings();
    } catch (err: any) {
      setError(err.message || "Failed to decline booking.");
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await bookingService.cancelBooking(id);
      setActionSuccess("Booking cancelled.");
      fetchBookings();
    } catch (err: any) {
      setError(err.message || "Failed to cancel booking.");
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await bookingService.completeBooking(id);
      setActionSuccess("Rental marked as completed.");
      fetchBookings();
    } catch (err: any) {
      setError(err.message || "Failed to mark as completed.");
    }
  };

  if (authLoading || isLoading) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <Tractor size={48} className="animate-spin" style={{ color: "var(--primary)" }} />
        <p style={{ fontWeight: "600", color: "var(--text-muted)" }}>Loading rental contracts and requests...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", padding: "48px 0 80px" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "var(--text-main)", marginBottom: "6px" }}>
            Rental Contracts & Bookings
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
            Track machine reservation schedules, approve incoming requests, and manage rental agreements.
          </p>
        </div>

        {/* Action Alerts */}
        {actionSuccess && (
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
            <span>{actionSuccess}</span>
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

        {/* Tab Toggle Navigation */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "12px",
            marginBottom: "32px",
          }}
        >
          <button
            onClick={() => setActiveTab("renter")}
            className={`btn ${activeTab === "renter" ? "btn-primary" : "btn-secondary"}`}
          >
            <CalendarDays size={18} />
            <span>My Bookings (As Renter)</span>
          </button>
          <button
            onClick={() => setActiveTab("owner")}
            className={`btn ${activeTab === "owner" ? "btn-primary" : "btn-secondary"}`}
          >
            <Tractor size={18} />
            <span>Incoming Requests (As Equipment Owner)</span>
          </button>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
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
            <CalendarDays size={56} style={{ color: "var(--text-muted)", opacity: 0.4, marginBottom: "16px" }} />
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "8px" }}>
              {activeTab === "renter" ? "No Rental Bookings Found" : "No Incoming Rental Requests"}
            </h3>
            <p style={{ color: "var(--text-muted)", maxWidth: "460px", marginBottom: "24px" }}>
              {activeTab === "renter"
                ? "You haven't booked any agricultural equipment yet. Browse our inventory to find machinery."
                : "You don't have any incoming rental requests on your equipment listings at the moment."}
            </p>
            {activeTab === "renter" && (
              <Link href="/equipment" className="btn btn-primary">
                Browse Equipment Catalog
              </Link>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {bookings.map((booking) => {
              const statusBadge = getStatusBadge(booking.status);
              return (
                <div
                  key={booking.id}
                  className="card"
                  style={{
                    padding: "24px",
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "24px",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)" }}>
                          BOOKING #{booking.id}
                        </span>
                        <span className={`badge ${statusBadge.colorClass}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                        <Link href={`/equipment/${booking.equipment}`} style={{ color: "inherit" }}>
                          {booking.equipment_detail?.name || "Equipment Rental"}
                        </Link>
                      </h3>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1.3rem", fontWeight: "900", color: "var(--primary)" }}>
                        {formatCurrency(booking.total_amount)}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        {formatCurrency(booking.price_per_day)}/day &times; {booking.total_days} days
                        {Number(booking.security_deposit) > 0 && ` + deposit`}
                      </div>
                    </div>
                  </div>

                  {/* Schedule & Parties Info */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "16px",
                      fontSize: "0.9rem",
                    }}
                  >
                    <div>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase" }}>Rental Dates</span>
                      <div style={{ fontWeight: "700", marginTop: "2px" }}>
                        {formatDate(booking.start_date)} &rarr; {formatDate(booking.end_date)}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        Total Duration: {booking.total_days} {booking.total_days === 1 ? "day" : "days"}
                      </div>
                    </div>

                    <div>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase" }}>
                        {activeTab === "renter" ? "Equipment Owner" : "Renter Details"}
                      </span>
                      <div style={{ fontWeight: "700", marginTop: "2px" }}>
                        {activeTab === "renter"
                          ? booking.owner_name || booking.owner_email
                          : `${booking.renter.first_name} ${booking.renter.last_name || booking.renter.username}`}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        {activeTab === "renter" ? booking.owner_email : booking.renter.email}
                      </div>
                    </div>

                    {booking.notes && (
                      <div>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase" }}>Rental Notes</span>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-main)", marginTop: "2px" }}>
                          &ldquo;{booking.notes}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Controls */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "12px",
                      justifyContent: "flex-end",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "16px",
                    }}
                  >
                    {/* Owner Actions */}
                    {activeTab === "owner" && booking.status === "PENDING" && (
                      <>
                        <button onClick={() => handleReject(booking.id)} className="btn btn-danger btn-sm">
                          <XCircle size={16} /> Decline Request
                        </button>
                        <button onClick={() => handleApprove(booking.id)} className="btn btn-primary btn-sm">
                          <CheckCircle2 size={16} /> Approve Booking
                        </button>
                      </>
                    )}

                    {activeTab === "owner" && booking.status === "APPROVED" && (
                      <button onClick={() => handleComplete(booking.id)} className="btn btn-primary btn-sm">
                        <CheckCircle2 size={16} /> Mark As Completed
                      </button>
                    )}

                    {/* Renter Actions */}
                    {activeTab === "renter" && (booking.status === "PENDING" || booking.status === "APPROVED") && (
                      <button onClick={() => handleCancel(booking.id)} className="btn btn-secondary btn-sm">
                        <XCircle size={16} /> Cancel Booking
                      </button>
                    )}

                    {activeTab === "renter" && booking.can_review && (
                      <button
                        onClick={() => setReviewBooking(booking)}
                        className="btn btn-primary btn-sm"
                      >
                        <Star size={16} fill="#ffffff" /> Leave Review
                      </button>
                    )}

                    <Link href={`/equipment/${booking.equipment}`} className="btn btn-ghost btn-sm">
                      <ExternalLink size={15} /> Machinery Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Modal for Completed Rentals */}
      {reviewBooking && (
        <ReviewModal
          booking={reviewBooking}
          isOpen={!!reviewBooking}
          onClose={() => setReviewBooking(null)}
          onSuccess={() => {
            fetchBookings();
          }}
        />
      )}
    </div>
  );
}
