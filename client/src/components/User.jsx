import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetFollowStatus } from "../utils/hooks/useGetFollowStatus";

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

  const dispatch = useDispatch();

  // we have to implement the following and unfollowing state using websockets server here
  return (
    <article
      className={`flex items-center my-3 p-3 cursor-pointer ${hoverBgColor} rounded-lg transition duration-250 ${
        (followLoading || unfollowLoading) &&
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
