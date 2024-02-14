import { useCallback, useRef } from "react";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@services/user.api";
import FollowButton from "@components/buttons/FollowButton";
import UnfollowButton from "@components/buttons/UnfollowButton";
import { useAppSelector } from "@hooks/hooks";
import { User } from "@/types/states/user.types";
import { FUClickTypes, FollowStatusTypes } from "@/types/functions/hooks/index";

export const useGetFollowStatus: FollowStatusTypes = (userId) => {
  const [
    followUser,
    { isSuccess: isFollowSuccess, isLoading: isFollowLoading },
  ] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowLoading }] =
    useUnfollowUserMutation();

  const { me } = useAppSelector((state) => state.user);

  const button = useRef<React.ReactNode>(null);

  const onFollowClick: FUClickTypes = useCallback(() => {
    followUser(userId);
  }, [followUser, userId]);

  const onUnfollowClick: FUClickTypes = useCallback(() => {
    unfollowUser(userId);
  }, [unfollowUser, userId]);

  const isFollowing = useCallback(
    // This function checks whether I follow the given user or not.
    (array: Array<User>) => {
      return array.some((element: User) => element._id === userId);
    },
    [userId]
  );
  if (userId === me._id) {
    button.current = <></>;
  } else if (isFollowSuccess || isFollowing(me.following)) {
    button.current = (
      <UnfollowButton loading={isUnfollowLoading} onFUClick={onUnfollowClick} />
    );
  } else {
    button.current = (
      <FollowButton loading={isFollowLoading} onFollowClick={onFollowClick} />
    );
  }

  return {
    followButton: button.current,
    followLoading: isFollowLoading,
    unfollowLoading: isUnfollowLoading,
  };
};
