import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postMedia: [],
  feedPosts: [],
  currentPost: {},
  highlighter: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostMedia: (state, action) => {
      state.postMedia.push(action.payload);
    },
    resetMediaPost: (state) => {
      state.postMedia = [];
    },
    setPosts: (state, action) => {
      state.feedPosts = [...action.payload];
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    setHighlighter: (state, action) => {
      state.highlighter = action.payload;
    },
  },
});

export const {
  setPostMedia,
  resetMediaPost,
  setPosts,
  setCurrentPost,
  setHighlighter,
} = postSlice.actions;
export default postSlice.reducer;
