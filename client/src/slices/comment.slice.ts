import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentType: "comment",
  repliedCommentId: "",
};

const commentSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCommentType: (state, action) => {
      state.commentType = action.payload;
    },
    setRepliedCommentId: (state, action) => {
      state.repliedCommentId = action.payload;
    },
  },
});

export const { setCommentType, setRepliedCommentId } = commentSlice.actions;
export default commentSlice.reducer;
