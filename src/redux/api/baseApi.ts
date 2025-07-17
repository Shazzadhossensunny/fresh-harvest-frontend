import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logout, setUser } from '../features/auth/authSlice';

import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://code-commando.com/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("authorization", `${token}`);
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["User"],
});
