import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { ErrorHandler } from "../utilities/error.js";
import { UserModel } from "../models/userModel.js";

config();

export const authenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Please login first", 404));

    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(_id)
      .populate("posts")
      .populate("followers")
      .populate("following")
      .populate("bookmarkedPosts");

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, error.http_code));
  }
};
