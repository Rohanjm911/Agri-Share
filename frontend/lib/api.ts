const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Format DRF error response into a clean readable string
 */
export function formatErrorMessage(error: any): string {
  if (!error) return "An unexpected error occurred.";
  if (typeof error === "string") return error;
  if (error.message && typeof error.message === "string" && !error.data) return error.message;

  const data = error.data || error;
  if (typeof data === "string") return data;
  if (data.detail && typeof data.detail === "string") return data.detail;
  if (data.error && typeof data.error === "string") return data.error;

  // Handle Django REST Framework field errors dictionary
  if (typeof data === "object") {
    const messages: string[] = [];
    for (const [key, value] of Object.entries(data)) {
      const field = key === "non_field_errors" || key === "__all__" ? "" : `${key}: `;
      if (Array.isArray(value)) {
        messages.push(`${field}${value.join(" ")}`);
      } else if (typeof value === "string") {
        messages.push(`${field}${value}`);
      } else if (typeof value === "object" && value !== null) {
        messages.push(`${field}${JSON.stringify(value)}`);
      }
    }
    if (messages.length > 0) return messages.join(" | ");
  }

  return error.message || "An unexpected error occurred.";
}

/**
 * Safe local storage token helpers
 */
export const tokenStorage = {
  getAccess: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("agrishare_access_token");
  },
  getRefresh: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("agrishare_refresh_token");
  },
  setTokens: (access: string, refresh: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("agrishare_access_token", access);
    localStorage.setItem("agrishare_refresh_token", refresh);
  },
  clearTokens: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("agrishare_access_token");
    localStorage.removeItem("agrishare_refresh_token");
    localStorage.removeItem("agrishare_user");
  },
};

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

/**
 * Core API fetch wrapper with token injection and automatic 401 refresh handling
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers = {}, ...customConfig } = options;

  let url = `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        searchParams.append(key, String(val));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `${url.includes("?") ? "&" : "?"}${queryString}`;
    }
  }

  const token = tokenStorage.getAccess();
  const requestHeaders: HeadersInit = {
    ...(!(customConfig.body instanceof FormData) && {
      "Content-Type": "application/json",
    }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers,
  };

  try {
    const response = await fetch(url, {
      ...customConfig,
      headers: requestHeaders,
    });

    // Handle Token Expired (401) and attempt refresh
    if (response.status === 401 && tokenStorage.getRefresh()) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refresh = tokenStorage.getRefresh();
          const refreshRes = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
          });

          if (!refreshRes.ok) {
            tokenStorage.clearTokens();
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("agrishare_logout"));
            }
            throw new ApiError(401, "Session expired. Please log in again.");
          }

          const refreshData = await refreshRes.json();
          const newAccess = refreshData.access;
          tokenStorage.setTokens(newAccess, refresh!);
          isRefreshing = false;
          onRefreshed(newAccess);
        } catch (err) {
          isRefreshing = false;
          tokenStorage.clearTokens();
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("agrishare_logout"));
          }
          throw err;
        }
      }

      // Retry request once refreshed
      return new Promise<T>((resolve) => {
        subscribeTokenRefresh((newToken: string) => {
          (requestHeaders as Record<string, string>)["Authorization"] = `Bearer ${newToken}`;
          resolve(
            fetch(url, { ...customConfig, headers: requestHeaders }).then(async (res) => {
              if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new ApiError(res.status, formatErrorMessage(errData), errData);
              }
              if (res.status === 204) return {} as T;
              return res.json();
            })
          );
        });
      });
    }

    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(response.status, formatErrorMessage(data), data);
    }

    return data as T;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(0, error.message || "Network error. Please check your connection.");
  }
}

export const api = {
  get: <T = any>(endpoint: string, params?: Record<string, any>, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { method: "GET", params, ...options }),

  post: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options,
    }),

  put: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options,
    }),

  patch: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options,
    }),

  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { method: "DELETE", ...options }),
};
