"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Tractor, Mail, Lock, User, Phone, AlertCircle, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    password_confirm: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (formData.password !== formData.password_confirm) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await register(formData);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--bg-main)",
        minHeight: "calc(100vh - 140px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "540px", padding: "40px 32px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--primary)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 4px 10px var(--primary-glow)",
            }}
          >
            <Tractor size={28} />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--text-main)", marginBottom: "6px" }}>
            Create Your AgriShare Account
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>
            Join our community of farmers and agricultural machinery owners.
          </p>
        </div>

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
              marginBottom: "24px",
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* First & Last Name */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">First Name *</label>
              <input
                type="text"
                name="first_name"
                placeholder="John"
                value={formData.first_name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                name="last_name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Username */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Username *</label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                name="username"
                placeholder="johndoe_farm"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: "38px" }}
                required
              />
              <User size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
            </div>
          </div>

          {/* Email */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Email Address *</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                name="email"
                placeholder="john@farm.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: "38px" }}
                required
              />
              <Mail size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
            </div>
          </div>

          {/* Phone */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Phone Number</label>
            <div style={{ position: "relative" }}>
              <input
                type="tel"
                name="phone_number"
                placeholder="+1 (555) 123-4567"
                value={formData.phone_number}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: "38px" }}
              />
              <Phone size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
            </div>
          </div>

          {/* Passwords */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Password *</label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Min. 8 chars"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  style={{ paddingLeft: "38px" }}
                  required
                />
                <Lock size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Confirm Password *</label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  name="password_confirm"
                  placeholder="Re-enter password"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  className="form-input"
                  style={{ paddingLeft: "38px" }}
                  required
                />
                <Lock size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary btn-lg"
            style={{ width: "100%", marginTop: "12px" }}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--primary)", fontWeight: "700" }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
