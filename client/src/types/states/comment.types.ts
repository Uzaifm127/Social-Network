import { User } from "@/types/states/user.types";

export interface Comment {
  __id: string;
  message: string;
  likes: Array<User>;
  owner: User;
  replies: Comment;
  tag: "comment" | "reply";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CommentType {}
