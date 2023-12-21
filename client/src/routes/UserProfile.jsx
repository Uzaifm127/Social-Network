import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { Link, Navigate } from "react-router-dom";
import placeholderImage from "../assets/Image Placeholder.png";
import { useEffect } from "react";
import FollowButton from "../components/FollowButton";

const navLinksClass = `px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900`;

const UserProfile = ({
  name,
  username,
  bio,
  avatar,
  followers,
  following,
  posts,
}) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <main className="flex">
      <SideBar />
      <section className="m-16 w-[80%]">
        <section className="flex items-start mx-20">
          <img
            className="h-40 rounded-full cursor-pointer"
            src={avatar.url || placeholderImage}
            alt={name}
          />
          <article className="ml-24">
            <div className="flex items-center mb-5">
              <h1 className="text-xl mr-5">{username}</h1>

              <FollowButton />
            </div>
            <div className="flex items-center mb-4">
              <h2 className="mr-10">{posts.length} posts</h2>
              <h2 className="mr-10">{followers.length} follower</h2>
              <h2 className="mr-10">{following.length} following</h2>
            </div>
            <h3 className="mb-2">{name}</h3>
            <p className="">{bio}</p>
          </article>
        </section>
        <hr className="w-full bg-black mt-40" />
        <nav className="flex justify-center">
          <ul className="flex">
            <Link to={`/${username}`} className={navLinksClass}>
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
          <div
            className={`bg-black bg-no-repeat bg-center bg-cover w-72 h-72 border m-3 rounded-xl cursor-pointer overflow-hidden relative`}
          >
            <div className="absolute h-full w-full top-0 left-0 bg-red-500 transition duration-200 hover:opacity-70"></div>
          </div>
          <div
            className={`bg-black bg-no-repeat bg-center bg-cover w-72 h-72 border m-3 rounded-xl cursor-pointer overflow-hidden relative`}
          >
            <div className="absolute h-full w-full top-0 left-0 bg-red-500 transition duration-200 hover:opacity-70"></div>
          </div>
          <div
            className={`bg-black bg-no-repeat bg-center bg-cover w-72 h-72 border m-3 rounded-xl cursor-pointer overflow-hidden relative`}
          >
            <div className="absolute h-full w-full top-0 left-0 bg-red-500 transition duration-200 hover:opacity-70"></div>
          </div>
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
};

export default UserProfile;
