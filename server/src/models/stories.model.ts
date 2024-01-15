import { Schema, model } from "mongoose";

const storySchema = new Schema(
  {
    story: {
      url: String,
      publicId: String,
    },
    storyType: {
      type: String,
      enum: ["video", "photo", "text"],
      required: true,
    },
    tag: {
      type: String,
      enum: ["temporary", "permanent"],
      required: true,
    },
    duration: {
      type: Number,
      max: 60000, // Maximum story duration is 60 seconds.
      required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    expiresAt: { type: Date, expires: 3600 * 24 },
  },
  { timestamps: true }
);

export const StoryModel = model("Story", storySchema);
