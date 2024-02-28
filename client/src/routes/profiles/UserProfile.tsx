import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import SideBar from "@components/layouts/Sidebar";
import FollowAlert from "@components/alerts/FollowAlert";
import placeholderImage from "@assets/Image Placeholder.png";
import UserSkewLoader from "@components/loaders/UserSkewLoader";
import { useAppSelector, useAppDispatch } from "@hooks/hooks";
import { Link } from "react-router-dom";
import { UserProfilePropTypes } from "@/types/propTypes/index";
import { useGetFollowStatus } from "@hooks/custom/useGetFollowStatus";
import { useGetUserProfileQuery } from "@services/user.api";
import { setFollowAlert, setPostTypeAlert } from "@/slices/toggle.slice";
import { setHighlighter } from "@/slices/post.slice";

const UserProfile: React.FC<UserProfilePropTypes> = ({ userId }) => {
  const navLinksClass = useMemo(() => {
    return "px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900";
  }, []);

  const { data, isLoading } = useGetUserProfileQuery(userId);

  const { followButton } = useGetFollowStatus(userId);

  const { highlighter } = useAppSelector((state) => state.post);

  const { followAlert } = useAppSelector((state) => state.toggle);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.location.pathname === `/${data?.user?.username}`) {
      dispatch(setHighlighter(true));
    }

    return () => {
      dispatch(setFollowAlert({ alert: false, valueToAlert: "" }));
    };
  }, [data?.user?.username, dispatch]);

  const followClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const clickedValue = (e.target as HTMLButtonElement).getAttribute(
        "data-clicked"
      );

      if (!clickedValue) {
        return;
      }

      dispatch(setFollowAlert({ alert: true, valueToAlert: clickedValue }));
    },
    [dispatch]
  );

  return (
    <main className="flex" onClick={() => dispatch(setPostTypeAlert(false))}>
      <SideBar loading={isLoading} />
      {followAlert.alert && !isLoading && data && (
        <FollowAlert
          following={data.user.following}
          followers={data.user.followers}
          primaryHeading={followAlert.valueToAlert}
        />
      )}
      {isLoading ? (
        <UserSkewLoader />
      ) : (
        <section className="m-16 w-[80%]">
          <section className="flex items-start mx-20">
            <img
              className="h-40 rounded-full cursor-pointer"
              src={data?.user?.avatar?.url || placeholderImage}
              alt={data?.user?.name}
            />
            <article className="ml-24">
              <div className="flex items-center mb-5">
                <h1 className="text-xl mr-5">{data?.user?.username}</h1>
                {followButton}
              </div>
              <div className="flex items-center mb-4">
                <h2 className="mr-10">{data?.user?.posts?.length} posts</h2>

                <button
                  data-clicked="followers"
                  onClick={followClick}
                  className="mr-10"
                >
                  {data?.user?.followers?.length} follower
                </button>

                <button
                  data-clicked="following"
                  onClick={followClick}
                  className="mr-10"
                >
                  {data?.user?.following.length} following
                </button>
              </div>
              <h3 className="mb-2">{data?.user?.name}</h3>
              <p className="">{data?.user?.bio}</p>
            </article>
          </section>
          <hr className="w-full bg-black mt-40" />
          <nav className="flex justify-center">
            <ul className="flex">
              <Link
                to={`/${data?.user?.username}`}
                className={`px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900 ${
                  highlighter && "bg-slate-900"
                }`}
              >
                POSTS
              </Link>
              <Link
                to={`/${data?.user?.username}/reels`}
                className={navLinksClass}
              >
                REELS
              </Link>
              <Link
                to={`/${data?.user?.username}/saved`}
                className={navLinksClass}
              >
                SAVED
              </Link>
            </ul>
          </nav>
          <section id="posts" className="flex justify-center flex-wrap">
            {data?.user?.posts.map((element) => {
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
