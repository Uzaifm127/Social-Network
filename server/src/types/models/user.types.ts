import { Types, Document } from "mongoose";

export interface UserTypes extends Document {
  avatar: {
    url: string;
    publicId: string;
  };
  bio: string;
  bookmarkedPosts: Types.Array<Types.ObjectId>;
  email: string;
  followers: Types.Array<Types.ObjectId>;
  following: Types.Array<Types.ObjectId>;
  gender: string;
  myStories: Types.Array<Types.ObjectId>;
  name: string;
  password: string;
  matchPassword: (password: string) => Promise<boolean>;
  posts: Types.Array<Types.ObjectId>;
  role: "LEADER" | "USER";
  username: string;
  website: string;
}
