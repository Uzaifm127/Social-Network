import React, { useCallback, useEffect, useRef, useState } from "react";
import StorySkewLoader from "@components/loaders/StorySkewLoader";
import { ChevronsLeft, ChevronsRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/lib/utils/hooks/hooks";
import { X, Play } from "react-feather";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Story as StoryTypes } from "@/types/states/story.types";

// bug - when refresh the page then all states of stories vanished and due to this there is no page for story as states are not available.

const Story: React.FC = () => {
  const [storyNumber, setStoryNumber] = useState<number>(0);

  const { currentStory } = useAppSelector((state) => state.story);
  // const { skewLoader } = useAppSelector((state) => state.app);
  const userStories = currentStory?.userStories as StoryTypes[];

  const navigate = useNavigate();

  const storyVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const storyDuration = userStories[storyNumber].duration;

    // const timeoutId = setTimeout(() => {
    //   setStoryNumber((prev) => prev + 1);
    // }, storyDuration);

    // return () => clearTimeout(timeoutId);
  }, [storyNumber, userStories]);

  const stopStartVideo = useCallback(() => {
    if (storyVideoRef.current.paused) {
      storyVideoRef.current.play();
    } else {
      storyVideoRef.current.pause();
    }
  }, []);

  return (
    <main className="flex justify-center items-center min-h-screen min-w-full bg-[#161616]">
      <X
        onClick={() => navigate("/")}
        className="absolute m-2 top-0 left-0 cursor-pointer"
        color="#fff"
      />
      <>
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {userStories.map((element) => (
              <CarouselItem key={element._id}>
                <div className="p-1">
                  <Card className="bg-zinc-900">
                    <CardContent className="flex aspect-[9/16] items-center justify-center p-6">
                      {element.storyType === "image" ? (
                        <img src={element.story.url} alt="user-story" />
                      ) : element.storyType === "video" ? (
                        <video src={element.story.url}></video>
                      ) : (
                        <></>
                      )}
                      <span className="text-4xl font-semibold"></span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </>
    </main>
  );
};

export default Story;

// const A = () => {
//   return (
//     <>
//       <ChevronsLeft
//         onClick={switchStory}
//         switch-button="left"
//         size={45}
//         className={`mx-20 p-1 rounded-full bg-white ${
//           storyNumber <= 0 && "opacity-40"
//         } right-full top-1/2 -translate-y-1/2 ${
//           storyNumber <= 0 ? "cursor-not-allowed" : "cursor-pointer"
//         }`}
//       />

//       <section className="w-[23rem] border relative overflow-hidden h-[88vh] rounded-2xl">
//         <section
//           id="stories-count"
//           className="flex absolute top-[2%] px-1 w-full z-10"
//         >
//           {/* To do - Animation work needs to be done */}
//           {userStories.map((element, index) => {
//             const { _id } = element;

//             return (
//               <div
//                 key={_id}
//                 className="h-1 rounded-full w-full overflow-hidden bg-[#ffffff80] mx-px"
//               >
//                 {index === storyNumber ? (
//                   <motion.div
//                     className="h-full bg-white"
//                     initial={{ width: "0%" }}
//                     animate={{ width: "100%" }}
//                     transition={{ duration: userStories[storyNumber].duration }}
//                   />
//                 ) : (
//                   <div className={`w-full h-full bg-slate-400`}></div>
//                 )}
//                 {/* <div
//             className={`w-full h-full ${
//                ? "bg-slate-400" : "bg-white"
//             } `}
//           ></div> */}
//               </div>
//             );
//           })}
//         </section>
//         <>
//           <div
//             className="w-full h-full blur-3xl"
//             style={{
//               background:
//                 userStories[storyNumber].storyType === "image"
//                   ? `url(${userStories[storyNumber].story.url})`
//                   : "#444",
//             }}
//           ></div>
//           {userStories[storyNumber].storyType === "image" && (
//             <img
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//               src={userStories[storyNumber].story.url}
//               alt=""
//             />
//           )}
//           {userStories[storyNumber].storyType === "video" && (
//             <>
//               {/* {isPaused && (
//           <Play
//             onClick={stopStartVideo}
//             color="#fff"
//             size={60}
//             fill="#fff"
//             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
//           />
//         )} */}
//               <video
//                 ref={storyVideoRef}
//                 src={userStories[storyNumber].story.url}
//                 // onLoadedMetadata={onVideoMetaDataLoaded}
//                 // onClick={stopStartVideo}
//                 // onPause={() => setIsPaused(true)}
//                 // onPlay={() => setIsPaused(false)}
//                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
//                 playsInline
//               ></video>
//             </>
//           )}
//         </>
//       </section>

//       <ChevronsRight
//         onClick={switchStory}
//         switch-button="right"
//         size={45}
//         className={`mx-20 p-1 rounded-full bg-white ${
//           storyNumber >= userStories.length - 1 && "opacity-40"
//         } right-full top-1/2 -translate-y-1/2 ${
//           storyNumber >= userStories.length - 1
//             ? "cursor-not-allowed"
//             : "cursor-pointer"
//         }`}
//       />
//     </>
//   );
// };
