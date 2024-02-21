import { User } from "@/types/states/user.types";

export interface Comment {
  _id: string;
  message: string;
  likes: Array<User>;
  owner: User;
  replies: Array<Comment>;
  tag: "comment" | "reply";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CommentType {}
