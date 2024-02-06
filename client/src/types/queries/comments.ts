import { Comment } from "@/types/states/comment.types";

export interface AddCommentArg {
  postId: string;
  commentMessage: string;
}

export interface ReplyArg {
  commentId: string;
  repliedMessage: string;
}

export interface AllCommentsType {
  success: boolean;
  comments: Array<Comment>;
  replies: Array<Comment>;
}
