import { Post, PostTypes } from "@/types/states/post.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    setPostMedia: (
      state,
      action: PayloadAction<{ file: File | null; filePreview: string }>
    ) => {
      state.postMedia.push(action.payload);
    },
    resetMediaPost: (state) => {
      state.postMedia = [];
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.feedPosts = [...action.payload];
    },
    setCurrentPost: (state, action: PayloadAction<Post>) => {
      state.currentPost = action.payload;
    },
    setHighlighter: (state, action: PayloadAction<boolean>) => {
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
