import { baseApi } from "../../api/baseApi";
import { setUser, logout } from "./authSlice";

// Helper function to decode JWT token
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      any,
      { name: string; email: string; password: string }
    >({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Extract token from nested data structure
          const token =
            data.data?.token ||
            data.token ||
            data.access_token ||
            data.accessToken;

          if (token) {
            // Decode JWT to get user info
            const decodedToken = decodeJWT(token);

            dispatch(
              setUser({
                user: decodedToken || {
                  userId: decodedToken?.id,
                  email: decodedToken?.email,
                  role: decodedToken?.role,
                  exp: decodedToken?.exp,
                  iat: decodedToken?.iat,
                },
                email: decodedToken?.email || arg.email,
                token: token,
              })
            );
          }
        } catch (error) {
          console.error("Registration error:", error);
        }
      },
    }),

    login: builder.mutation<
      any,
      { email: string; password: string; remember?: boolean }
    >({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Extract token from the nested response structure
          const token =
            data.data?.token ||
            data.token ||
            data.access_token ||
            data.accessToken;

          if (token) {
            // Decode JWT to extract user information
            const decodedToken = decodeJWT(token);

            if (decodedToken) {
              // Create user object from decoded token
              const userFromToken = {
                userId: decodedToken.id,
                email: decodedToken.email,
                role: decodedToken.role,
                exp: decodedToken.exp,
                iat: decodedToken.iat,
              };

              dispatch(
                setUser({
                  user: userFromToken,
                  email: decodedToken.email || arg.email,
                  token: token,
                })
              );
            } else {
              // Fallback if token decode fails
              dispatch(
                setUser({
                  user: {
                    userId: "",
                    email: arg.email,
                    role: "USER",
                    exp: 0,
                    iat: 0,
                  },
                  email: arg.email,
                  token: token,
                })
              );
            }
          } else {
            console.warn("No token found in login response");
            throw new Error("No authentication token received");
          }
        } catch (error) {
          console.error("Login failed:", error);
          dispatch(logout());
        }
      },
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query({
      query: () => "/auth/profile",
      providesTags: ["User"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error: any) {
          if (error?.error?.status === 401) {
            dispatch(logout());
          }
        }
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(logout());

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Logout API error:", error);
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useGetProfileQuery,
  useLogoutUserMutation,
} = authApi;
