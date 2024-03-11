import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ToggleTypes } from "@/types/states/toggle.types";

const initialState: ToggleTypes = {
  toaster: false,
  avatarAlert: false,
  moreAlert: false,
  cropAlert: false,
  postAlert: false,
  // postTypeAlert: false,
  postCropAlert: false,
  followAlert: {
    valueToAlert: "",
    alert: false,
  },
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setAvatarAlert: (state, action: PayloadAction<boolean>) => {
      state.avatarAlert = action.payload;
    },
    setCropAlert: (state, action: PayloadAction<boolean>) => {
      state.cropAlert = action.payload;
    },
    setPostAlert: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload);
      state.postAlert = action.payload;
    },
    // s
    setPostCropAlert: (state, action: PayloadAction<boolean>) => {
      state.postCropAlert = action.payload;
    },
    setMoreAlert: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.moreAlert = action.payload;
      } else {
        state.moreAlert = !state.moreAlert;
      }
    },
    setFollowAlert: (
      state,
      action: PayloadAction<{ valueToAlert: string; alert: boolean }>
    ) => {
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
  // setPostTypeAlert,
  setPostCropAlert,
  setFollowAlert,
} = toggleSlice.actions;
export default toggleSlice.reducer;
