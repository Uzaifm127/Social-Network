import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_USER_BASE_URL,
  }),
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: `me`,
        method: "GET",
        credentials: "include",
      }),
    }),
    userRegister: builder.mutation({
      query: (data) => ({
        url: `register`,
        method: "POST",
        body: data,
        credentials: "include",
        formData: true,
      }),
    }),
    userLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: `login`,
        method: "POST",
        body: { email, password },
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
    }),
    userLogout: builder.mutation({
      query: () => ({ url: `logout`, method: "POST", credentials: "include" }),
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: `edit`,
        method: "PUT",
        body: data,
        credentials: "include",
        formData: true,
      }),
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useEditProfileMutation,
} = userApi;
