import { Request } from "express";
import { UserTypes } from "./models/user.types.js";

export interface CustomReq extends Request {
  user: UserTypes;
}
