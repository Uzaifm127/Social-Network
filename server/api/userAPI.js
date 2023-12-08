import Router from "express";
import {
  getMyProfile,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  editUserProfile,
} from "../controllers/userControllers.js";
import { authenticated } from "../middlewares/authMiddleware.js";
import { uploadAvatar } from "../middlewares/multerMiddleware.js";

export const userRouter = Router();

userRouter.post("/register", uploadAvatar, registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", authenticated, logoutUser);

userRouter.put("/edit", authenticated, uploadAvatar, editUserProfile);

userRouter.get("/me", authenticated, getMyProfile);

userRouter.get("/:id", authenticated, getUserProfile);
