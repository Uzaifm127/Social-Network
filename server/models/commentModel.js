import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema({
  likes: { type: Number, default: 0 },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  message: String,
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const CommentModel = model("Comment", commentSchema);
