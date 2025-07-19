import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, clearToken } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://code-commando.com/api/v1",
  credentials: "omit", // Keep this to avoid CORS issues
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state first
    let token = (getState() as RootState).auth.token;

    // Fallback to localStorage if not in Redux
    if (!token && typeof window !== "undefined") {
      token = localStorage.getItem("authToken");
    }

    if (token) {
      // Add Bearer prefix if not present
      const authHeader = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
      headers.set("authorization", authHeader);
    }

    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

// Enhanced base query with automatic token refresh/logout handling
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 errors (unauthorized)
  if (result.error && result.error.status === 401) {
    console.warn("Token expired or invalid, logging out...");

    // Clear invalid token and logout user
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["User", "Products", "Category"],
});
