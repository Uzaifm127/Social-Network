import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  postMedia: [],
  feedPosts: [],
  highlighter: false,
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
  setHighlighter: (state, action) => {
    state.highlighter = action.payload;
  },
});
