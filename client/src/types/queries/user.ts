import { UserState } from "@/types/states/user.types";

export interface ProfileOutput {
  success: boolean;
  user: UserState;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user: UserState;
}

export interface LoginArg {
  email: string;
  password: string;
}

export interface RegisterArg extends LoginArg {
  name: string;
  username: string;
  avatar: File;
}

export interface LogoutResult {
  success: boolean;
  message: string;
}

export interface SearchResult {
  success: boolean;
  users: Array<UserState>;
}

export interface EditProfileArg {
  website: string;
  bio: string;
  gender: string;
  avatarMessage?: string;
  avatar?: File;
}
