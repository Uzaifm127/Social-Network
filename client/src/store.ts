import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@slices/user.slice";
import postReducer from "@slices/post.slice";
import toggleReducer from "@slices/toggle.slice";
import storyReducer from "@slices/story.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    toggle: toggleReducer,
    story: storyReducer,
  },
});

// Exporting the types of states and dispatch function from store.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
