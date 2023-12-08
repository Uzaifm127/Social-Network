import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  postMedia: [],
};

export const postReducer = createReducer(initialState, {
  storePostMedia: (state, action) => {
    state.postMedia.push(action.payload);
  },
  resetMediaPost: (state) => {
    state.postMedia = [];
  },
});
