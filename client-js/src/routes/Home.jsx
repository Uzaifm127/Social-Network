import SideBar from "../components/SideBar";
import Stories from "../components/Stories";
import Feed from "../components/Feed";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { ChevronsLeft, ChevronsRight } from "react-feather";
import { useDispatch } from "react-redux";
import { useGetAllFollowingStoriesQuery } from "../services/stories.api";
import { useNavigate } from "react-router-dom";
import { setCurrentStory } from "../reducers/story.slice";

const Home = () => {
  // Connecting to the WebSocket server on component mount at only one times.
  const socket = useMemo(
    () => new WebSocket(import.meta.env.VITE_APP_WSS_URL),
    []
  );

  const storiesRef = useRef(null);
  const storyRef = useRef(null);

  const { data } = useGetAllFollowingStoriesQuery();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      socket.close();
    };
  }, [socket]);

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
          {data?.stories[0]?.userStories.length > 0 && (
            <>
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
                {data?.stories.map((element) => {
                  const { username, _id } = element;

                  return (
                    <Stories
                      key={element._id}
                      onStoryClick={() => {
                        dispatch(setCurrentStory(element));
                        navigate(`/stories/${username}/${_id}`);
                      }}
                      storyHeight={"h-14"}
                      storyRef={storyRef}
                      userAvatar={element.userAvatar}
                    />
                  );
                })}
              </section>
            </>
          )}
        </div>
        <Feed />
      </section>
    </main>
  );
};

export default Home;