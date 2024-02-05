import PropTypes from "prop-types";
import { useGetFollowStatus } from "../utils/hooks/useGetFollowStatus";
import { useGetUserProfile } from "../utils/hooks/useGetUserProfile";
import placeholder from "../assets/Image Placeholder.png";

const User = ({
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
