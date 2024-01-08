import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    message: { type: String, required: [true, "Don't give an empty comment"] },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    tag: {
      type: String,
      enum: ["comment", "reply"],
      required: [true, "Please give tag to this comment"],
    },
  },
  { timestamps: true }
);

export const CommentModel = model("Comment", commentSchema);
