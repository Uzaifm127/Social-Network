import React, { useMemo, useCallback, useEffect, MouseEvent } from "react";
import SideBar from "@components/layouts/Sidebar";
import placeholderImage from "@assets/Image Placeholder.png";
import FollowAlert from "@components/alerts/FollowAlert";
import UserSkewLoader from "@components/loaders/UserSkewLoader";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@hooks/hooks";
import { MyProfilePropTypes } from "@/types/propTypes";
import { Post } from "@/types/states/post.types";
import { setFollowAlert, setPostTypeAlert } from "@/slices/toggle.slice";

const MyProfile: React.FC<MyProfilePropTypes> = ({ refreshLoading }) => {
  const navLinksClass = useMemo(() => {
    return "px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900";
  }, []);

  const { highlighter } = useAppSelector((state) => state.post);

  const { me } = useAppSelector((state) => state.user);

  const { followAlert } = useAppSelector((state) => state.toggle);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.location.pathname === `/${me.username}`) {
      dispatch({ type: "setHighlighter", payload: true });
    }
  }, [me.username, dispatch]);

  const followClick = useCallback(
    (e: MouseEvent) => {
      const clickedValue = (e.target as HTMLButtonElement).getAttribute(
        "data-clicked"
      );

      const payload = { alert: true, valueToAlert: clickedValue };
      dispatch(setFollowAlert(payload));
    },
    [dispatch]
  );

  return (
    <main className="flex" onClick={() => dispatch(setPostTypeAlert(false))}>
      <SideBar loading={refreshLoading} />
      {followAlert.alert && !refreshLoading && (
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
                  onClick={followClick}
                  className="mr-10"
                >
                  {me.followers.length} follower
                </button>

                <button
                  data-clicked="following"
                  onClick={followClick}
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
              <Link
                to={`/${me.username}`}
                className={clsx(
                  "px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900",
                  {
                    "bg-slate-900": highlighter,
                  }
                )}
              >
                POSTS
              </Link>
              <Link to={`/${me.username}/reels`} className={navLinksClass}>
                REELS
              </Link>
              <Link to={`/${me.username}/saved`} className={navLinksClass}>
                SAVED
              </Link>
            </ul>
          </nav>
          <section id="posts" className="flex justify-center flex-wrap">
            {me.posts.map((element: Post) => {
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
      )}
    </main>
  );
};

export default MyProfile;
