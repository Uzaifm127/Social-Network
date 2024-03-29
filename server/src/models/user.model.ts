import { Schema, model } from "mongoose";
import { UserTypes } from "../types/models/user.types.js";
import bcrypt from "bcrypt";

const userSchema = new Schema<UserTypes>(
  {
    avatar: {
      url: String,
      publicId: String,
    },
    bio: {
      type: String,
      maxLength: [150, "Maximum character limit exceed"],
      default: "",
    },
    bookmarkedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true,
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    gender: { type: String, default: "" },
    myStories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
    name: {
      type: String,
      maxLength: [15, "Please enter a short name"],
      required: [true, "Please Enter your name"],
    },
    password: {
      type: String,
      required: [true, "Please Enter your password"],
      select: false,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    role: {
      type: String,
      enum: ["LEADER", "USER"],
      default: "USER",
    },
    username: {
      type: String,
      maxLength: [15, "Please enter a short username"],
      required: [true, "Please provide the username"],
    },
    website: { type: String, default: "" },
  },
  { timestamps: true }
);

// arrow function behaves differently with this keyword
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = model<UserTypes>("User", userSchema);
