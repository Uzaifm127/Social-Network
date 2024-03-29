import { Schema, model } from "mongoose";
import { PostTypes } from "../types/models/post.types.js";

const postSchema = new Schema<PostTypes>(
  {
    media: {
      url: String,
      publicId: String,
    },
    caption: {
      type: String,
      default: "",
      maxLength: [2200, "Maximum character limit exceed"],
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const PostModel = model<PostTypes>("Post", postSchema);
