import { api, tokenStorage } from "@/lib/api";
import { AuthResponse, User } from "@/types";

export const authService = {
  async register(data: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    password: string;
    password_confirm: string;
  }): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/register/", data);
    if (res.access && res.refresh) {
      tokenStorage.setTokens(res.access, res.refresh);
      localStorage.setItem("agrishare_user", JSON.stringify(res.user));
    }
    return res;
  },

  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/login/", credentials);
    if (res.access && res.refresh) {
      tokenStorage.setTokens(res.access, res.refresh);
      localStorage.setItem("agrishare_user", JSON.stringify(res.user));
    }
    return res;
  },

  async getProfile(): Promise<User> {
    return api.get<User>("/auth/profile/");
  },

  async updateProfile(data: Partial<User> | FormData): Promise<User> {
    return api.patch<User>("/auth/profile/", data);
  },

  async changePassword(data: {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
  }): Promise<{ message: string }> {
    return api.post<{ message: string }>("/auth/change-password/", data);
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout/");
    } catch {
      // Ignore network errors on logout
    } finally {
      tokenStorage.clearTokens();
    }
  },
};
