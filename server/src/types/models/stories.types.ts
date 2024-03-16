import { Document, Types } from "mongoose";
import { UserTypes } from "./user.types.js";

export interface StoryTypes extends Document {
  story: {
    url: string;
    publicId: string;
  };
  storyType: "video" | "image" | "text";
  tag: "temporary" | "permanent";
  duration: number;
  owner: Types.ObjectId | UserTypes;
  likes: Types.Array<Types.ObjectId> | Types.Array<UserTypes>;
  // expiresAt: Date;
}
