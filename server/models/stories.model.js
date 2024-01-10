import { Schema } from "mongoose";

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
      max: 30000, // Maximum story duration is 30 seconds.
      required: true,
    },
    isMine: {
      type: Boolean,
      required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    expiresAt: { type: Date, expires: 3600 * 24 },
  },
  { timestamps: true }
);

export const StoryModel = model("Story", storySchema);
