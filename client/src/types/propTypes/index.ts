import { User } from "@/types/states/user.types";
import { Post } from "@/types/states/post.types";
import { Comment } from "../states/comment.types";

export interface SideBarPropTypes {
  loading: boolean;
}

export interface MyProfilePropTypes {
  refreshLoading: boolean;
}

export interface PostPropTypes {
  captionContent: string;
  postMediaSrc: string;
  avatar: string;
  username: string;
  createdAt: string;
  likePost: (postId: string) => void;
  postId: string;
  dislikePost: (postId: string) => void;
  likesArray: Array<User>;
  user: User;
  currentPost: Post;
  comments: Array<Comment>;
}
