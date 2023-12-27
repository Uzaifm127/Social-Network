import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema({
  message: { type: String, required: [true, "Don't give an empty comment"] },
  likes: { type: Number, default: 0 },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const CommentModel = model("Comment", commentSchema);
