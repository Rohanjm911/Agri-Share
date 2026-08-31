"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import {
  User as UserIcon,
  Lock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Tractor,
  ShieldCheck,
} from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, updateUser } = useAuth();
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    location: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirm: "",
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [passLoading, setPassLoading] = useState(false);
  const [passMessage, setPassMessage] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login?redirect=/profile");
      } else if (user) {
        setProfileData({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          phone_number: user.phone_number || "",
          location: user.location || "",
          bio: user.bio || "",
        });
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage(null);
    setProfileError(null);

    try {
      const updated = await authService.updateProfile({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone_number: profileData.phone_number,
        location: profileData.location,
        bio: profileData.bio,
      });
      updateUser(updated);
      setProfileMessage("Profile updated successfully!");
    } catch (err: any) {
      setProfileError(err.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.new_password_confirm) {
      setPassError("New passwords do not match.");
      return;
    }
    if (passwordData.new_password.length < 8) {
      setPassError("New password must be at least 8 characters long.");
      return;
    }

    setPassLoading(true);
    setPassMessage(null);
    setPassError(null);

    try {
      await authService.changePassword(passwordData);
      setPassMessage("Password changed successfully!");
      setPasswordData({ old_password: "", new_password: "", new_password_confirm: "" });
    } catch (err: any) {
      setPassError(err.message || "Failed to change password.");
    } finally {
      setPassLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Tractor size={40} className="animate-spin" style={{ color: "var(--primary)" }} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", padding: "48px 0 80px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-main)", marginBottom: "6px" }}>
            Account & Profile Settings
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
            Manage your personal farm details, contact credentials, and security.
          </p>
        </div>

        {/* Profile Information Form */}
        <div className="card" style={{ padding: "32px", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-md)", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <UserIcon size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: "700" }}>Farmer & Owner Profile</h2>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>This information is visible on your machinery listings and rental contracts.</p>
            </div>
          </div>

          {profileMessage && (
            <div style={{ padding: "10px 14px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.3)", color: "#15803d", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <CheckCircle2 size={16} /> <span>{profileMessage}</span>
            </div>
          )}

          {profileError && (
            <div style={{ padding: "10px 14px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#dc2626", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <AlertCircle size={16} /> <span>{profileError}</span>
            </div>
          )}

          <form onSubmit={handleProfileSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  value={profileData.first_name}
                  onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  value={profileData.last_name}
                  onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Email Address (Read-Only)</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="form-input"
                  style={{ opacity: 0.7, cursor: "not-allowed" }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={profileData.phone_number}
                  onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Location / Farm Region</label>
              <input
                type="text"
                placeholder="e.g. Des Moines, Iowa"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Farmer Bio</label>
              <textarea
                placeholder="Tell other farmers about your agricultural background and machinery fleet..."
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="form-textarea"
                rows={3}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
              <button type="submit" disabled={profileLoading} className="btn btn-primary">
                {profileLoading ? "Saving..." : "Save Profile Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="card" style={{ padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-md)", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Lock size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: "700" }}>Change Security Password</h2>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Update your account password with standard encryption.</p>
            </div>
          </div>

          {passMessage && (
            <div style={{ padding: "10px 14px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.3)", color: "#15803d", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <CheckCircle2 size={16} /> <span>{passMessage}</span>
            </div>
          )}

          {passError && (
            <div style={{ padding: "10px 14px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#dc2626", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <AlertCircle size={16} /> <span>{passError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Current Password</label>
              <input
                type="password"
                value={passwordData.old_password}
                onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  value={passwordData.new_password}
                  onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  value={passwordData.new_password_confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, new_password_confirm: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
              <button type="submit" disabled={passLoading} className="btn btn-secondary">
                {passLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
