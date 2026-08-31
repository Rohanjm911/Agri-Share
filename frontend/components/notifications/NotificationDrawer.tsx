"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { notificationService } from "@/services/notificationService";
import { Notification } from "@/types";
import { Bell, CheckCheck, Clock, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function NotificationDrawer() {
  const { unreadCount, refreshUnreadCount } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const res = await notificationService.getNotifications();
      setNotifications(res.results);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      fetchNotifications();
    }
    setIsOpen(!isOpen);
  };

  const handleMarkRead = async (id: number, link?: string) => {
    try {
      await notificationService.markRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      refreshUnreadCount();
    } catch {
      // ignore
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      refreshUnreadCount();
    } catch {
      // ignore
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={handleToggle}
        className="btn btn-ghost btn-sm"
        style={{
          position: "relative",
          width: "38px",
          height: "38px",
          padding: "0",
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--border)",
        }}
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              backgroundColor: "#ef4444",
              color: "#ffffff",
              fontSize: "0.68rem",
              fontWeight: "bold",
              borderRadius: "var(--radius-full)",
              minWidth: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
              boxShadow: "0 0 0 2px var(--bg-surface)",
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 100 }}
          />
          <div
            className="card"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              width: "360px",
              maxWidth: "90vw",
              zIndex: 101,
              padding: "16px",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
                paddingBottom: "8px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <h4 style={{ fontSize: "1rem", fontWeight: "700" }}>Notifications</h4>
              {notifications.some((n) => !n.is_read) && (
                <button
                  onClick={handleMarkAllRead}
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: "0.75rem", padding: "2px 6px" }}
                >
                  <CheckCheck size={14} /> Mark all read
                </button>
              )}
            </div>

            {isLoading ? (
              <div style={{ padding: "24px", textAlign: "center", color: "var(--text-muted)" }}>
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div style={{ padding: "24px", textAlign: "center", color: "var(--text-muted)" }}>
                No notifications yet.
              </div>
            ) : (
              <div style={{ maxHeight: "320px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleMarkRead(n.id)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: n.is_read ? "transparent" : "var(--primary-light)",
                      border: `1px solid ${n.is_read ? "var(--border)" : "var(--primary)"}`,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                      <span style={{ fontWeight: n.is_read ? "600" : "700", fontSize: "0.85rem" }}>
                        {n.title}
                      </span>
                      {!n.is_read && (
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--primary)", flexShrink: 0, marginTop: "4px" }} />
                      )}
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                      {n.message}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={12} /> {formatDate(n.created_at)}
                      </span>
                      {n.link && (
                        <Link
                          href={n.link}
                          onClick={() => setIsOpen(false)}
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--primary)",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          View <ExternalLink size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
