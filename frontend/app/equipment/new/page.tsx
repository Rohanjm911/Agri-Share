"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { equipmentService } from "@/services/equipmentService";
import { Category } from "@/types";
import {
  Tractor,
  Upload,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  MapPin,
  Calendar,
  Layers,
} from "lucide-react";

export default function NewEquipmentPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState(new Date().getFullYear());
  const [condition, setCondition] = useState("GOOD");
  const [pricePerDay, setPricePerDay] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?redirect=/equipment/new");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    async function loadCats() {
      try {
        const cats = await equipmentService.getCategories();
        setCategories(cats);
        if (cats.length > 0) {
          setCategoryId(cats[0].id);
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    }
    loadCats();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      setError("Please select an equipment category.");
      return;
    }
    if (!pricePerDay || Number(pricePerDay) <= 0) {
      setError("Please specify a valid daily rental price.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", String(categoryId));
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("manufacturing_year", String(manufacturingYear));
      formData.append("condition", condition);
      formData.append("price_per_day", pricePerDay);
      formData.append("security_deposit", securityDeposit || "0");
      formData.append("location", location);
      formData.append("description", description);
      formData.append("is_available", "true");
      formData.append("status", "AVAILABLE");

      // Attach images
      imageFiles.forEach((file) => {
        formData.append("uploaded_images", file);
      });

      const newEq = await equipmentService.createEquipment(formData);
      router.push(`/equipment/${newEq.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to create equipment listing. Please check required fields.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Tractor size={40} className="animate-spin" style={{ color: "var(--primary)" }} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", padding: "48px 0 80px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Tractor size={32} />
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-main)", marginBottom: "8px" }}>
            List Your Agricultural Equipment
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
            Connect with local farmers and earn rental income from your machinery during idle seasons.
          </p>
        </div>

        <div className="card" style={{ padding: "36px" }}>
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
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Listing Title */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Listing Title *</label>
              <input
                type="text"
                placeholder="e.g. John Deere 8R 370 HP Row Crop Tractor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Category & Condition */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Category *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="form-select"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Machinery Condition *</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="form-select"
                >
                  <option value="NEW">New (0-50 hours)</option>
                  <option value="EXCELLENT">Excellent (Field Ready, Low hours)</option>
                  <option value="GOOD">Good (Well Maintained)</option>
                  <option value="FAIR">Fair (Operational, Functional Wear)</option>
                </select>
              </div>
            </div>

            {/* Brand, Model, Year */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Brand / Manufacturer *</label>
                <input
                  type="text"
                  placeholder="e.g. John Deere, Case IH"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Model Number *</label>
                <input
                  type="text"
                  placeholder="e.g. 8R 370"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Manufacturing Year *</label>
                <input
                  type="number"
                  placeholder="e.g. 2022"
                  value={manufacturingYear}
                  onChange={(e) => setManufacturingYear(Number(e.target.value))}
                  className="form-input"
                  min="1970"
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>
            </div>

            {/* Pricing & Location */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Rental Price per Day ($) *</label>
                <input
                  type="number"
                  placeholder="e.g. 450"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(e.target.value)}
                  className="form-input"
                  min="1"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Security Deposit ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(e.target.value)}
                  className="form-input"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Equipment Location *</label>
                <input
                  type="text"
                  placeholder="City, State (e.g. Ames, Iowa)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Machine Description */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Detailed Description & Specifications *</label>
              <textarea
                placeholder="Describe horsepower, GPS guidance systems, tire conditions, attachment hookups, maintenance history, and pickup instructions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                rows={5}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Equipment Photos</label>
              <div
                style={{
                  border: "2px dashed var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "24px",
                  textAlign: "center",
                  backgroundColor: "var(--bg-subtle)",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="equipment-images-input"
                />
                <label htmlFor="equipment-images-input" style={{ cursor: "pointer", display: "block" }}>
                  <Upload size={32} style={{ color: "var(--primary)", margin: "0 auto 8px" }} />
                  <div style={{ fontWeight: "600", fontSize: "0.95rem", color: "var(--text-main)" }}>
                    Click to select machine photos
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                    PNG, JPG, WEBP up to 10MB each
                  </div>
                </label>
              </div>

              {imageFiles.length > 0 && (
                <div style={{ marginTop: "12px", fontSize: "0.85rem", color: "var(--primary)", fontWeight: "600" }}>
                  ✓ {imageFiles.length} {imageFiles.length === 1 ? "photo" : "photos"} selected ready for upload
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end", marginTop: "12px" }}>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
                style={{ minWidth: "180px" }}
              >
                {isSubmitting ? "Publishing Listing..." : "Publish Listing"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
