import userReducer from "@slices/user.slice";
import postReducer from "@slices/post.slice";
import toggleReducer from "@slices/toggle.slice";
import commentReducer from "@slices/comment.slice";
import storyReducer from "@slices/story.slice";
import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "@services/user.api";
import { postApi } from "@services/post.api";
import { commentApi } from "@services/comment.api";
import { storyApi } from "@services/stories.api";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    toggle: toggleReducer,
    comment: commentReducer,
    story: storyReducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [storyApi.reducerPath]: storyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      userApi.middleware,
      postApi.middleware,
      commentApi.middleware,
      storyApi.middleware
    ),
});

// Exporting the types of states and dispatch function from store.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
