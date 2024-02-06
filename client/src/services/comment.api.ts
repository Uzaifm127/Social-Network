import {
  AddCommentArg,
  ReplyArg,
  AllCommentsType,
} from "@/types/queries/comments";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SimpleResponse } from "@/types/index";
import { ServerErrorType } from "@/types/queries/posts";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_COMMENT_BASE_URL,
  }),
  endpoints: (builder) => ({
    addComment: builder.mutation<SimpleResponse, AddCommentArg>({
      query: ({ postId, commentMessage }) => ({
        url: `add-comment?postId=${postId}`,
        method: "POST",
        body: { commentMessage },
        credentials: "include",
      }),
    }),
    replyComment: builder.mutation<SimpleResponse | ServerErrorType, ReplyArg>({
      query: ({ commentId, repliedMessage }) => ({
        url: `reply-comment?commentId=${commentId}`,
        method: "PUT",
        body: { repliedMessage },
        credentials: "include",
      }),
    }),
    getComments: builder.query<SimpleResponse | AllCommentsType, string>({
      query: (postId) => ({
        url: `get?postId=${postId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    likeComment: builder.mutation<
      SimpleResponse | { success: boolean },
      string
    >({
      query: (commentId) => ({
        url: `like/${commentId}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    dislikeComment: builder.mutation<
      SimpleResponse | { success: boolean },
      string
    >({
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
