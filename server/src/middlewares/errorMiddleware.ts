import { Response } from "express";
import { CustomReq } from "../types/index.js";
import { ErrorHandler } from "../utils/error.js";

export const errorMiddleware = (
  error: ErrorHandler,
  req: CustomReq,
  res: Response
) => {
  return res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};
