import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";
import { toggleReducer } from "./reducers/toggleReducer";
import { userApi } from "./services/userApi";
import { postApi } from "./services/postApi";
import { commentApi } from "./services/commentApi";
import { storyApi } from "./services/stories.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postReducer } from "./reducers/postReducer";
import { commentReducer } from "./reducers/commentReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    toggle: toggleReducer,
    post: postReducer,
    comment: commentReducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [storyApi.reducerPath]: storyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userApi.middleware,
      postApi.middleware,
      commentApi.middleware,
      storyApi.middleware
    ),
});

setupListeners(store.dispatch);
