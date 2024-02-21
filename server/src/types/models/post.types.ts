import { Document, Types } from "mongoose";
import { UserTypes } from "./user.types.js";
import { CommentTypes } from "./comment.types.js";

export interface PostTypes extends Document {
  media: {
    url: string;
    publicId: string;
  };
  caption: string;
  likes: Types.Array<Types.ObjectId> | Types.Array<UserTypes>;
  comments: Types.Array<Types.ObjectId> | Types.Array<CommentTypes>;
  owner: Types.ObjectId | UserTypes;
  createdAt: Date;
  updatedAt: Date;
}
