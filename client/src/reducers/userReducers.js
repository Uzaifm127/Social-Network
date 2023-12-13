import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userCroppedImage: undefined,
  user: {},
};

export const userReducer = createReducer(initialState, {
  changeAuth: (state, action) => {
    state.isAuthenticated = action.payload;
  },
  setUser: (state, action) => {
    state.user = action.payload;
  },
  storeUserCroppedImage: (state, action) => {
    state.userCroppedImage = action.payload;
  },
});
