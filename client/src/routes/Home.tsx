import { useEffect, useRef } from "react";
import SideBar from "@components/layouts/Sidebar";
import Feed from "@components/layouts/Feed";
import placeholder from "@assets/Image Placeholder.png";
import { useAppDispatch } from "@/lib/utils/hooks/hooks";
import { useGetAllFollowingStoriesQuery } from "../services/stories.api";
import { useNavigate } from "react-router-dom";
import { setCurrentStory } from "@slices/story.slice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home: React.FC = () => {
  const storyRef = useRef<HTMLImageElement | null>(null);

  const { data } = useGetAllFollowingStoriesQuery();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="flex">
      <SideBar loading={false} />
      <section className="w-[53%] border px-14">
        {data?.stories.length > 0 && (
          <Carousel className="w-full mt-6">
            <CarouselContent className="-ml-1 w-full">
              {data?.stories.map((element) => {
                const { username, _id } = element;

                return (
                  <CarouselItem key={_id} className="pl-1 basis-1/8">
                    <Avatar
                      ref={storyRef}
                      onClick={() => {
                        dispatch(setCurrentStory(element));
                        navigate(`/stories/${username}/${_id}`);
                      }}
                      className={
                        "cursor-pointer mx-2 p-[2px] border-2 border-green-500 h-14 w-14"
                      }
                    >
                      <AvatarImage
                        className="rounded-full"
                        src={placeholder}
                        alt={username}
                      />
                      <AvatarFallback>
                        {username.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
        <Feed />
      </section>
    </main>
  );
};

export default Home;
