"use client";

import React, { useState } from "react";
import { reviewService } from "@/services/reviewService";
import { Booking } from "@/types";
import { X, Star, AlertCircle, CheckCircle2 } from "lucide-react";

interface ReviewModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ReviewModal({ booking, isOpen, onClose, onSuccess }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please provide feedback in your review comment.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await reviewService.submitReview({
        booking: booking.id,
        rating,
        comment: comment.trim(),
      });
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: "32px", maxWidth: "500px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--text-main)" }}>
              Rate Your Rental Experience
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {booking.equipment_detail.name}
            </p>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ padding: "6px" }}>
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: "center", padding: "28px 16px" }}>
            <CheckCircle2 size={48} style={{ color: "var(--primary)", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "8px" }}>
              Thank You For Your Feedback!
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "24px" }}>
              Your verified review helps other farmers discover quality machinery.
            </p>
            <button onClick={onClose} className="btn btn-primary">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div
                style={{
                  padding: "10px 14px",
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
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Star Rating Picker */}
            <div className="form-group" style={{ alignItems: "center", textAlign: "center", marginBottom: "24px" }}>
              <label className="form-label" style={{ marginBottom: "8px" }}>
                Overall Equipment Rating
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        transition: "transform 0.1s",
                      }}
                    >
                      <Star
                        size={32}
                        fill={isFilled ? "var(--accent-gold)" : "none"}
                        color={isFilled ? "var(--accent-gold)" : "var(--border)"}
                      />
                    </button>
                  );
                })}
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)", marginTop: "6px" }}>
                {rating === 5 && "Outstanding - 5 Stars"}
                {rating === 4 && "Great - 4 Stars"}
                {rating === 3 && "Good - 3 Stars"}
                {rating === 2 && "Fair - 2 Stars"}
                {rating === 1 && "Poor - 1 Star"}
              </span>
            </div>

            {/* Comment Textarea */}
            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label className="form-label">Review Details</label>
              <textarea
                placeholder="Share details on equipment performance, machine cleanliness, fuel efficiency, or owner communication..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-textarea"
                rows={4}
                required
              />
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ minWidth: "140px" }}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
