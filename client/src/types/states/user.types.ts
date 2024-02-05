interface Avatar {
  url: string;
  publicId: string;
}

interface User {
  avatar: Avatar;
  __id: string;
  bio: string;
  // bookmarkedPosts
  email: string;
  followers: User | string;
  following: User | string;
  gender: "MALE" | "FEMALE" | "OTHERS";
  // myStories:
  name: string;
  // posts:
  role: "LEADER" | "USER";
  username: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserState {
  isAuthenticated: boolean;
  me: User;
  user: User;
}
