import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema({
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
  comments: [
    { user: { type: Schema.Types.ObjectId, ref: "User" }, message: String },
  ],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const PostModel = model("Post", postSchema);
