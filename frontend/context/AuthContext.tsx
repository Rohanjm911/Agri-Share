"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, AuthResponse } from "@/types";
import { authService } from "@/services/authService";
import { notificationService } from "@/services/notificationService";
import { tokenStorage } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  unreadCount: number;
  login: (credentials: { email: string; password: string }) => Promise<AuthResponse>;
  register: (data: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    password: string;
    password_confirm: string;
  }) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateUser: (updatedData: Partial<User>) => void;
  refreshUnreadCount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = useCallback(async () => {
    if (!tokenStorage.getAccess()) return;
    try {
      const res = await notificationService.getUnreadCount();
      setUnreadCount(res.unread_count);
    } catch {
      // Ignore background notification errors
    }
  }, []);

  const loadCurrentUser = useCallback(async () => {
    const token = tokenStorage.getAccess();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    // Attempt to load cached user first
    const cachedUser = localStorage.getItem("agrishare_user");
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch {
        // invalid json
      }
    }

    try {
      const profile = await authService.getProfile();
      setUser(profile);
      localStorage.setItem("agrishare_user", JSON.stringify(profile));
      refreshUnreadCount();
    } catch {
      // If profile fetch fails completely, clear invalid tokens
      tokenStorage.clearTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [refreshUnreadCount]);

  useEffect(() => {
    loadCurrentUser();

    const handleLogoutEvent = () => {
      setUser(null);
      setUnreadCount(0);
    };

    window.addEventListener("agrishare_logout", handleLogoutEvent);
    return () => {
      window.removeEventListener("agrishare_logout", handleLogoutEvent);
    };
  }, [loadCurrentUser]);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await authService.login(credentials);
      setUser(res.user);
      refreshUnreadCount();
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    password: string;
    password_confirm: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await authService.register(data);
      setUser(res.user);
      refreshUnreadCount();
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setUnreadCount(0);
      setIsLoading(false);
    }
  };

  const updateUser = (updatedData: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedData };
      localStorage.setItem("agrishare_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        unreadCount,
        login,
        register,
        logout,
        updateUser,
        refreshUnreadCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
