import PropTypes from "prop-types";
import FollowButton from "./FollowButton";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../services/userApi";
import { useCallback, useRef } from "react";
import UnfollowButton from "./UnfollowButton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const User = ({
  style,
  username,
  name,
  avatar,
  user,
  userId,
  hoverBgColor,
}) => {
  const [
    followUser,
    { isSuccess: isFollowSuccess, isLoading: isFollowLoading },
  ] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowLoading }] =
    useUnfollowUserMutation();

  const { me } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const button = useRef(null);

  const onFollowClick = useCallback(() => {
    followUser(userId);
  }, [followUser, userId]);

  const onUnfollowClick = useCallback(() => {
    unfollowUser(userId);
  }, [unfollowUser, userId]);

  if (isFollowSuccess || me.following.includes(userId)) {
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

  // we have to implement the following and unfollowing state using websockets server here
  return (
    <article
      className={`flex items-center my-3 p-3 cursor-pointer ${hoverBgColor} rounded-lg transition duration-250 ${
        (isFollowLoading || isUnfollowLoading) &&
        "relative -z-10 cursor-not-allowed"
      }`}
      style={style}
    >
      <Link
        className="flex"
        to={`/${username}`}
        onClick={() => {
          dispatch({ type: "setUser", payload: user });
        }}
      >
        <img className="rounded-full h-12" src={avatar} alt={name} />
        <div className="ml-3">
          <h3>{username}</h3>
          <h4>{name}</h4>
        </div>
      </Link>
      <div className="ml-auto">{button.current}</div>
    </article>
  );
};

User.propTypes = {
  username: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  user: PropTypes.object,
  userId: PropTypes.string,
  hoverBgColor: PropTypes.string,
  style: PropTypes.object,
};

export default User;
