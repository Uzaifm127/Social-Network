import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/types/states/user.types";

// To Do:- We have to implement the types to all the files in slices directory.

const user = {
  avatar: {
    url: "",
    publicId: "",
  },
  _id: "",
  bio: "",
  bookmarkedPosts: [],
  email: "",
  followers: [],
  following: [],
  gender: "",
  myStories: [],
  name: "",
  posts: [],
  role: "USER",
  username: "",
  website: "",
  createdAt: "",
  updatedAt: "",
  __v: 0,
};

const initialState: UserState = {
  isAuthenticated: false,
  userCroppedImage: undefined,
  me: user,
  user: user,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setMe: (state, action) => {
      state.me = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserCroppedImage: (state, action) => {
      state.userCroppedImage = action.payload;
    },
  },
});

export const { setAuth, setMe, setUser, setUserCroppedImage } =
  userSlice.actions;
export default userSlice.reducer;
