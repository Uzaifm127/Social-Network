import { useCallback, useRef } from "react";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../services/userApi";
import FollowButton from "../../components/FollowButton";
import UnfollowButton from "../../components/UnfollowButton";
import { useSelector } from "react-redux";

export const useGetFollowStatus = (userId) => {
  const [
    followUser,
    { isSuccess: isFollowSuccess, isLoading: isFollowLoading },
  ] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowLoading }] =
    useUnfollowUserMutation();

  const { me } = useSelector((state) => state.user);

  const button = useRef(null);

  const onFollowClick = useCallback(() => {
    followUser(userId);
  }, [followUser, userId]);

  const onUnfollowClick = useCallback(() => {
    unfollowUser(userId);
  }, [unfollowUser, userId]);

  const isFollowing = useCallback(
    // This function checks whether I follow the given user or not.
    (array) => {
      return array.some((element) => element._id === userId);
    },
    [userId]
  );
  if (userId === me._id) {
    button.current = <></>;
  } else if (isFollowSuccess || isFollowing(me.following)) {
    button.current = (
      <UnfollowButton
        loading={isUnfollowLoading}
        onUnfollowClick={onUnfollowClick}
      />
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
