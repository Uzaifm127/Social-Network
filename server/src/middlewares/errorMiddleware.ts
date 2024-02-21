import { NextFunction, Response } from "express";
import { CustomReq } from "../types/index.js";
import { ErrorHandler } from "../utils/error.js";

// We have to specified all four arguments otherwise the error middleware will not be executed.
export const errorMiddleware = (
  error: any,
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};
