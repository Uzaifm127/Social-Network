import { createReducer } from "@reduxjs/toolkit";

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
export const toggleReducer = createReducer(initialState, {
  toastToggle: (state, action) => {
    state.toaster = action.payload;
  },
  avatarAlertToggle: (state, action) => {
    state.avatarAlert = action.payload;
  },
  moreAlertToggle: (state, action) => {
    if (action.payload !== undefined) {
      state.moreAlert = action.payload;
    } else {
      state.moreAlert = !state.moreAlert;
    }
  },
  cropAlertToggle: (state, action) => {
    state.cropAlert = action.payload;
  },
  postAlertToggle: (state, action) => {
    state.postAlert = action.payload;
  },
  postTypeAlertToggle: (state, action) => {
    state.postTypeAlert = action.payload;
  },
  postCropAlertToggle: (state, action) => {
    state.postCropAlert = action.payload;
  },
  followAlertToggle: (state, action) => {
    const { alert, valueToAlert } = action.payload;

    state.followAlert.alert = alert;
    state.followAlert.valueToAlert = valueToAlert;
  },
});
