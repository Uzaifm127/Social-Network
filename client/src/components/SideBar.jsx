import PropTypes from "prop-types";
import { TiHome } from "react-icons/ti";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { TbMessages } from "react-icons/tb";
import { PiPlusCircleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineExplore } from "react-icons/md";
import defaultAvatar from "../assets/Image Placeholder.png";
import MoreAlert from "./MoreAlert";

const navLinksClass = `flex items-center w-full p-3 cursor-pointer hover:bg-[#353535] rounded-lg transition duration-250 my-3`;

const navIconsClass = `text-3xl mr-5`;

const SideBar = ({ loading }) => {
  const { me } = useSelector((state) => state.user);
  const { moreAlert } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  return (
    <>
      <aside
        className={`flex w-[20%] bg-[#1e1e1e] text-white sticky top-0 h-screen ${
          loading && "cursor-not-allowed -z-50"
        }`}
      >
        <section className="my-10 w-full px-3">
          <header className="mb-12">
            <h1 className="font-extrabold text-3xl font-cursive pointer-events-none">
              Social Network
            </h1>
          </header>
          <nav>
            <ul>
              <li
                onClick={() =>
                  moreAlert && dispatch({ type: "moreAlertToggle" })
                }
              >
                <Link to={`/`} className={navLinksClass}>
                  <TiHome className={navIconsClass} />
                  Home
                </Link>
              </li>
              <li>
                <Link to={`/explore/search`} className={navLinksClass}>
                  <HiSearch className={navIconsClass} />
                  Search
                </Link>
              </li>
              <li>
                <Link to={`/explore`} className={navLinksClass}>
                  <MdOutlineExplore className={navIconsClass} />
                  Explore
                </Link>
              </li>
              <li className={navLinksClass}>
                <TbMessages className={navIconsClass} />
                Messages
              </li>
              <li
                className={navLinksClass}
                onClick={() => {
                  moreAlert && dispatch({ type: "moreAlertToggle" });
                  dispatch({ type: "postAlertToggle", payload: true });
                }}
              >
                <PiPlusCircleBold className={navIconsClass} />
                Post
              </li>
              <li>
                <Link to={`/${me.username}`} className={navLinksClass}>
                  <img
                    className="h-7 mr-5 rounded-full"
                    src={me.avatar?.url || defaultAvatar}
                    alt="avatar"
                  />
                  Profile
                </Link>
              </li>
              <li className="mt-12">
                {moreAlert && <MoreAlert />}
                <button
                  className={navLinksClass}
                  onClick={() =>
                    dispatch({ type: "moreAlertToggle", payload: undefined })
                  }
                >
                  <RxHamburgerMenu className={navIconsClass} />
                  More
                </button>
              </li>
            </ul>
          </nav>
        </section>
        <hr className="h-screen w-px bg-slate-400 rounded-full" />
      </aside>
    </>
  );
};

SideBar.propTypes = {
  loading: PropTypes.bool,
};

export default SideBar;
