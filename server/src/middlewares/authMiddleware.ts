import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { ErrorHandler } from "../utils/error.js";
import { UserModel } from "../models/user.model.js";
import { NextFunction, Response } from "express";
import { CustomReq } from "../types/index.js";

config();

export const authenticated = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler("Please login first", 404));
    }

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT Secret Key is missing.");
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY) as {
      _id: string;
    };
    const user = await UserModel.findById(_id).populate("posts");
    // .populate("followers")
    // .populate("following");
    // .populate("bookmarkedPosts");

    if (user !== null) {
      req.user = user;
    } else {
      throw new Error("user is invalid in authMiddleware.ts");
    }
    next();
  } catch (error) {
    next(error);
  }
};
