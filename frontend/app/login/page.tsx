"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Tractor, Mail, Lock, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, redirectPath, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email address and password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await login({ email: email.trim(), password });
      router.push(redirectPath);
    } catch (err: any) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="card" style={{ width: "100%", maxWidth: "460px", padding: "40px 32px" }}>
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
          Sign In to AgriShare
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>
          Access equipment listings, rental schedules, and bookings.
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

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Email Address</label>
          <div style={{ position: "relative" }}>
            <input
              type="email"
              placeholder="you@farm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              style={{ paddingLeft: "38px" }}
              required
            />
            <Mail size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              style={{ paddingLeft: "38px" }}
              required
            />
            <Lock size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary btn-lg"
          style={{ width: "100%", marginTop: "8px" }}
        >
          {isLoading ? "Signing In..." : "Sign In"}
          {!isLoading && <ArrowRight size={18} />}
        </button>
      </form>

      {/* Demo Fast Login Buttons */}
      <div style={{ marginTop: "32px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "12px" }}>
          <Sparkles size={14} /> Quick Demo Accounts:
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <button
            type="button"
            onClick={() => handleQuickDemo("john.farmer@agrishare.com", "password123")}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: "0.78rem" }}
          >
            Owner (John)
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo("david.miller@agrishare.com", "password123")}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: "0.78rem" }}
          >
            Renter (David)
          </button>
        </div>
      </div>

      <div style={{ marginTop: "24px", textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
        Don&apos;t have an account?{" "}
        <Link href="/register" style={{ color: "var(--primary)", fontWeight: "700" }}>
          Create one free
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
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
      <Suspense fallback={<div className="card" style={{ padding: "40px", textAlign: "center" }}>Loading login...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
