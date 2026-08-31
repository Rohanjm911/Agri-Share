import { api } from "@/lib/api";
import { PaginatedResponse, Review, ReviewCreatePayload } from "@/types";

export const reviewService = {
  async getReviews(params?: {
    equipment?: number;
    reviewer?: number;
    rating?: number;
    page?: number;
  }): Promise<PaginatedResponse<Review>> {
    const res = await api.get<PaginatedResponse<Review> | Review[]>("/reviews/", params);
    if (Array.isArray(res)) {
      return { count: res.length, next: null, previous: null, results: res };
    }
    return res;
  },

  async submitReview(payload: ReviewCreatePayload): Promise<Review> {
    return api.post<Review>("/reviews/", payload);
  },

  async deleteReview(id: number): Promise<void> {
    return api.delete(`/reviews/${id}/`);
  },
};
