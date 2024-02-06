import { User } from "@/types/states/user.types";
import { Comment } from "@/types/states/comment.types";

interface PostMedia {
  url: string;
  publicId: string;
}

// This is the types of individual post document which is stored in posts collection in DB.
export interface Post {
  media: PostMedia;
  _id: string;
  caption: string;
  likes: Array<User>;
  comments: Array<Comment>;
  owner: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// This is the types of the post's state in redux.
export interface PostTypes {}
