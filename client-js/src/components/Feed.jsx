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
    (postId) => {
      postLike(postId);
    },
    [postLike]
  );

  const dislikePost = useCallback(
    (postId) => {
      postDislike(postId);
    },
    [postDislike]
  );

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
              currentPost={element}
              captionContent={caption}
              avatar={avatar.url}
              username={username}
              // createdAt={getPostTime(createdAt)}
              createdAt={createdAt}
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
