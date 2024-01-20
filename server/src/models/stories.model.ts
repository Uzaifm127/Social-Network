import { Schema, model } from "mongoose";

const storySchema = new Schema(
  {
    story: {
      url: String,
      publicId: String,
    },
    storyType: {
      type: String,
      enum: ["video", "image", "text"],
      required: true,
    },
    tag: {
      type: String,
      enum: ["temporary", "permanent"],
      required: true,
    },
    duration: {
      type: Number,
      max: 60, // Maximum story duration is 60 seconds.
      default: 60,
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    expiresAt: { type: Date, expires: 3600 * 24 },
  },
  { timestamps: true }
);

export const StoryModel = model("Story", storySchema);
