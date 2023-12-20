import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  postMedia: [],
  feedPosts: [],
};

export const postReducer = createReducer(initialState, {
  storePostMedia: (state, action) => {
    state.postMedia.push(action.payload);
  },
  resetMediaPost: (state) => {
    state.postMedia = [];
  },
  storePosts: (state, action) => {
    state.feedPosts = [...action.payload];
  },
});
