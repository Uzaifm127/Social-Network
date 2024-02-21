import { Document, Types } from "mongoose";
import { UserTypes } from "./user.types.js";

export interface CommentTypes extends Document {
  message: string;
  likes: Types.Array<Types.ObjectId> | Types.Array<UserTypes> | Array<never>;
  owner: Types.ObjectId | UserTypes;
  replies:
    | Types.Array<Types.ObjectId>
    | Types.Array<CommentTypes>
    | Array<never>;
  tag: "reply" | "comment";
  createdAt: Date;
  updatedAt: Date;
}

export interface FirstComment {
  message: string;
  owner: UserTypes;
  replies: Array<never>;
  likes: Array<never>;
  createdAt: Date;
  _id: string;
}

export type AllCommentsType = [FirstComment, ...Array<CommentTypes>];
