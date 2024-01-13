import SideBar from "../components/SideBar";
import Stories from "../components/Stories";
import Feed from "../components/Feed";
import { useCallback, useEffect, useRef } from "react";
import { ChevronsLeft, ChevronsRight } from "react-feather";
import { useDispatch } from "react-redux";

const Home = () => {
  const storiesRef = useRef(null);
  const storyRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const moveStories = useCallback((e) => {
    const clickedValue = e.target.getAttribute("data-scroll-clicked");

    const storyWidth = storyRef.current.clientWidth;
    const marginLeft = getComputedStyle(storyRef.current).marginLeft.match(
      /[0-9]/
    )[0];
    const marginRight = getComputedStyle(storyRef.current).marginRight.match(
      /[0-9]/
    )[0];

    const storyMarginFull =
      Number.parseInt(marginRight) + Number.parseInt(marginLeft);

    const pxToScroll = storyWidth + storyMarginFull;

    if (clickedValue === "right") {
      storiesRef.current.scrollLeft -= pxToScroll;
    } else {
      storiesRef.current.scrollLeft += pxToScroll;
    }
  }, []);

  const removeAllAlerts = useCallback(() => {
    dispatch({ type: "postTypeAlertToggle", payload: false });
  }, [dispatch]);

  return (
    <main className="flex" onClick={removeAllAlerts}>
      <SideBar />
      <section className="w-[53%] border px-14">
        <div className="relative">
          <ChevronsLeft
            onClick={moveStories}
            data-scroll-clicked="left"
            className="absolute rounded-full bg-gray-300 right-full top-1/2 -translate-y-1/2 p-px cursor-pointer"
          />
          <ChevronsRight
            onClick={moveStories}
            data-scroll-clicked="right"
            className="absolute rounded-full bg-gray-300 left-full top-1/2 -translate-y-1/2 p-px cursor-pointer"
          />
          <section
            ref={storiesRef}
            className="w-[100%] flex items-center h-20 mt-6 box-border overflow-x-scroll scroll-smooth no-scrollbars"
          >
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
            <Stories storyHeight={"h-14"} storyRef={storyRef} />
          </section>
        </div>
        <Feed />
      </section>
    </main>
  );
};

export default Home;
