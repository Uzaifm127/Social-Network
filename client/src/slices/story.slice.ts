import { SingleStoryType, StoryTypes } from "@/types/states/story.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: StoryTypes = {
  currentStory: null,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    setCurrentStory: (state, action: PayloadAction<SingleStoryType>) => {
      state.currentStory = action.payload;
    },
  },
});

export const { setCurrentStory } = storySlice.actions;
export default storySlice.reducer;
