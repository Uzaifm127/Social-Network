import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import {
  useGetAllPostsQuery,
  usePostDislikeMutation,
  usePostLikeMutation,
} from "../services/postApi";
import { useCallback, useEffect, useState } from "react";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Feed = () => {
  const [postLimit, setPostLimit] = useState(15);

  const {
    isSuccess: allPostSuccess,
    data: allPostData,
    refetch,
  } = useGetAllPostsQuery(postLimit);
  const [postLike] = usePostLikeMutation();
  const [postDislike] = usePostDislikeMutation();

  const { feedPosts } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    if (allPostData) {
      const { feedPosts } = allPostData;

      dispatch({ type: "storePosts", payload: feedPosts });
    }
  }, [allPostSuccess, allPostData, dispatch]);

  const loadMoreData = useCallback(() => {
    const dataToFetch = postLimit + 15;

    refetch(dataToFetch);

    setPostLimit(dataToFetch);
  }, [refetch, postLimit]);

  const likePost = useCallback(
    (userId) => {
      postLike(userId);
    },
    [postLike]
  );

  const dislikePost = useCallback(
    (userId) => {
      postDislike(userId);
    },
    [postDislike]
  );

  const getPostTime = useCallback((createdDate) => {
    const currentDate = new Date();
    const postDate = new Date(createdDate);

    const postTime = currentDate - postDate;
    const postTimeDays = Math.floor(postTime / 1000 / 3600 / 24);
    const postTimeHours = Math.floor(postTime / 1000 / 3600);
    const postTimeMinutes = Math.floor(postTime / 1000 / 60);
    const postTimeSeconds = Math.floor(postTime / 1000);

    if (postTimeDays > 0) {
      return `${postTimeDays}d`;
    }
    if (postTimeHours > 0) {
      return `${postTimeHours}h`;
    }
    if (postTimeMinutes > 0) {
      return `${postTimeMinutes}m`;
    }
    if (postTimeSeconds > 0) {
      return `${postTimeSeconds}s`;
    }
  }, []);

  return (
    <ul className="flex flex-col items-center pt-5 box-border">
      <InfiniteScroll
        dataLength={feedPosts.length}
        hasMore={false}
        loader={<Loader />}
        next={loadMoreData}
      >
        {feedPosts.map((element) => {
          const { caption, _id, media, createdAt, likes, owner, comments } =
            element;
          const { avatar, username } = element.owner;


          return (
            <Post
              user={owner}
              captionContent={caption}
              avatar={avatar.url}
              username={username}
              createdAt={getPostTime(createdAt)}
              postMediaSrc={media.url}
              postId={_id}
              comments={comments}
              likePost={likePost}
              dislikePost={dislikePost}
              likesArray={likes}
              key={_id}
            />
          );
        })}
      </InfiniteScroll>
    </ul>
  );
};

export default Feed;
