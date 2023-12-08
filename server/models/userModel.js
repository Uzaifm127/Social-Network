import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  avatar: {
    url: String,
    publicId: String,
  },
  name: {
    type: String,
    maxLength: [15, "Please enter a short name"],
    required: [true, "Please Enter your name"],
  },
  username: {
    type: String,
    maxLength: [15, "Please enter a short username"],
    required: [true, "Please provide the username"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    unique: [true, "Email already exist"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    select: false,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  website: { type: String, default: "" },
  bio: {
    type: String,
    maxLength: [150, "Maximum character limit exceed"],
    default: "",
  },
  gender: { type: String, default: "" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// arrow function behaves differently with this keyword
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = model("User", userSchema);
