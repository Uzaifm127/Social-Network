import React, { useEffect, useMemo } from "react";
import placeholderImage from "@assets/Image Placeholder.png";
import FollowAlert from "@components/alerts/FollowAlert";
import UserSkewLoader from "@components/loaders/UserSkewLoader";
import toast from "react-hot-toast";
import SideBar from "@components/layouts/Sidebar";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks/hooks";
import { Link } from "react-router-dom";
import { SavedPT } from "@/types/propTypes";
import { setFollowAlert, setPostTypeAlert } from "@/slices/toggle.slice";
import { setHighlighter } from "@/slices/post.slice";

const Saved: React.FC<SavedPT> = ({ refreshLoading }) => {
  const navLinksClass = useMemo(() => {
    return "px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900";
  }, []);

  const { highlighter } = useAppSelector((state) => state.post);
  const { me } = useAppSelector((state) => state.user);
  const { followAlert } = useAppSelector((state) => state.toggle);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.location.pathname === `/${me?.username}/saved`) {
      dispatch(setHighlighter(true));
    }
  }, [me?.username, dispatch]);

  if (!me) {
    toast.error("You are not authenticated", { duration: 2500 });
    return <></>;
  }

  return (
    <main
      className="flex"
      onClick={() => {
        dispatch(setPostTypeAlert(false));
      }}
    >
      <SideBar loading={false} />
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
                  onClick={() => {
                    const payload = { alert: true, valueToAlert: "followers" };
                    dispatch(setFollowAlert(payload));
                  }}
                  className="mr-10"
                >
                  {me.followers.length} follower
                </button>

                <button
                  onClick={() => {
                    const payload = { alert: true, valueToAlert: "following" };
                    dispatch(setFollowAlert(payload));
                  }}
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

export default Saved;
