import { User } from "@/types/states/user.types";

interface StoryMedia {
  url: string;
  publicId: string;
}

// This is the types of individual story document which is stored in stories collection in DB.
export interface Story {
  story: StoryMedia;
  _id: string;
  storyType: "image" | "video" | "text";
  tag: "temporary" | "permanent";
  duration: number;
  owner: User | string;
  likes: Array<User>;
  expiresAt: Date;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// This is the types of the story's state in redux.
export interface SingleStoryType {
  _id: string;
  userAvatar: string;
  username: string;
  userStories: Story[];
}

export interface StoryTypes {
  currentStory: SingleStoryType | null;
}
