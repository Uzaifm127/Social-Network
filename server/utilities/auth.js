import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const authenticateUser = (user, res, statusCode, message) => {
  const ENV = process.env.ENVIRONMENT;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

  res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: ENV === "development" ? "Lax" : "None",
      secure: ENV === "development" ? false : true,
      httpOnly: ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: message,
      user,
    });
};
