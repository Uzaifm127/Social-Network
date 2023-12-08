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
  }),
});

export const { useSharePostMutation } = postApi;