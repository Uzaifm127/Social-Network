import Router from "express";
import {
  getMyProfile,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  editUserProfile,
  followUser,
  searchUser,
  unFollowUser,
} from "../controllers/user.controllers.js";
import { authenticated } from "../middlewares/authMiddleware.js";
import { uploadAvatar } from "../middlewares/multer.middleware.js";

export const userRouter = Router();

userRouter.post("/register", uploadAvatar, registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", authenticated, logoutUser);

userRouter.put("/edit", authenticated, uploadAvatar, editUserProfile);

userRouter.put("/follow/:id", authenticated, followUser);

userRouter.put("/unfollow/:id", authenticated, unFollowUser);

userRouter.get("/me", authenticated, getMyProfile);

userRouter.get("/search", authenticated, searchUser);

userRouter.get("/get-user/:id", authenticated, getUserProfile);
