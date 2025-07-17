import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => "/auth/profile",
    }),
  }),
});

export const { useLoginMutation, useRegisterUserMutation, useGetProfileQuery } =
  authApi;
