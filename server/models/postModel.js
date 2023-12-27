import { Schema, model } from "mongoose";

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
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const PostModel = model("Post", postSchema);
