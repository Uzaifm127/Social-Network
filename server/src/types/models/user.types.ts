import { Types, Document } from "mongoose";
import { PostTypes } from "./post.types.js";
import { StoryTypes } from "./stories.types.js";

export interface UserTypes extends Document {
  avatar: {
    url: string;
    publicId: string;
  };
  bio: string;
  bookmarkedPosts: Types.Array<Types.ObjectId> | Types.Array<PostTypes>;
  email: string;
  followers: Types.Array<Types.ObjectId> | Types.Array<UserTypes>;
  following: Types.Array<Types.ObjectId> | Types.Array<UserTypes>;
  gender: string;
  myStories: Types.Array<Types.ObjectId> | Types.Array<StoryTypes>;
  name: string;
  password: string;
  matchPassword: (password: string) => Promise<boolean>;
  posts: Types.Array<Types.ObjectId> | Types.Array<PostTypes>;
  role: "LEADER" | "USER";
  username: string;
  website: string;
}
