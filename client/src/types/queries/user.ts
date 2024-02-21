import { User } from "@/types/states/user.types";

export interface ProfileOutput {
  success: boolean;
  user: User;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user: User;
}

export interface LoginArg {
  email: string;
  password: string;
}

export interface LogoutResult {
  success: boolean;
  message: string;
}

export interface SearchResult {
  success: boolean;
  users: Array<User>;
}
