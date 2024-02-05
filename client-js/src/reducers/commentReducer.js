import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  commentType: "comment",
  repliedCommentId: "",
};

export const commentReducer = createReducer(initialState, {
  changeCommentType: (state, action) => {
    state.commentType = action.payload;
  },
  storeRepliedCommendId: (state, action) => {
    state.repliedCommentId = action.payload;
  },
});
