import SideBar from "@components/layouts/Sidebar";
import FollowAlert from "@components/alerts/FollowAlert";
import placeholderImage from "@assets/Image Placeholder.png";
import UserSkewLoader from "@components/loaders/UserSkewLoader";
import { useAppSelector, useAppDispatch } from "@hooks/hooks";
import { Link } from "react-router-dom";
import React, { useCallback, useEffect, useMemo } from "react";
import { UserProfilePropTypes } from "@/types/propTypes/index";
import { useGetFollowStatus } from "@hooks/custom/useGetFollowStatus";
import { useGetUserProfileQuery } from "@services/user.api";
import { ClickEventType } from "@/types/index";

const UserProfile: React.FC<UserProfilePropTypes> = ({ userId }) => {
  const navLinksClass = useMemo(() => {
    return "px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900";
  }, []);

  const { data: userData, isLoading: userLoading } =
    useGetUserProfileQuery(userId);

  const { followButton } = useGetFollowStatus(userId);

  const { highlighter } = useAppSelector((state) => state.post);

  const { followAlert } = useAppSelector((state) => state.toggle);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.location.pathname === `/${userData?.user?.username}`) {
      dispatch({ type: "setHighlighter", payload: true });
    }

    return () => {
      dispatch({
        type: "followAlertToggle",
        payload: { alert: false, valueToAlert: undefined },
      });
    };
  }, [userData?.user?.username, dispatch]);

  const followClick = useCallback(
    (e: ClickEventType) => {
      const clickedValue = (e.target as HTMLButtonElement).getAttribute(
        "data-clicked"
      );

      dispatch({
        type: "followAlertToggle",
        payload: { alert: true, valueToAlert: clickedValue },
      });
    },
    [dispatch]
  );

  return (
    <main
      className="flex"
      onClick={() => {
        dispatch({ type: "postTypeAlertToggle", payload: false });
      }}
    >
      <SideBar loading={userLoading} />
      {followAlert.alert && !userLoading && (
        <FollowAlert
          following={userData?.user?.following}
          followers={userData?.user?.followers}
          primaryHeading={followAlert.valueToAlert}
        />
      )}
      {userLoading ? (
        <UserSkewLoader />
      ) : (
        <section className="m-16 w-[80%]">
          <section className="flex items-start mx-20">
            <img
              className="h-40 rounded-full cursor-pointer"
              src={userData?.user?.avatar?.url || placeholderImage}
              alt={userData?.user?.name}
            />
            <article className="ml-24">
              <div className="flex items-center mb-5">
                <h1 className="text-xl mr-5">{userData?.user?.username}</h1>
                {followButton}
              </div>
              <div className="flex items-center mb-4">
                <h2 className="mr-10">{userData?.user?.posts?.length} posts</h2>

                <button
                  data-clicked="followers"
                  onClick={followClick}
                  className="mr-10"
                >
                  {userData?.user?.followers?.length} follower
                </button>

                <button
                  data-clicked="following"
                  onClick={followClick}
                  className="mr-10"
                >
                  {userData?.user?.following.length} following
                </button>
              </div>
              <h3 className="mb-2">{userData?.user?.name}</h3>
              <p className="">{userData?.user?.bio}</p>
            </article>
          </section>
          <hr className="w-full bg-black mt-40" />
          <nav className="flex justify-center">
            <ul className="flex">
              <Link
                to={`/${userData?.user?.username}`}
                className={`px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900 ${
                  highlighter && "bg-slate-900"
                }`}
              >
                POSTS
              </Link>
              <Link
                to={`/${userData?.user?.username}/reels`}
                className={navLinksClass}
              >
                REELS
              </Link>
              <Link
                to={`/${userData?.user?.username}/saved`}
                className={navLinksClass}
              >
                SAVED
              </Link>
            </ul>
          </nav>
          <section id="posts" className="flex justify-center flex-wrap">
            {userData?.user?.posts.map((element) => {
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

export default UserProfile;
