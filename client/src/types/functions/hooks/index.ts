import React from "react";

interface FollowStatusReturn {
  followButton: React.ReactNode;
  followLoading: boolean;
  unfollowLoading: boolean;
}

export type GetTimeTypes = (created: string) => string | undefined;

export type FollowStatusTypes = (userId: string) => FollowStatusReturn;

export type FUClickTypes = (e: React.MouseEvent) => void;

// We have defined a tuple below.
export type RecordVideoTypes = () => [
  (stream: MediaStream) => void,
  () => void,
  boolean,
  string,
  File | undefined
];
