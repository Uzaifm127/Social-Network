import React from "react";

interface FollowStatusReturn {
  followButton: React.ReactNode;
  followLoading: boolean;
  unfollowLoading: boolean;
}

export type GetTimeTypes = (created: string) => string | undefined;

export type FollowStatusTypes = (userId: string) => FollowStatusReturn;

export type FUClickTypes = (event: React.MouseEvent) => void;
