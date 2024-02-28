import React, { useMemo } from "react";
import clsx from "clsx";
import defaultAvatar from "@assets/Image Placeholder.png";
import Popup from "@components/Popup";
import MoreAlert from "@components/alerts/MoreAlert";
import PostTypePrompt from "@components/posts/PostTypePrompt";
import toast from "react-hot-toast";
import { SideBarPropTypes } from "@/types/propTypes/index";
import { TiHome } from "react-icons/ti";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { TbMessages } from "react-icons/tb";
import { PiPlusCircleBold } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks/hooks";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineExplore } from "react-icons/md";
import { setMoreAlert, setPostTypeAlert } from "@/slices/toggle.slice";

const SideBar: React.FC<SideBarPropTypes> = ({ loading }) => {
  const { me } = useAppSelector((state) => state.user);
  const { moreAlert, postTypeAlert } = useAppSelector((state) => state.toggle);

  const navLinksClass: string = useMemo(() => {
    return `flex items-center w-full p-3 cursor-pointer hover:bg-[#353535] rounded-lg relative transition duration-250 my-3`;
  }, []);

  const navIconsClass: string = useMemo(() => `text-3xl mr-5`, []);

  const dispatch = useAppDispatch();

  if (!me) {
    toast.error("You are not authenticated", { duration: 2500 });
    return <></>;
  }

  return (
    <>
      <aside
        className={clsx(
          "flex w-[20%] bg-[#1e1e1e] text-white sticky top-0 h-screen",
          { "cursor-not-allowed -z-50": loading }
        )}
      >
        <section className="my-10 w-full px-3">
          <header className="mb-12">
            <h1 className="font-extrabold text-3xl font-cursive pointer-events-none">
              Social Network
            </h1>
          </header>
          <nav>
            <ul>
              <li onClick={() => dispatch(setMoreAlert(false))}>
                <Link to={`/`} className={navLinksClass}>
                  <TiHome className={navIconsClass} />
                  Home
                </Link>
              </li>
              <li onClick={() => dispatch(setMoreAlert(false))}>
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
                <Popup
                  popHeight={"h-5"}
                  popupValue={1}
                  popWidth={"w-5"}
                  popCoordinates={"top-[7%] left-[3%]"}
                />
                <TbMessages className={navIconsClass} />
                Messages
              </li>
              <li className="relative">
                {postTypeAlert && <PostTypePrompt />}
                <button
                  className={navLinksClass}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (moreAlert) {
                      dispatch(setMoreAlert(undefined));
                    }
                    dispatch(setPostTypeAlert(true));
                  }}
                >
                  <PiPlusCircleBold className={navIconsClass} />
                  Post
                </button>
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
                  onClick={() => dispatch(setMoreAlert(undefined))}
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

export default SideBar;
