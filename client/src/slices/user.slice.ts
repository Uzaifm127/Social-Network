import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "@/types/states/user.types";

const initialState: UserState = {
  isAuthenticated: false,
  userCroppedImage: undefined,
  me: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setMe: (state, action: PayloadAction<User | null>) => {
      state.me = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserCroppedImage: (
      state,
      action: PayloadAction<{ file: File; filePreview: string }>
    ) => {
      state.userCroppedImage = action.payload;
    },
  },
});

export const { setAuth, setMe, setUser, setUserCroppedImage } =
  userSlice.actions;
export default userSlice.reducer;
