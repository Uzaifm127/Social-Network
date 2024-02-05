import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toaster: false,
  avatarAlert: false,
  moreAlert: false,
  cropAlert: false,
  postAlert: false,
  postTypeAlert: false,
  postCropAlert: false,
  followAlert: {
    valueToAlert: undefined,
    alert: false,
  },
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setAvatarAlert: (state, action) => {
      state.avatarAlert = action.payload;
    },
    setMoreAlert: (state, action) => {
      if (action.payload !== undefined) {
        state.moreAlert = action.payload;
      } else {
        state.moreAlert = !state.moreAlert;
      }
    },
    setCropAlert: (state, action) => {
      state.cropAlert = action.payload;
    },
    setPostAlert: (state, action) => {
      state.postAlert = action.payload;
    },
    setPostTypeAlert: (state, action) => {
      state.postTypeAlert = action.payload;
    },
    setPostCropAlert: (state, action) => {
      state.postCropAlert = action.payload;
    },
    setFollowAlert: (state, action) => {
      const { alert, valueToAlert } = action.payload;

      state.followAlert.alert = alert;
      state.followAlert.valueToAlert = valueToAlert;
    },
  },
});

export const {
  setAvatarAlert,
  setMoreAlert,
  setCropAlert,
  setPostAlert,
  setPostTypeAlert,
  setPostCropAlert,
  setFollowAlert,
} = toggleSlice.actions;
export default toggleSlice.reducer;
