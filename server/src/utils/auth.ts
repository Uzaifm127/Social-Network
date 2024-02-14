import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { AuthUserType } from "../types/functions/index.js";

config();

export const authenticateUser: AuthUserType = (
  user,
  res,
  statusCode,
  message
) => {
  const JwtSecretKey = process.env.JWT_SECRET_KEY;
  const ENV = process.env.ENVIRONMENT;

  if (!JwtSecretKey) {
    throw new Error("JWT Secret Key is missing.");
  }

  if (!ENV) {
    throw new Error("environment variable is missing.");
  }

  const token = jwt.sign({ _id: user._id }, JwtSecretKey);

  res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: ENV === "development" ? "lax" : "none",
      secure: ENV === "development" ? false : true,
      httpOnly: ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: message,
      user,
    });
};
