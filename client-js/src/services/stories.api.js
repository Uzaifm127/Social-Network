import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_STORIES_BASE_URL,
  }),
  endpoints: (builder) => ({
    createStory: builder.mutation({
      query: (data) => ({
        url: `new`,
        method: "POST",
        body: data,
        credentials: "include",
        formData: true,
      }),
    }),
    getAllFollowingStories: builder.query({
      query: () => ({
        url: `all-following`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateStoryMutation, useGetAllFollowingStoriesQuery } =
  storyApi;
