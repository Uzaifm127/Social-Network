import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { useGetAllPostsQuery } from "../services/postApi";
import { useEffect, useState } from "react";
import placeholder from "../assets/Image Placeholder.png";
import Loader from "../components/Loader";

const Feed = () => {
  const [postLimit, setPostLimit] = useState(15);

  // const { isSuccess, data, refetch } = useGetAllPostsQuery(postLimit);

  // const { feedPosts } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // useEffect(() => {
  //   const { feedPosts } = data;

  //   dispatch({ type: "storePosts", payload: feedPosts });
  // }, [isSuccess, data, dispatch]);

  const loadMoreData = () => {
    const dataToFetch = postLimit + 15;

    refetch(dataToFetch);

    setPostLimit(dataToFetch);
  };

  const scrollHandler = () => {};

  // return feedPosts.map((element) => {
  //   return (
  //     <Post
  //       key={element._id}
  //       captionContent={element.caption}
  //       postMediaSrc={element.media.url}
  //     />
  //   );
  // });
  return (
    <ul className="flex flex-col items-center mt-5 box-border">
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Post
        captionContent={
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
        }
        postMediaSrc={placeholder}
      />
      <Loader />
    </ul>
  );
};

export default Feed;
