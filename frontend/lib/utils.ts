export function formatCurrency(amount: string | number | undefined | null): string {
  if (amount === undefined || amount === null) return "₹0";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(isNaN(num) ? 0 : num);
}

export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function calculateDaysBetween(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return 0;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

export function getConditionColor(condition: string): { bg: string; text: string; border: string } {
  switch (condition) {
    case "NEW":
      return { bg: "rgba(34, 197, 94, 0.15)", text: "#15803d", border: "rgba(34, 197, 94, 0.3)" };
    case "EXCELLENT":
      return { bg: "rgba(14, 165, 233, 0.15)", text: "#0369a1", border: "rgba(14, 165, 233, 0.3)" };
    case "GOOD":
      return { bg: "rgba(234, 179, 8, 0.15)", text: "#a16207", border: "rgba(234, 179, 8, 0.3)" };
    case "FAIR":
      return { bg: "rgba(249, 115, 22, 0.15)", text: "#c2410c", border: "rgba(249, 115, 22, 0.3)" };
    default:
      return { bg: "rgba(100, 116, 139, 0.15)", text: "#475569", border: "rgba(100, 116, 139, 0.3)" };
  }
}

export function getStatusBadge(status: string): { label: string; colorClass: string } {
  switch (status) {
    case "AVAILABLE":
      return { label: "Available Now", colorClass: "badge-success" };
    case "RENTED":
      return { label: "Currently Rented", colorClass: "badge-warning" };
    case "MAINTENANCE":
      return { label: "In Maintenance", colorClass: "badge-danger" };
    case "APPROVED":
      return { label: "Approved", colorClass: "badge-success" };
    case "PENDING":
      return { label: "Pending Approval", colorClass: "badge-warning" };
    case "REJECTED":
      return { label: "Declined", colorClass: "badge-danger" };
    case "CANCELLED":
      return { label: "Cancelled", colorClass: "badge-muted" };
    case "COMPLETED":
      return { label: "Completed", colorClass: "badge-info" };
    default:
      return { label: status, colorClass: "badge-default" };
  }
}
