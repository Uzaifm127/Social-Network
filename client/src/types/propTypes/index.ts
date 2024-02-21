import { User } from "@/types/states/user.types";
import { Post } from "@/types/states/post.types";
import { Comment } from "@/types/states/comment.types";
import { OnChangeType } from "@/types/functions";

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

export interface UserPropTypes {
  style: object;
  username: string;
  name: string;
  avatar: string;
  user: User;
  userId: string;
  hoverBgColor: string;
}

export interface FUButtonPropTypes {
  onFUClick: (event: React.MouseEvent) => void;
  loading: boolean;
}

export interface UserProfilePropTypes {
  userId: string;
}

export interface FollowAlertPropTypes {
  primaryHeading: string | undefined;
  followers: Array<User> | undefined;
  following: Array<User> | undefined;
}

export interface AvEditAlertPT {
  setAvatarSrc: React.Dispatch<React.SetStateAction<string>>;
}

export interface PostCropPT {
  Image: string;
}

export interface PostCropPreviewPT {
  nextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PostPromptPT {
  onChange: OnChangeType<HTMLInputElement>;
}

export interface PopupPT {
  popupValue: number;
  popHeight: string;
  popWidth: string;
  popCoordinates: string;
}

export interface CropImagePT {
  Image: string;
}

export interface StoriesPT {
  storyRef: React.MutableRefObject<HTMLImageElement | null>;
  storyHeight: string;
  userAvatar: string;
  onStoryClick: React.MouseEventHandler<HTMLImageElement>;
}

export interface UploadPhotoPT {
  onImageChange: React.ChangeEventHandler<HTMLInputElement>;
  onTotalSubmit: React.MouseEventHandler<HTMLButtonElement>;
  avatarPreview: string;
}

export interface CommentPT {
  avatar: string;
  commentMessage: string;
  createdAt: string;
  commentId: string;
  commentLikes: Array<User>;
  currentElement: number;
  onReply: (username: string) => void;
  replies: Array<Comment>;
  username: string;
  commentUser: User;
}

export interface CommentRepliesPT {
  avatar: string;
  commentMessage: string;
  createdAt: string;
  commentId: string;
  commentLikes: Array<User>;
  onReply: React.MouseEventHandler<HTMLButtonElement>;
  username: string;
  commentUser: User;
}

export interface SavedPT {
  refreshLoading: boolean;
}
