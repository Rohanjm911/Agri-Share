import { api } from "@/lib/api";
import { DashboardOverview, DashboardStats } from "@/types";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    return api.get<DashboardStats>("/dashboard/stats/");
  },

  async getOverview(): Promise<DashboardOverview> {
    return api.get<DashboardOverview>("/dashboard/overview/");
  },
};
