import { PostTypes } from "@/types/states/post.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PostTypes = {
  postMedia: [],
  feedPosts: [],
  currentPost: undefined,
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
