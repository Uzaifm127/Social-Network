import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skewLoader: false,
};

const appSlice = createSlice({
  initialState,
  name: "app",
  reducers: {
    setSkewLoader: (state, action) => {
      state.skewLoader = action.payload;
    },
  },
});

export const { setSkewLoader } = appSlice.actions;
export default appSlice.reducer;
