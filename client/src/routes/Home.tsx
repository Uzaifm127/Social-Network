import { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import SideBar from "@components/layouts/Sidebar";
import Stories from "@components/features/Stories";
import Feed from "@components/layouts/Feed";
import { ChevronsLeft, ChevronsRight } from "react-feather";
import { useAppDispatch } from "@/lib/utils/hooks/hooks";
import { useGetAllFollowingStoriesQuery } from "../services/stories.api";
import { useNavigate } from "react-router-dom";
import { setCurrentStory } from "@slices/story.slice";
import { setPostAlert } from "@/slices/toggle.slice";

const Home: React.FC = () => {
  const storiesRef = useRef<HTMLElement | null>(null);
  const storyRef = useRef<HTMLImageElement | null>(null);

  const { data } = useGetAllFollowingStoriesQuery();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const moveStories: MouseEventHandler<SVGElement> = useCallback((e) => {
    const clickedValue = (e.target as HTMLButtonElement).getAttribute(
      "data-scroll-clicked"
    );

    if (!storyRef.current || !storiesRef.current) {
      return;
    }

    const storyWidth = storyRef.current.clientWidth;

    const storyStyles = getComputedStyle(storyRef.current);

    // Getting the actual margin values as an array of string.
    const marginLeftArray = storyStyles.marginLeft.match(/[0-9]/g);
    const marginRightArray = storyStyles.marginRight.match(/[0-9]/g);

    if (!marginLeftArray || !marginRightArray) {
      return;
    }

    // Converting the array into string and margin values into string.
    const marginLeft = Number.parseInt(marginLeftArray.join(""));
    const marginRight = Number.parseInt(marginRightArray.join(""));

    const storyMarginFull = marginLeft + marginRight;

    // Getting the pixels to scroll horizontally by adding width and margin.
    const pxToScroll = storyWidth + storyMarginFull;

    if (clickedValue === "right") {
      storiesRef.current.scrollLeft -= pxToScroll;
    } else {
      storiesRef.current.scrollLeft += pxToScroll;
    }
  }, []);

  return (
    <main className="flex" onClick={() => dispatch(setPostAlert(false))}>
      <SideBar loading={false} />
      <section className="w-[53%] border px-14">
        <div className="relative">
          {/* { data?.stories[0]?.userStories.length > 0 && ( */}
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
              className="w-[100%] flex items-center h-20 mt-6 box-border overflow-x-scroll scroll-smooth scrollbar-hide"
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
          {/* )} */}
        </div>
        <Feed />
      </section>
    </main>
  );
};

export default Home;
