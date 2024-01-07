import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import placeholderImage from "../assets/Image Placeholder.png";
import { useCallback, useEffect } from "react";
import FollowAlert from "../components/FollowAlert";
import UserSkewLoader from "../components/loaders/UserSkewLoader";

const navLinksClass = `px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900`;

const Saved = ({ refreshLoading }) => {
  const { highlighter } = useSelector((state) => state.post);

  const { me } = useSelector((state) => state.user);

  const { followAlert } = useSelector((state) => state.toggle);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.location.pathname === `/${me.username}/saved`) {
      dispatch({ type: "setHighlighter", payload: true });
    }
  }, [me.username, dispatch]);

  const onUserFollowersFollowingClick = useCallback(
    (e) => {
      const clickedValue = e.target.getAttribute("data-clicked");

      dispatch({
        type: "followAlertToggle",
        payload: { alert: true, valueToAlert: clickedValue },
      });
    },
    [dispatch]
  );

  return (
    <main className="flex">
      <SideBar />
      {followAlert.alert && (
        <FollowAlert
          following={me.following}
          followers={me.followers}
          primaryHeading={followAlert.valueToAlert}
        />
      )}
      {refreshLoading ? (
        <UserSkewLoader />
      ) : (
        <section className="m-16 w-[80%]">
          <section className="flex items-start mx-20">
            <img
              className="h-40 rounded-full"
              src={me.avatar?.url || placeholderImage}
              alt={me.name}
            />
            <article className="ml-24">
              <div className="flex items-center mb-5">
                <h1 className="text-xl mr-5">{me.username}</h1>
                <Link to={"/accounts/edit"}>
                  <button className="rounded-lg px-3 py-1.5 bg-slate-400 text-white">
                    Edit profile
                  </button>
                </Link>
              </div>
              <div className="flex items-center mb-4">
                <h2 className="mr-10">{me.posts.length} posts</h2>
                <button
                  data-clicked="followers"
                  onClick={onUserFollowersFollowingClick}
                  className="mr-10"
                >
                  {me.followers.length} follower
                </button>

                <button
                  data-clicked="following"
                  onClick={onUserFollowersFollowingClick}
                  className="mr-10"
                >
                  {me.following.length} following
                </button>
              </div>
              <h3 className="mb-2">{me.name}</h3>
              <p className="">{me.bio}</p>
            </article>
          </section>
          <hr className="w-full bg-black mt-40" />
          <nav className="flex justify-center">
            <ul className="flex">
              <Link to={`/${me.username}`} className={navLinksClass}>
                POSTS
              </Link>
              <Link to={`/${me.username}/reels`} className={navLinksClass}>
                REELS
              </Link>
              <Link
                to={`/${me.username}/saved`}
                className={`px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900 ${
                  highlighter && "bg-slate-900"
                }`}
              >
                SAVED
              </Link>
            </ul>
          </nav>
          <section id="posts" className="flex justify-center">
            {me.bookmarkedPosts.map((element) => {
              const { media, _id } = element;

              return (
                <div
                  className={`bg-black w-72 h-72 m-3 rounded-xl cursor-pointer overflow-hidden relative`}
                  key={_id}
                >
                  <div
                    className={`absolute h-full w-full top-0 left-0 bg-no-repeat bg-center bg-cover transition duration-200 hover:opacity-70`}
                    style={{ backgroundImage: `url('${media.url}')` }}
                  ></div>
                </div>
              );
            })}
          </section>
        </section>
      )}
    </main>
  );
};

Saved.propTypes = {
  refreshLoading: PropTypes.bool,
};

export default Saved;
