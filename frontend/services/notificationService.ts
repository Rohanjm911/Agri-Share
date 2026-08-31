import { api } from "@/lib/api";
import { Notification, PaginatedResponse } from "@/types";

export const notificationService = {
  async getNotifications(page = 1): Promise<PaginatedResponse<Notification>> {
    const res = await api.get<PaginatedResponse<Notification> | Notification[]>("/notifications/", {
      page,
    });
    if (Array.isArray(res)) {
      return { count: res.length, next: null, previous: null, results: res };
    }
    return res;
  },

  async markRead(id: number): Promise<Notification> {
    return api.post<Notification>(`/notifications/${id}/mark_read/`);
  },

  async markAllRead(): Promise<{ message: string }> {
    return api.post<{ message: string }>("/notifications/mark_all_read/");
  },

  async getUnreadCount(): Promise<{ unread_count: number }> {
    return api.get<{ unread_count: number }>("/notifications/unread_count/");
  },
};
