import React, { useCallback, useEffect, useState } from "react";
import {
  useGetAllPostsQuery,
  usePostDislikeMutation,
  usePostLikeMutation,
} from "@services/post.api";
import Post from "@components/posts/Post";
import Loader from "@components/loaders/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector, useAppDispatch } from "@hooks/hooks";
import { Post as PostElement } from "@/types/states/post.types";
import { setPosts } from "@/slices/post.slice";

const Feed: React.FC = () => {
  const [postLimit, setPostLimit] = useState<number>(15);

  const {
    isSuccess: allPostSuccess,
    data: allPostData,
    refetch,
  } = useGetAllPostsQuery(postLimit);
  const [postLike] = usePostLikeMutation();
  const [postDislike] = usePostDislikeMutation();

  const { feedPosts } = useAppSelector((state) => state.post);

  const dispatch = useAppDispatch();

  useEffect(() => {
    refetch();
  }, [postLimit, refetch]);

  useEffect(() => {
    if (allPostData) {
      const { feedPosts } = allPostData;
      dispatch(setPosts(feedPosts));
    }
  }, [allPostSuccess, allPostData, dispatch]);

  const loadMoreData = useCallback(() => {
    setPostLimit((prev) => prev + 15);
  }, []);

  const likePost = useCallback(
    (postId: string) => {
      postLike(postId);
    },
    [postLike]
  );

  const dislikePost = useCallback(
    (postId: string) => {
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
        {feedPosts.map((element: PostElement) => {
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
