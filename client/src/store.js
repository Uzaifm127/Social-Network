import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";
import { toggleReducer } from "./reducers/toggleReducer";
import { userApi } from "./services/userApi";
import { postApi } from "./services/postApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postReducer } from "./reducers/postReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    toggle: toggleReducer,
    post: postReducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware, postApi.middleware),
});

setupListeners(store.dispatch);
