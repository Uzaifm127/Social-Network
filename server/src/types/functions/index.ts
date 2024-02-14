import { Response } from "express";
import { UserTypes } from "../models/user.types.js";

export type AuthUserType = (
  user: UserTypes,
  res: Response,
  statusCode: number,
  message: string
) => void;
