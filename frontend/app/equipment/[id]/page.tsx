"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { equipmentService } from "@/services/equipmentService";
import { reviewService } from "@/services/reviewService";
import { EquipmentDetail, Review } from "@/types";
import { formatCurrency, formatDate, getConditionColor } from "@/lib/utils";
import { BookingModal } from "@/components/booking/BookingModal";
import { useAuth } from "@/context/AuthContext";
import {
  Tractor,
  MapPin,
  Calendar,
  Shield,
  Star,
  User,
  Phone,
  Mail,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function EquipmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const equipmentId = resolvedParams.id;
  const router = useRouter();
  const { user } = useAuth();

  const [equipment, setEquipment] = useState<EquipmentDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const eqData = await equipmentService.getEquipmentDetail(equipmentId);
        setEquipment(eqData);
        if (eqData.images && eqData.images.length > 0) {
          setSelectedImage(eqData.images[0].image);
        }

        // Fetch reviews
        try {
          const revData = await reviewService.getReviews({ equipment: eqData.id });
          setReviews(revData.results);
        } catch {
          // reviews optional
        }
      } catch (err: any) {
        setError(err.message || "Failed to load equipment details.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [equipmentId]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <Tractor size={48} className="animate-spin" style={{ color: "var(--primary)" }} />
        <p style={{ fontWeight: "600", color: "var(--text-muted)" }}>Loading machinery details...</p>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="container" style={{ paddingTop: "64px", paddingBottom: "64px", textAlign: "center" }}>
        <div className="card" style={{ padding: "48px 24px", maxWidth: "540px", margin: "0 auto" }}>
          <AlertCircle size={48} style={{ color: "#ef4444", margin: "0 auto 16px" }} />
          <h2 style={{ fontSize: "1.4rem", fontWeight: "800", marginBottom: "8px" }}>Equipment Not Found</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>{error || "The requested listing could not be located."}</p>
          <Link href="/equipment" className="btn btn-primary">
            <ChevronLeft size={16} /> Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const condColor = getConditionColor(equipment.condition);
  const isOwner = user?.id === equipment.owner.id;

  return (
    <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", paddingBottom: "96px" }}>
      {/* Top Breadcrumbs */}
      <div style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg-card)", padding: "16px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--text-muted)" }}>
          <Link href="/equipment" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <ChevronLeft size={16} /> Equipment
          </Link>
          <span>/</span>
          <span>{equipment.category?.name || "Machinery"}</span>
          <span>/</span>
          <span style={{ color: "var(--text-main)", fontWeight: "600" }}>{equipment.name}</span>
        </div>
      </div>

      <div className="container" style={{ marginTop: "36px" }}>
        {/* Main Grid: Gallery & Details on left, Rental Booking Card on right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
            alignItems: "flex-start",
          }}
          className="detail-grid"
        >
          {/* Left Column: Gallery & Specifications & Reviews */}
          <div>
            {/* Main Showcase Image */}
            <div
              className="card"
              style={{
                height: "440px",
                position: "relative",
                overflow: "hidden",
                marginBottom: "16px",
                backgroundColor: "var(--bg-subtle)",
              }}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={equipment.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                  <Tractor size={64} style={{ opacity: 0.3, marginBottom: "12px" }} />
                  <span style={{ fontWeight: "600" }}>{equipment.name}</span>
                </div>
              )}

              {/* Status / Condition Badges */}
              <div style={{ position: "absolute", top: "16px", left: "16px", display: "flex", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "700",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: condColor.bg,
                    color: condColor.text,
                    border: `1px solid ${condColor.border}`,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  Condition: {equipment.condition}
                </span>
                <span className="badge badge-success" style={{ backdropFilter: "blur(6px)" }}>
                  {equipment.status}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails if multiple */}
            {equipment.images && equipment.images.length > 1 && (
              <div style={{ display: "flex", gap: "12px", marginBottom: "32px", overflowX: "auto", paddingBottom: "4px" }}>
                {equipment.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.image)}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      border: `2px solid ${selectedImage === img.image ? "var(--primary)" : "var(--border)"}`,
                      padding: 0,
                      cursor: "pointer",
                      backgroundColor: "var(--bg-subtle)",
                      flexShrink: 0,
                    }}
                  >
                    <img src={img.image} alt="Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}

            {/* Title & Location Header */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ fontSize: "0.9rem", color: "var(--primary)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>
                {equipment.brand} &bull; {equipment.category?.name}
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: "800", color: "var(--text-main)", marginBottom: "12px" }}>
                {equipment.name}
              </h1>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin size={18} style={{ color: "var(--primary)" }} /> {equipment.location}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Calendar size={18} style={{ color: "var(--primary)" }} /> Model Year: {equipment.manufacturing_year}
                </span>
                {equipment.total_reviews > 0 && (
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-gold)", fontWeight: "700" }}>
                    <Star size={16} fill="var(--accent-gold)" /> {equipment.average_rating} ({equipment.total_reviews} reviews)
                  </span>
                )}
              </div>
            </div>

            {/* Overview / Description */}
            <div className="card" style={{ padding: "28px", marginBottom: "32px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "14px" }}>Machine Overview & Description</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: "1.75", whiteSpace: "pre-line" }}>
                {equipment.description}
              </p>
            </div>

            {/* Specifications Table */}
            <div className="card" style={{ padding: "28px", marginBottom: "32px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "18px" }}>Technical Specifications</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div style={{ padding: "12px", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Brand / Manufacturer</div>
                  <div style={{ fontSize: "1rem", fontWeight: "700" }}>{equipment.brand}</div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Model</div>
                  <div style={{ fontSize: "1rem", fontWeight: "700" }}>{equipment.model}</div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Year</div>
                  <div style={{ fontSize: "1rem", fontWeight: "700" }}>{equipment.manufacturing_year}</div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Condition</div>
                  <div style={{ fontSize: "1rem", fontWeight: "700" }}>{equipment.condition}</div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Star size={20} fill="var(--accent-gold)" color="var(--accent-gold)" /> Farmer Reviews & Ratings
                </h3>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: "600" }}>
                  {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
                </span>
              </div>

              {reviews.length === 0 ? (
                <div style={{ padding: "24px", textAlign: "center", color: "var(--text-muted)", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-md)" }}>
                  No reviews yet for this machinery. Reviews are left by verified renters after completed field rentals.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      style={{
                        padding: "16px",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: "var(--bg-subtle)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "0.85rem" }}>
                            {r.reviewer?.first_name ? r.reviewer.first_name[0] : "R"}
                          </div>
                          <div>
                            <div style={{ fontWeight: "700", fontSize: "0.92rem" }}>
                              {r.reviewer?.first_name} {r.reviewer?.last_name || r.reviewer?.username}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                              {formatDate(r.created_at)}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "2px" }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={14}
                              fill={r.rating >= s ? "var(--accent-gold)" : "none"}
                              color={r.rating >= s ? "var(--accent-gold)" : "var(--border)"}
                            />
                          ))}
                        </div>
                      </div>
                      <p style={{ color: "var(--text-main)", fontSize: "0.92rem", lineHeight: "1.6" }}>
                        {r.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Pricing & Booking Action Card + Owner Profile */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Booking Pricing Card */}
            <div
              className="card"
              style={{
                padding: "28px",
                boxShadow: "var(--shadow-xl)",
                border: "2px solid var(--primary-light)",
                position: "sticky",
                top: "96px",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>
                  Rental Rate
                </div>
                <div style={{ fontSize: "2rem", fontWeight: "900", color: "var(--primary)" }}>
                  {formatCurrency(equipment.price_per_day)}
                  <span style={{ fontSize: "1rem", fontWeight: "500", color: "var(--text-muted)" }}> / day</span>
                </div>
                {Number(equipment.security_deposit) > 0 && (
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
                    Refundable Security Deposit: <strong>{formatCurrency(equipment.security_deposit)}</strong>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--primary)" }} /> Direct equipment owner coordination
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--primary)" }} /> Flexible multi-day discounts available
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                  <Shield size={16} style={{ color: "var(--primary)" }} /> Damage deposit protection
                </div>
              </div>

              {isOwner ? (
                <div style={{ padding: "14px", textAlign: "center", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-md)", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  This is your equipment listing. You can manage it in your dashboard.
                </div>
              ) : (
                <button
                  onClick={() => setIsBookingOpen(true)}
                  disabled={!equipment.is_available}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%" }}
                >
                  <Tractor size={20} />
                  <span>{equipment.is_available ? "Rent Now" : "Currently Reserved"}</span>
                </button>
              )}
            </div>

            {/* Owner Info Card */}
            <div className="card" style={{ padding: "24px" }}>
              <h4 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "16px" }}>Equipment Owner</h4>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "1.1rem" }}>
                  {equipment.owner.first_name ? equipment.owner.first_name[0] : "O"}
                </div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "1rem" }}>
                    {equipment.owner.first_name} {equipment.owner.last_name || equipment.owner.username}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    Verified Farmer &bull; Member since {new Date(equipment.owner.created_at).getFullYear()}
                  </div>
                </div>
              </div>

              {equipment.owner.bio && (
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
                  &ldquo;{equipment.owner.bio}&rdquo;
                </p>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                {equipment.owner.phone_number && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Phone size={15} style={{ color: "var(--primary)" }} /> {equipment.owner.phone_number}
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Mail size={15} style={{ color: "var(--primary)" }} /> {equipment.owner.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Rental Modal */}
      <BookingModal
        equipment={equipment}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={() => {
          // refresh or state update
        }}
      />

      <style jsx>{`
        @media (min-width: 992px) {
          :global(.detail-grid) {
            grid-template-columns: 1.4fr 0.8fr !important;
          }
        }
      `}</style>
    </div>
  );
}
