import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { Link, Navigate } from "react-router-dom";
import placeholderImage from "../assets/Image Placeholder.png";
import { useCallback, useEffect } from "react";
import FollowAlert from "../components/FollowAlert";
import { useGetFollowStatus } from "../utils/hooks/useGetFollowStatus";

const navLinksClass = `px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900`;

const UserProfile = ({
  name,
  username,
  bio,
  avatar,
  followers,
  following,
  posts,
  userId,
}) => {
  const followButton = useGetFollowStatus(userId);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { highlighter } = useSelector((state) => state.post);

  const { followAlert } = useSelector((state) => state.toggle);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.location.pathname === `/${user.username}`) {
      dispatch({ type: "setHighlighter", payload: true });
    }

    return () => {
      dispatch({
        type: "followAlertToggle",
        payload: { alert: false, valueToAlert: undefined },
      });
    };
  }, [user.username, dispatch]);

  const onUserFollowersFollowingClick = useCallback(
    (e) => {
      const { clickedValue } = e.target.getAttribute("data-clicked");

      dispatch({
        type: "followAlertToggle",
        payload: { alert: true, valueToAlert: clickedValue },
      });
    },
    [dispatch]
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="flex">
      <SideBar />
      {followAlert.alert && (
        <FollowAlert
          following={user.following}
          followers={user.followers}
          primaryHeading={followAlert.valueToAlert}
        />
      )}
      <section className="m-16 w-[80%]">
        <section className="flex items-start mx-20">
          <img
            className="h-40 rounded-full cursor-pointer"
            src={avatar || placeholderImage}
            alt={name}
          />
          <article className="ml-24">
            <div className="flex items-center mb-5">
              <h1 className="text-xl mr-5">{username}</h1>
              {followButton}
            </div>
            <div className="flex items-center mb-4">
              <h2 className="mr-10">{posts.length} posts</h2>

              <button
                data-clicked="followers"
                onClick={onUserFollowersFollowingClick}
                className="mr-10"
              >
                {followers.length} follower
              </button>

              <button
                data-clicked="following"
                onClick={onUserFollowersFollowingClick}
                className="mr-10"
              >
                {following.length} following
              </button>
            </div>
            <h3 className="mb-2">{name}</h3>
            <p className="">{bio}</p>
          </article>
        </section>
        <hr className="w-full bg-black mt-40" />
        <nav className="flex justify-center">
          <ul className="flex">
            <Link
              to={`/${user.username}`}
              className={`px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900 ${
                highlighter && "bg-slate-900"
              }`}
            >
              POSTS
            </Link>
            <Link to={`/${username}/reels`} className={navLinksClass}>
              REELS
            </Link>
            <Link to={`/${username}/saved`} className={navLinksClass}>
              SAVED
            </Link>
          </ul>
        </nav>
        <section id="posts" className="flex justify-center">
          {posts.map((element) => {
            const { media, _id } = element;

            return (
              <div
                className={`bg-black w-72 h-72 m-3 rounded-xl cursor-pointer overflow-hidden relative`}
                key={_id}
              >
                <div
                  className={`absolute h-full w-full top-0 left-0 bg-no-repeat bg-center bg-cover transition duration-200 hover:opacity-70`}
                  style={{ backgroundImage: `url('${media?.url}')` }}
                ></div>
              </div>
            );
          })}
        </section>
      </section>
    </main>
  );
};

UserProfile.propTypes = {
  username: PropTypes.string,
  posts: PropTypes.array,
  followers: PropTypes.array,
  following: PropTypes.array,
  bio: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  userId: PropTypes.string,
};

export default UserProfile;
