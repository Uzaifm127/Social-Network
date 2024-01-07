import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  commentType: "comment",
};

export const commentReducer = createReducer(initialState, {
  changeCommentType: (state, action) => {
    state.commentType = action.payload;
  },
});
