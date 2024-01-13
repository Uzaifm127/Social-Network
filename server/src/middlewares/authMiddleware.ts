import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { ErrorHandler } from "../utils/error.js";
import { UserModel } from "../models/user.model.js";
import { NextFunction, Request, Response } from "express";

config();

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler("Please login first", 404));
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY || "") as {
      _id: string;
    };
    const user = await UserModel.findById(_id)
      .populate("posts")
      .populate("followers")
      .populate("following")
      .populate("bookmarkedPosts");

    req.user = user;
    next();
  } catch (error) {
    next(new ErrorHandler(error.message, error.http_code));
  }
};
