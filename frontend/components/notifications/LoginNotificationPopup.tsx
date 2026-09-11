"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { notificationService } from "@/services/notificationService";
import { Notification } from "@/types";
import {
  CheckCircle2,
  XCircle,
  X,
  ArrowRight,
  Sparkles,
  Tractor,
} from "lucide-react";

export function LoginNotificationPopup() {
  const { user, isAuthenticated, refreshUnreadCount } = useAuth();
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setActiveNotification(null);
      setIsVisible(false);
      return;
    }

    let isMounted = true;

    // Check for recent approval/rejection notifications upon login
    const checkRentalDecisions = async () => {
      try {
        const res = await notificationService.getNotifications(1);
        if (!isMounted) return;

        const results = res.results || [];

        // Find unread or recent booking approval or rejection notifications
        const decisionNotif = results.find(
          (n) =>
            !n.is_read &&
            (n.notification_type === "BOOKING_APPROVED" ||
              n.notification_type === "BOOKING_REJECTED")
        );

        if (decisionNotif) {
          // Check session storage so user isn't spammed multiple times in same session unless new
          const shownKey = `shown_notif_${user.id}_${decisionNotif.id}`;
          if (!sessionStorage.getItem(shownKey)) {
            sessionStorage.setItem(shownKey, "true");
            setActiveNotification(decisionNotif);
            // Slight delay so the page settles after login before popup animates in
            setTimeout(() => {
              if (isMounted) setIsVisible(true);
            }, 600);
          }
        }
      } catch {
        // ignore error
      }
    };

    checkRentalDecisions();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user]);

  const handleDismiss = async () => {
    setIsVisible(false);
    if (activeNotification) {
      try {
        await notificationService.markRead(activeNotification.id);
        refreshUnreadCount();
      } catch {
        // ignore
      }
    }
  };

  if (!activeNotification || !isVisible) {
    return null;
  }

  const isApproved = activeNotification.notification_type === "BOOKING_APPROVED";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        maxWidth: "420px",
        width: "calc(100vw - 40px)",
        animation: "modalScaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="card glass-panel"
        style={{
          padding: "20px 22px",
          borderRadius: "var(--radius-lg)",
          boxShadow: isApproved
            ? "0 20px 40px -8px rgba(16, 185, 129, 0.25), 0 8px 16px rgba(0, 0, 0, 0.3)"
            : "0 20px 40px -8px rgba(239, 68, 68, 0.25), 0 8px 16px rgba(0, 0, 0, 0.3)",
          border: isApproved
            ? "1px solid rgba(16, 185, 129, 0.35)"
            : "1px solid rgba(239, 68, 68, 0.35)",
          backgroundColor: "var(--bg-glass-card)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>

        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
          {/* Status Icon */}
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              backgroundColor: isApproved
                ? "rgba(16, 185, 129, 0.15)"
                : "rgba(239, 68, 68, 0.15)",
              color: isApproved ? "var(--primary)" : "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {isApproved ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
          </div>

          <div style={{ flex: 1, paddingRight: "16px" }}>
            {/* Top pill badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <span
                className={isApproved ? "badge badge-success" : "badge badge-danger"}
                style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: "9999px" }}
              >
                {isApproved ? "Request Approved" : "Request Declined"}
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "600" }}>
                Owner Update
              </span>
            </div>

            <h4
              style={{
                fontSize: "0.98rem",
                fontWeight: "800",
                color: "var(--text-main)",
                marginBottom: "4px",
                lineHeight: "1.3",
              }}
            >
              {activeNotification.title}
            </h4>

            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                lineHeight: "1.5",
                marginBottom: "14px",
              }}
            >
              {activeNotification.message}
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link
                href="/bookings"
                onClick={handleDismiss}
                className={isApproved ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
                style={{
                  borderRadius: "9999px",
                  fontSize: "0.78rem",
                  padding: "5px 14px",
                  height: "32px",
                }}
              >
                <Tractor size={14} />
                <span>View My Bookings</span>
                <ArrowRight size={13} />
              </Link>

              <button
                onClick={handleDismiss}
                className="btn btn-ghost btn-sm"
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  padding: "5px 10px",
                  height: "32px",
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
