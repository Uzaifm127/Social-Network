import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_COMMENT_BASE_URL,
  }),
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: ({ postId, commentMessage }) => ({
        url: `add-comment?postId=${postId}`,
        method: "POST",
        body: { commentMessage },
        credentials: "include",
      }),
    }),
    replyComment: builder.mutation({
      query: () => ({
        url: `reply-comment`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    getComments: builder.query({
      query: (postId) => ({
        url: `get?postId=${postId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    likeComment: builder.mutation({
      query: (commentId) => ({
        url: `like/${commentId}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    dislikeComment: builder.mutation({
      query: (commentId) => ({
        url: `dislike/${commentId}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAddCommentMutation,
  useReplyCommentMutation,
  useGetCommentsQuery,
  useDislikeCommentMutation,
  useLikeCommentMutation,
} = commentApi;
