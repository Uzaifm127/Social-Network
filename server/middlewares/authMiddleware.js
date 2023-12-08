import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { ErrorHandler } from "../config/error.js";
import { UserModel } from "../models/userModel.js";

config();

export const authenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Please login first", 404));

  const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await UserModel.findById(_id);
  req.user = user;
  next();
};
