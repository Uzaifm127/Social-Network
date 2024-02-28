import { CommentType } from "@/types/states/comment.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CommentType = {
  commentType: "comment",
  repliedCommentId: "",
};

const commentSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCommentType: (state, action: PayloadAction<string>) => {
      state.commentType = action.payload;
    },
    setRepliedCommentId: (state, action: PayloadAction<string>) => {
      state.repliedCommentId = action.payload;
    },
  },
});

export const { setCommentType, setRepliedCommentId } = commentSlice.actions;
export default commentSlice.reducer;
