import { api } from "@/lib/api";
import { Booking, BookingCreatePayload, PaginatedResponse } from "@/types";

export const bookingService = {
  async getBookings(params?: {
    role?: "renter" | "owner";
    status?: string;
    page?: number;
  }): Promise<PaginatedResponse<Booking>> {
    const res = await api.get<PaginatedResponse<Booking> | Booking[]>("/bookings/", params);
    if (Array.isArray(res)) {
      return { count: res.length, next: null, previous: null, results: res };
    }
    return res;
  },

  async getBookingDetail(id: number): Promise<Booking> {
    return api.get<Booking>(`/bookings/${id}/`);
  },

  async createBooking(payload: BookingCreatePayload): Promise<Booking> {
    return api.post<Booking>("/bookings/", payload);
  },

  async approveBooking(id: number): Promise<Booking> {
    return api.post<Booking>(`/bookings/${id}/approve/`);
  },

  async rejectBooking(id: number): Promise<Booking> {
    return api.post<Booking>(`/bookings/${id}/reject/`);
  },

  async cancelBooking(id: number): Promise<Booking> {
    return api.post<Booking>(`/bookings/${id}/cancel/`);
  },

  async completeBooking(id: number): Promise<Booking> {
    return api.post<Booking>(`/bookings/${id}/complete/`);
  },
};
