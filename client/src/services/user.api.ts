import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ProfileOutput,
  AuthResult,
  LoginArg,
  LogoutResult,
  SearchResult,
} from "@/types/queries/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_USER_BASE_URL,
  }),
  endpoints: (builder) => ({
    getMyProfile: builder.query<ProfileOutput, void>({
      query: () => ({
        url: `me`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getUserProfile: builder.query<ProfileOutput, string>({
      query: (userId) => ({
        url: `get-user/${userId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    userRegister: builder.mutation<AuthResult, FormData>({
      query: (data) => ({
        url: `register`,
        method: "POST",
        body: data,
        credentials: "include",
        formData: true,
      }),
    }),
    userLogin: builder.mutation<AuthResult, LoginArg>({
      query: ({ email, password }) => ({
        url: `login`,
        method: "POST",
        body: { email, password },
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
    }),
    userLogout: builder.mutation<LogoutResult, void>({
      query: () => ({ url: `logout`, method: "POST", credentials: "include" }),
    }),
    editProfile: builder.mutation<AuthResult, FormData>({
      query: (data) => ({
        url: `edit`,
        method: "PUT",
        body: data,
        credentials: "include",
        formData: true,
      }),
    }),
    followUser: builder.mutation<{ success: boolean }, string>({
      query: (userId) => ({
        url: `follow/${userId}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    unfollowUser: builder.mutation<{ success: boolean }, string>({
      query: (userId) => ({
        url: `unfollow/${userId}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    searchUser: builder.query<SearchResult, string>({
      query: (searchQuery) => ({
        url: `search?q=${searchQuery}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useGetUserProfileQuery,
  useLazySearchUserQuery,
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useEditProfileMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = userApi;
