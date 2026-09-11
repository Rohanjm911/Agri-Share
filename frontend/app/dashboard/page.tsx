"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { dashboardService } from "@/services/dashboardService";
import { DashboardOverview, DashboardStats } from "@/types";
import { formatCurrency, formatDate, getStatusBadge } from "@/lib/utils";
import {
  Tractor,
  DollarSign,
  CalendarDays,
  Clock,
  Star,
  PlusCircle,
  Search,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  User,
  Wrench,
  CheckCircle,
  ShieldCheck,
  Tag,
  ShoppingBag,
} from "lucide-react";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [statsData, overviewData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getOverview(),
      ]);
      setStats(statsData);
      setOverview(overviewData);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login?redirect=/dashboard");
      } else {
        fetchDashboardData();
      }
    }
  }, [authLoading, isAuthenticated, router, fetchDashboardData]);

  if (authLoading || isLoading) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <Tractor size={48} className="animate-spin" style={{ color: "var(--primary)" }} />
        <p style={{ fontWeight: "600", color: "var(--text-muted)" }}>Loading your farm marketplace dashboard...</p>
      </div>
    );
  }

  const owner = stats?.owner_metrics;
  const renter = stats?.renter_metrics;

  return (
    <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", padding: "48px 0 80px" }}>
      <div className="container">
        {/* Welcome Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "var(--text-main)", marginBottom: "4px" }}>
              Welcome back, {user?.first_name || user?.username}!
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
              {user?.role === "OWNER"
                ? "Here is what is happening across your machinery listings and rental contracts today."
                : "Manage your farm machinery bookings, rental dates, and discover available equipment."}
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {user?.role === "OWNER" && (
              <Link href="/equipment/new" className="btn btn-primary">
                <PlusCircle size={18} /> List Equipment
              </Link>
            )}
            <Link href="/equipment" className="btn btn-primary">
              <Search size={18} /> Browse Machinery
            </Link>
          </div>
        </div>

        {/* Overview Stats Cards: Tailored for OWNER vs RENTER */}
        {user?.role === "OWNER" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {/* Card 1: Machinery Listed */}
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  My Equipment
                </span>
                <div style={{ padding: "8px", borderRadius: "var(--radius-md)", backgroundColor: "var(--primary-light)", color: "var(--primary)" }}>
                  <Tractor size={20} />
                </div>
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--text-main)" }}>
                {owner?.total_equipment || 0}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
                {owner?.active_listings || 0} active in directory
              </div>
            </div>

            {/* Card 2: Rental Requests */}
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Pending Requests
                </span>
                <div style={{ padding: "8px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(245, 158, 11, 0.15)", color: "#d97706" }}>
                  <Clock size={20} />
                </div>
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#d97706" }}>
                {owner?.incoming_pending_requests || 0}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
                Needs your review
              </div>
            </div>

            {/* Card 3: Rental Earnings */}
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Total Earnings
                </span>
                <div style={{ padding: "8px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#16a34a" }}>
                  <TrendingUp size={20} />
                </div>
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--primary)" }}>
                {formatCurrency(owner?.total_earnings)}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
                From {owner?.completed_rentals || 0} completed rentals
              </div>
            </div>

            {/* Card 4: My Rentals (As Renter) */}
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  My Bookings
                </span>
                <div style={{ padding: "8px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(14, 165, 233, 0.15)", color: "#0284c7" }}>
                  <CalendarDays size={20} />
                </div>
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--text-main)" }}>
                {renter?.total_bookings || 0}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
                Spent: {formatCurrency(renter?.total_spent)}
              </div>
            </div>
          </div>
        ) : (
          /* RENTER-SPECIFIC 4 METRICS CARDS */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {/* Card 1: Total Machinery Booked */}
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Total Bookings
                </span>
                <div style={{ padding: "8px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(14, 165, 233, 0.15)", color: "#0284c7" }}>
                  <CalendarDays size={20} />
                </div>
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--text-main)" }}>
                {renter?.total_bookings || 0}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
                Lifetime farm equipment rentals
              </div>
            </div>

            {/* Card 2: Active / Approved Bookings */}
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Approved Rentals
                </span>
                <div style={{ padding: "8px", borderRadius: "var(--radius-md)", backgroundColor: "var(--primary-light)", color: "var(--primary)" }}>
                  <CheckCircle size={20} />
                </div>
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--primary)" }}>
                {renter?.approved_bookings || 0}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
                Ready for field operations
              </div>
            </div>

            {/* Card 3: Pending Approval */}
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Pending Requests
                </span>
                <div style={{ padding: "8px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(245, 158, 11, 0.15)", color: "#d97706" }}>
                  <Clock size={20} />
                </div>
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#d97706" }}>
                {renter?.pending_bookings || 0}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
                Awaiting owner confirmation
              </div>
            </div>

            {/* Card 4: Total Spent */}
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Total Rental Spent
                </span>
                <div style={{ padding: "8px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#16a34a" }}>
                  <TrendingUp size={20} />
                </div>
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--primary)" }}>
                {formatCurrency(renter?.total_spent)}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
                {renter?.completed_bookings || 0} completed rentals
              </div>
            </div>
          </div>
        )}

        {/* Activity Feeds: 2 Columns for OWNER, Focused View for RENTER */}
        {user?.role === "OWNER" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "32px",
            }}
            className="dashboard-columns"
          >
            {/* Incoming Booking Requests (Owner Only) */}
            <div className="card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Clock size={18} style={{ color: "var(--primary)" }} /> Incoming Rental Requests
                </h3>
                <Link href="/bookings" className="btn btn-ghost btn-sm" style={{ fontSize: "0.82rem" }}>
                  View All <ArrowUpRight size={14} />
                </Link>
              </div>

              {overview?.recent_requests.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", padding: "16px 0" }}>
                  No active incoming requests on your listings.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {overview?.recent_requests.map((b) => {
                    const badge = getStatusBadge(b.status);
                    return (
                      <div
                        key={b.id}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "var(--radius-md)",
                          backgroundColor: "var(--bg-subtle)",
                          border: "1px solid var(--border)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "12px",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: "700", fontSize: "0.95rem" }}>
                            {b.equipment_detail?.name}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                            Renter: {b.renter.first_name || b.renter.username} &bull; {formatDate(b.start_date)} to {formatDate(b.end_date)}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span className={`badge ${badge.colorClass}`}>{badge.label}</span>
                          <div style={{ fontWeight: "800", color: "var(--primary)", fontSize: "0.95rem" }}>
                            {formatCurrency(b.total_amount)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* My Recent Bookings (Owner also rents sometimes) */}
            <div className="card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
                  <CalendarDays size={18} style={{ color: "var(--primary)" }} /> My Recent Rentals
                </h3>
                <Link href="/bookings" className="btn btn-ghost btn-sm" style={{ fontSize: "0.82rem" }}>
                  View All <ArrowUpRight size={14} />
                </Link>
              </div>

              {overview?.recent_bookings.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", padding: "16px 0" }}>
                  You have not booked any agricultural equipment yet.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {overview?.recent_bookings.map((b) => {
                    const badge = getStatusBadge(b.status);
                    return (
                      <div
                        key={b.id}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "var(--radius-md)",
                          backgroundColor: "var(--bg-subtle)",
                          border: "1px solid var(--border)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "12px",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: "700", fontSize: "0.95rem" }}>
                            {b.equipment_detail?.name}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                            Dates: {formatDate(b.start_date)} &rarr; {formatDate(b.end_date)} ({b.total_days} days)
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span className={`badge ${badge.colorClass}`}>{badge.label}</span>
                          <div style={{ fontWeight: "800", color: "var(--primary)", fontSize: "0.95rem" }}>
                            {formatCurrency(b.total_amount)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* RENTER VIEW: Full-width / 2-Column tailored for Renters */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "32px",
            }}
            className="dashboard-columns"
          >
            {/* My Recent Rentals & Booking Status */}
            <div className="card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
                  <CalendarDays size={18} style={{ color: "var(--primary)" }} /> My Recent Rentals
                </h3>
                <Link href="/bookings" className="btn btn-ghost btn-sm" style={{ fontSize: "0.82rem" }}>
                  View All Bookings <ArrowUpRight size={14} />
                </Link>
              </div>

              {overview?.recent_bookings.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 16px" }}>
                  <Tractor size={40} style={{ color: "var(--text-muted)", opacity: 0.3, margin: "0 auto 12px" }} />
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "16px" }}>
                    You have not rented any agricultural equipment yet.
                  </p>
                  <Link href="/equipment" className="btn btn-primary btn-sm">
                    Browse Equipment Directory &rarr;
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {overview?.recent_bookings.map((b) => {
                    const badge = getStatusBadge(b.status);
                    return (
                      <div
                        key={b.id}
                        style={{
                          padding: "14px 18px",
                          borderRadius: "var(--radius-md)",
                          backgroundColor: "var(--bg-subtle)",
                          border: "1px solid var(--border)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "12px",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: "700", fontSize: "0.98rem", color: "var(--text-main)" }}>
                            {b.equipment_detail?.name}
                          </div>
                          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "3px" }}>
                            Owner: <strong style={{ color: "var(--text-main)" }}>{b.owner_name || "Verified Farmer"}</strong> &bull; {formatDate(b.start_date)} to {formatDate(b.end_date)} ({b.total_days} days)
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span className={`badge ${badge.colorClass}`}>{badge.label}</span>
                          <div style={{ fontWeight: "800", color: "var(--primary)", fontSize: "1rem" }}>
                            {formatCurrency(b.total_amount)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Machinery Finder & Support Card */}
            <div
              className="card"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
                border: "1px solid var(--border)",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <ShieldCheck size={22} style={{ color: "var(--primary)" }} />
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "700" }}>
                    Verified Machinery Assurance
                  </h3>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5", marginBottom: "20px" }}>
                  All tractors, threshers, rotavators, hand tools, and carts on AgriShare are inspected by verified owners. Transparent security deposits and flexible per-day rentals.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-main)" }}>
                    <CheckCircle size={15} style={{ color: "var(--primary)" }} />
                    <span>Real-time instant rental requests & approvals</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-main)" }}>
                    <CheckCircle size={15} style={{ color: "var(--primary)" }} />
                    <span>Verified owner contact numbers for field dispatch</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-main)" }}>
                    <CheckCircle size={15} style={{ color: "var(--primary)" }} />
                    <span>Zero hidden charges & refundable security deposits</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <Link href="/equipment" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  <Tractor size={18} /> Rent More Equipment
                </Link>
                <Link href="/bookings" className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
                  <CalendarDays size={18} /> Manage Bookings
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (min-width: 992px) {
          :global(.dashboard-columns) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
