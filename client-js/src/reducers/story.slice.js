import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStory: null,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    setCurrentStory(state, action) {
      state.currentStory = action.payload;
    },
  },
});

export const { setCurrentStory } = storySlice.actions;
export default storySlice.reducer;
