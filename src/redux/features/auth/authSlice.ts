import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
};

export type TAuth = {
  name: null | TUser;
  email: null | string;
  token: null | string;
};

// Function to get initial state from localStorage
const getInitialState = (): TAuth => {
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("userEmail");
      const userData = localStorage.getItem("userData");

      return {
        token: token || null,
        email: email || null,
        name: userData ? JSON.parse(userData) : null,
      };
    } catch (error) {
      console.error("Error loading auth data from localStorage:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userData");
    }
  }

  return {
    name: null,
    email: null,
    token: null,
  };
};

const initialState: TAuth = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: TUser; email: string; token: string }>
    ) => {
      const { user, email, token } = action.payload;

      state.token = token;
      state.name = user;
      state.email = email;

      // Store in localStorage
      if (typeof window !== "undefined") {
        try {
          if (token) {
            localStorage.setItem("authToken", token);
          }
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userData", JSON.stringify(user));
        } catch (error) {
          console.error("Error storing auth data to localStorage:", error);
        }
      }
    },

    logout: (state) => {
      state.name = null;
      state.email = null;
      state.token = null;

      // Clear localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userData");
        } catch (error) {
          console.error("Error clearing auth data from localStorage:", error);
        }
      }
    },

    clearToken: (state) => {
      state.token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
      }
    },
  },
});

export const { setUser, logout, clearToken } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.name;
export const selectCurrentEmail = (state: RootState) => state.auth.email;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
