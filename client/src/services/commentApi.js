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
  }),
});

export const { useAddCommentMutation } = commentApi;
