"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { equipmentService } from "@/services/equipmentService";
import { Category, EquipmentListItem, PaginatedResponse } from "@/types";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Tractor,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Wrench,
  Eye,
  ShieldCheck,
} from "lucide-react";

export default function EquipmentCatalogPage() {
  const { user, isAuthenticated } = useAuth();
  const [equipmentList, setEquipmentList] = useState<EquipmentListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("-created_at");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Fetch Categories once
  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await equipmentService.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    loadCategories();
  }, []);

  const fetchEquipment = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params: any = {
        page: currentPage,
        ordering: sortBy,
      };
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (selectedCategory) params.category_slug = selectedCategory;
      if (selectedCondition) params.condition = selectedCondition;
      if (locationQuery.trim()) params.location = locationQuery.trim();
      if (maxPrice) params.max_price = Number(maxPrice);
      if (isAuthenticated && user?.id) {
        params.exclude_owner = user.id;
      }

      const res = await equipmentService.getEquipmentList(params);
      // Double check client-side filtering so current owner NEVER sees their own listings in browse mode
      const filtered = (res.results || []).filter(
        (item) => !isAuthenticated || !user?.id || item.owner_id !== user.id
      );
      setEquipmentList(filtered);
      setTotalCount(res.count);
    } catch (err: any) {
      setError(err.message || "Failed to load equipment catalog.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, sortBy, searchQuery, selectedCategory, selectedCondition, locationQuery, maxPrice, isAuthenticated, user]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchEquipment();
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedCondition("");
    setLocationQuery("");
    setMaxPrice("");
    setSortBy("-created_at");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / 12) || 1;

  return (
    <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Page Header */}
      <section
        style={{
          backgroundColor: "var(--bg-card)",
          borderBottom: "1px solid var(--border)",
          padding: "48px 0 36px",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.5rem)",
              fontWeight: "800",
              color: "var(--text-main)",
              marginBottom: "8px",
            }}
          >
            Agricultural Equipment Directory
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: "680px" }}>
            Search tractors, harvesters, seeders, and tillage implements from verified local farm owners.
          </p>

          {isAuthenticated && (
            <div
              style={{
                marginTop: "16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 16px",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--primary-light)",
                border: "1px solid rgba(46, 125, 50, 0.2)",
                fontSize: "0.86rem",
                color: "var(--primary)",
                fontWeight: "500",
              }}
            >
              <Eye size={16} />
              <span>
                Browsing machinery from fellow farmers. Your own equipment listings are hidden here.
              </span>
              <Link
                href="/my-equipment"
                style={{
                  textDecoration: "underline",
                  fontWeight: "700",
                  marginLeft: "4px",
                  color: "var(--primary)",
                }}
              >
                View My Equipment &rarr;
              </Link>
            </div>
          )}

          {/* Quick Category Slide Switcher with Scroll Controls */}
          <div
            style={{
              position: "relative",
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Scroll Left Button */}
            <button
              onClick={() => {
                const el = document.getElementById("category-slide-container");
                if (el) el.scrollBy({ left: -260, behavior: "smooth" });
              }}
              aria-label="Slide Left"
              className="btn btn-secondary btn-sm category-nav-arrow"
              style={{
                position: "absolute",
                left: "-12px",
                zIndex: 10,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--bg-card)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "1px solid var(--border)",
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Scrollable Track */}
            <div
              id="category-slide-container"
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                padding: "6px 28px",
                width: "100%",
                maskImage: "linear-gradient(to right, transparent, black 28px, black calc(100% - 28px), transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 28px, black calc(100% - 28px), transparent 100%)",
              }}
            >
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setCurrentPage(1);
                }}
                className={`btn btn-sm ${selectedCategory === "" ? "btn-primary" : "btn-secondary"}`}
                style={{
                  borderRadius: "var(--radius-full)",
                  flexShrink: 0,
                  fontWeight: selectedCategory === "" ? "700" : "500",
                  padding: "8px 18px",
                  boxShadow: selectedCategory === "" ? "0 2px 8px rgba(46, 125, 50, 0.35)" : "none",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontSize: "0.88rem",
                }}
              >
                All Machinery
              </button>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setCurrentPage(1);
                    }}
                    className={`btn btn-sm ${isActive ? "btn-primary" : "btn-secondary"}`}
                    style={{
                      borderRadius: "var(--radius-full)",
                      flexShrink: 0,
                      fontWeight: isActive ? "700" : "500",
                      padding: "8px 18px",
                      boxShadow: isActive ? "0 2px 8px rgba(46, 125, 50, 0.35)" : "none",
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      fontSize: "0.88rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Scroll Right Button */}
            <button
              onClick={() => {
                const el = document.getElementById("category-slide-container");
                if (el) el.scrollBy({ left: 260, behavior: "smooth" });
              }}
              aria-label="Slide Right"
              className="btn btn-secondary btn-sm category-nav-arrow"
              style={{
                position: "absolute",
                right: "-12px",
                zIndex: 10,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--bg-card)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "1px solid var(--border)",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content: Filters + Equipment Grid */}
      <div className="container" style={{ marginTop: "36px" }}>
        {/* Search & Sort Controls Bar */}
        <div
          className="card"
          style={{
            padding: "16px 20px",
            marginBottom: "32px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: "flex",
              flex: "1 1 320px",
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Search by name, brand, model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: "40px", height: "44px" }}
            />
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "14px",
                top: "13px",
                color: "var(--text-muted)",
              }}
            />
          </form>

          {/* Controls Right */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Mobile filter button toggle */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="btn btn-secondary btn-sm"
              style={{ display: "inline-flex" }}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="form-select"
                style={{ width: "auto", height: "40px", fontSize: "0.88rem", padding: "6px 12px" }}
              >
                <option value="-created_at">Newest Listings</option>
                <option value="price_per_day">Price: Low to High</option>
                <option value="-price_per_day">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters & Main Listing */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "32px",
          }}
          className="catalog-layout"
        >
          {/* Filters Sidebar */}
          <aside
            className={`card ${showFiltersMobile ? "mobile-filters-visible" : ""}`}
            style={{
              padding: "24px",
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
                <Filter size={18} style={{ color: "var(--primary)" }} /> Refine Results
              </h3>
              <button
                onClick={handleResetFilters}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: "0.75rem", padding: "4px 8px" }}
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="form-select"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Location / State</label>
              <input
                type="text"
                placeholder="e.g. Iowa, Nebraska, Ames"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Condition Filter */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Equipment Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => {
                  setSelectedCondition(e.target.value);
                  setCurrentPage(1);
                }}
                className="form-select"
              >
                <option value="">Any Condition</option>
                <option value="NEW">New</option>
                <option value="EXCELLENT">Excellent</option>
                <option value="GOOD">Good</option>
                <option value="FAIR">Fair</option>
              </select>
            </div>

            {/* Max Daily Price Filter */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Max Price / Day (₹)</label>
              <input
                type="number"
                placeholder="e.g. 5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="form-input"
                min="0"
              />
            </div>
          </aside>

          {/* Results Grid */}
          <main>
            {isLoading ? (
              <div style={{ padding: "80px 20px", textAlign: "center", color: "var(--text-muted)" }}>
                <Tractor size={48} className="animate-spin" style={{ margin: "0 auto 16px", color: "var(--primary)" }} />
                <p style={{ fontSize: "1.1rem", fontWeight: "600" }}>Loading agricultural machinery...</p>
              </div>
            ) : error ? (
              <div
                className="card"
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  borderColor: "#ef4444",
                  backgroundColor: "rgba(239, 68, 68, 0.05)",
                }}
              >
                <AlertCircle size={40} style={{ color: "#ef4444", margin: "0 auto 12px" }} />
                <h3 style={{ color: "#dc2626", marginBottom: "8px" }}>Error Loading Equipment</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>{error}</p>
                <button onClick={fetchEquipment} className="btn btn-primary btn-sm">
                  Retry
                </button>
              </div>
            ) : equipmentList.length === 0 ? (
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
                <Tractor size={56} style={{ color: "var(--text-muted)", opacity: 0.4, marginBottom: "16px" }} />
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "8px" }}>
                  No Equipment Found
                </h3>
                <p style={{ color: "var(--text-muted)", maxWidth: "420px", marginBottom: "24px" }}>
                  We couldn&apos;t find any agricultural equipment matching your specific filter criteria.
                </p>
                <button onClick={handleResetFilters} className="btn btn-secondary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "16px", fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: "500" }}>
                  Showing {equipmentList.length} of {totalCount} equipment listings
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "24px",
                    marginBottom: "40px",
                  }}
                >
                  {equipmentList.map((eq) => (
                    <EquipmentCard key={eq.id} equipment={eq} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      marginTop: "32px",
                    }}
                  >
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="btn btn-secondary btn-sm"
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>
                    <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--text-muted)" }}>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="btn btn-secondary btn-sm"
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          :global(.catalog-layout) {
            grid-template-columns: 280px 1fr !important;
          }
        }
        :global(.category-nav-arrow) {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          color: var(--text-main);
        }
        :global(.category-nav-arrow:hover) {
          transform: scale(1.12);
          background-color: var(--primary) !important;
          color: #ffffff !important;
          border-color: var(--primary) !important;
          box-shadow: 0 6px 16px rgba(46, 125, 50, 0.35) !important;
        }
        :global(.category-nav-arrow:active) {
          transform: scale(0.95);
        }
        #category-slide-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
