import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userCroppedImage: undefined,
  me: {},
  user: {},
};

export const userReducer = createReducer(initialState, {
  changeAuth: (state, action) => {
    state.isAuthenticated = action.payload;
  },
  setMe: (state, action) => {
    state.me = action.payload;
  },
  setUser: (state, action) => {
    state.user = action.payload;
  },
  storeUserCroppedImage: (state, action) => {
    state.userCroppedImage = action.payload;
  },
});
