import { Story } from "@/types/states/story.types";

export interface CreateResult {
  success: boolean;
  message: string;
}

export interface CreateArg {
  story: File;
  duration: number;
  storyType: string;
}

export interface AllStoriesResult {
  success: boolean;
  stories: Array<Story>;
}
