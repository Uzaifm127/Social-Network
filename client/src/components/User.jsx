import media from "../assets/Image Placeholder.png";
import FollowButton from "./FollowButton";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../services/userApi";
import { useCallback } from "react";
import UnfollowButton from "./UnfollowButton";

const User = () => {
  const [followUser, { isSuccess: isFollowSuccess }] = useFollowUserMutation();
  const [unfollowUser, { isSuccess: isUnfollowSuccess }] =
    useUnfollowUserMutation();

  const onFollowClick = useCallback(
    (userId) => {
      followUser(userId);
    },
    [followUser]
  );
  const onUnfollowClick = useCallback(
    (userId) => {
      unfollowUser(userId);
    },
    [unfollowUser]
  );

  return (
    <article className="flex items-center m-3 p-3 cursor-pointer hover:bg-gray-100 rounded-lg transition duration-250">
      <img className="rounded-full h-12" src={media} alt="" />
      <div className="ml-3">
        <h3>username</h3>
        <h4>name</h4>
      </div>
      <div className="ml-auto">
        {isFollowSuccess ? (
          <UnfollowButton onUnfollowClick={onUnfollowClick} />
        ) : (
          <FollowButton onFollowClick={onFollowClick} />
        )}
      </div>
    </article>
  );
};

export default User;
