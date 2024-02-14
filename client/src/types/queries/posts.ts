import { Post } from "@/types/states/post.types";

export interface CreatePostResult {
  success: boolean;
  message: string;
}

export interface AllPostResult {
  success: boolean;
  feedPosts: Array<Post>;
}

export interface LikeDislikeResult {
  success: boolean;
}

export interface ServerErrorType extends LikeDislikeResult {
  message: string;
}

export interface BookmarkResult extends LikeDislikeResult {
  message: string;
}

export interface BookmarkArg {
  postId: string;
  action: string;
}
