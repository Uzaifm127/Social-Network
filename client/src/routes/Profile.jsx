import { useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import placeholderImage from "../assets/Image Placeholder.png";

const navLinksClass = `px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900`;

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <main className="flex">
      <SideBar />
      <section className="m-16 w-[80%]">
        <section className="flex items-start mx-20">
          <img
            className="h-40 rounded-full"
            src={user.avatar.url || placeholderImage}
            alt={user.name}
          />
          <article className="ml-24">
            <div className="flex items-center mb-5">
              <h1 className="text-xl mr-5">{user.username}</h1>
              <Link to={"/accounts/edit"}>
                <button className="rounded-lg px-3 py-1.5 bg-slate-400 text-white">
                  Edit profile
                </button>
              </Link>
            </div>
            <div className="flex items-center mb-4">
              <h2 className="mr-10">{user.posts.length} posts</h2>
              <h2 className="mr-10">{user.followers.length} follower</h2>
              <h2 className="mr-10">{user.following.length} following</h2>
            </div>
            <h3 className="mb-2">{user.name}</h3>
            <p className="">{user.bio}</p>
          </article>
        </section>
        <hr className="w-full bg-black mt-40" />
        <nav className="flex justify-center">
          <ul className="flex">
            <Link to={`/${user.username}`} className={navLinksClass}>
              POSTS
            </Link>
            <Link to={`/${user.username}/reels`} className={navLinksClass}>
              REELS
            </Link>
            <Link to={`/${user.username}/saved`} className={navLinksClass}>
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
        </section>
      </section>
    </main>
  );
};

export default Profile;
