import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_POST_BASE_URL,
  }),
  endpoints: (builder) => ({
    sharePost: builder.mutation({
      query: (data) => ({
        url: `new`,
        method: "POST",
        body: data,
        credentials: "include",
        formData: true,
      }),
    }),
    getAllPosts: builder.query({
      query: (postLimit) => ({
        url: `all?feedPostLimit=${postLimit}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    postLike: builder.mutation({
      query: (postId) => ({
        url: `like/${postId}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    postDislike: builder.mutation({
      query: (postId) => ({
        url: `dislike/${postId}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    bookmark: builder.mutation({
      query: ({ postId, action }) => ({
        url: `bookmark/${postId}`,
        body: { action },
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSharePostMutation,
  useGetAllPostsQuery,
  usePostLikeMutation,
  useBookmarkMutation,
  usePostDislikeMutation,
} = postApi;
