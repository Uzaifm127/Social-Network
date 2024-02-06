import { Post } from "@/types/states/post.types";
import { Story } from "@/types/states/story.types";

interface Avatar {
  url: string;
  publicId: string;
}

export interface User {
  avatar: Avatar;
  __id: string;
  bio: string;
  bookmarkedPosts: Array<Post>;
  email: string;
  followers: User | string;
  following: User | string;
  gender: "MALE" | "FEMALE" | "OTHERS";
  myStories: Array<Story>;
  name: string;
  posts: Array<Post>;
  role: "LEADER" | "USER";
  username: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserState {
  isAuthenticated: boolean;
  me: User | object;
  user: User | object;
}
