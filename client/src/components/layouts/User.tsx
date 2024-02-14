import React from "react";
import placeholder from "@assets/Image Placeholder.png";
import { useGetFollowStatus } from "@hooks/custom/useGetFollowStatus";
import { useGetUserProfile } from "@hooks/custom/useGetUserProfile";
import { UserPropTypes } from "@/types/propTypes";

const User: React.FC<UserPropTypes> = ({
  style,
  username,
  name,
  avatar,
  user,
  userId,
  hoverBgColor,
}) => {
  const { followButton, unfollowLoading, followLoading } =
    useGetFollowStatus(userId);

  const getUser = useGetUserProfile();

  // we have to implement the following and unfollowing state using websockets server here
  return (
    <article
      className={`flex items-center my-3 p-3 cursor-pointer ${hoverBgColor} rounded-lg transition duration-250 ${
        (followLoading || unfollowLoading) &&
        "relative -z-10 cursor-not-allowed"
      }`}
      style={style}
    >
      <section className="flex" onClick={() => getUser(user)}>
        <img
          className="rounded-full h-12"
          src={avatar || placeholder}
          alt={name}
        />
        <div className="ml-3">
          <h3>{username}</h3>
          <h4>{name}</h4>
        </div>
      </section>
      <div className="ml-auto">{followButton}</div>
    </article>
  );
};

export default User;
