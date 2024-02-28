import React, {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { RxCross2 } from "react-icons/rx";
import { MoreHorizontal } from "react-feather";
import { Heart, MessageCircle, Send, Bookmark } from "react-feather";
import { toast } from "react-hot-toast";
import {
  useBookmarkMutation,
  usePostDislikeMutation,
  usePostLikeMutation,
} from "@services/post.api";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
  useReplyCommentMutation,
} from "@services/comment.api";
import WhiteScreen from "@components/loaders/WhiteScreenLoader";
import Comment from "@components/features/Comment";
import CommentSkeletonLoader from "@components/loaders/CommentSkeletonLoader";
import { useGetUserProfile } from "@hooks/custom/useGetUserProfile";
import { SimpleResponse } from "@/types";
import { useIsPostLiked } from "@/lib/utils/hooks/custom/useIsPostLiked";
import { setCommentType } from "@/slices/comment.slice";

const PostPreview: React.FC = () => {
  const [comment, setComment] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(false);
  const [bookMarked, setBookMarked] = useState<boolean>(false);

  const { me } = useAppSelector((state) => state.user);
  const { currentPost } = useAppSelector((state) => state.post);
  const { commentType, repliedCommentId } = useAppSelector(
    (state) => state.comment
  );

  // Calling the custom hooks
  const getUser = useGetUserProfile();
  const hasLiked = useIsPostLiked();

  const commentResult = useGetCommentsQuery(currentPost?._id || "");
  const { data: allCommentsData, isLoading: getCommentLoading } = commentResult;

  const [postLike] = usePostLikeMutation();
  const [postDislike] = usePostDislikeMutation();

  const [addComment, addCommentResult] = useAddCommentMutation();
  const {
    data: commentData,
    isSuccess: commentSuccess,
    isLoading: commentLoading,
    error: commentError,
  } = addCommentResult;

  const [replyComment, replyResult] = useReplyCommentMutation();
  const {
    data: replyData,
    isSuccess: replySuccess,
    isLoading: replyPostLoading,
    error: replyError,
  } = replyResult;

  const [bookmark, bookmarkResult] = useBookmarkMutation();
  const {
    data: bookmarkData,
    isSuccess: bookmarkSuccess,
    error: bookmarkError,
  } = bookmarkResult;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const isBookmarked = me?.bookmarkedPosts.some((element) => {
      if (currentPost) {
        return element._id === currentPost._id;
      }
    });

    if (isBookmarked) {
      setBookMarked(true);
    }
  }, [me?.bookmarkedPosts, currentPost]);

  useEffect(() => {
    // Checking if user already liked the given post or not.
    if (currentPost && me && hasLiked(currentPost.likes, me)) {
      setLiked(true);
    }
  }, [hasLiked, currentPost, me]);

  useEffect(() => {
    if (bookmarkSuccess) {
      toast.success(bookmarkData?.message || "Something went wrong", {
        duration: 2500,
      });
    } else if (bookmarkError) {
      if ("status" in bookmarkError) {
        // you can access all properties of `FetchBaseQueryError` here
        toast.error(
          (bookmarkError.data as SimpleResponse).message ||
            "Something went wrong",
          {
            duration: 2500,
          }
        );
      } else {
        // you can access all properties of `SerializedError` here
        toast.error(bookmarkError.message || "Something went wrong", {
          duration: 2500,
        });
      }
    }
  }, [bookmarkSuccess, bookmarkData, bookmarkError]);

  useEffect(() => {
    if (commentSuccess) {
      toast.success(commentData?.message || "Something went wrong", {
        duration: 2500,
      });
      setComment("");
    } else if (commentError) {
      if ("status" in commentError) {
        // you can access all properties of `FetchBaseQueryError` here
        toast.error(
          (commentError.data as SimpleResponse).message ||
            "Something went wrong",
          {
            duration: 2500,
          }
        );
      } else {
        // you can access all properties of `SerializedError` here
        toast.error(commentError.message || "Something went wrong", {
          duration: 2500,
        });
      }
    }
  }, [commentData, commentSuccess, commentError]);

  useEffect(() => {
    if (replySuccess) {
      toast.success(replyData?.message || "Something went wrong", {
        duration: 2500,
      });
      setComment("");
    } else if (replyError) {
      if ("status" in replyError) {
        // you can access all properties of `FetchBaseQueryError` here
        toast.error(
          (replyError.data as SimpleResponse).message || "Something went wrong",
          {
            duration: 2500,
          }
        );
      } else {
        // you can access all properties of `SerializedError` here
        toast.error(replyError.message || "Something went wrong", {
          duration: 2500,
        });
      }
    }
  }, [replyData, replySuccess, replyError]);

  const onLikeDislike: MouseEventHandler<SVGElement> = useCallback(
    (e) => {
      const action = e.currentTarget.getAttribute("data-action");
      if (!currentPost) {
        return;
      }
      if (action === "like") {
        postLike(currentPost._id);
        setLiked(true);
      } else if (action === "double-click") {
        postLike(currentPost._id);
        setLiked(true);
      } else {
        postDislike(currentPost._id);
        setLiked(false);
      }
    },
    [postDislike, currentPost, postLike]
  );

  const addBookMark = useCallback(() => {
    if (currentPost) {
      setBookMarked(true);
      bookmark({ postId: currentPost._id, action: "add" });
    }
  }, [currentPost, bookmark]);

  const removeBookMark = useCallback(() => {
    if (currentPost) {
      setBookMarked(false);
      bookmark({ postId: currentPost._id, action: "remove" });
    }
  }, [currentPost, bookmark]);

  const onAddComment: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (!currentPost) {
        return;
      }

      if (commentType === "comment" && commentType) {
        addComment({ postId: currentPost._id, commentMessage: comment });
      } else {
        replyComment({ commentId: repliedCommentId, repliedMessage: comment });
      }
    },
    [
      addComment,
      comment,
      currentPost,
      commentType,
      replyComment,
      repliedCommentId,
    ]
  );

  const onReplyClick = useCallback((username: string): void => {
    setComment(`@${username} `);
  }, []);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { value } = e.target;
      const splittedValue = value.split(" ")[0];

      if (!allCommentsData || !("comments" in allCommentsData)) {
        return;
      }

      const isCommentReply = allCommentsData.comments.some((element) => {
        return `@${element.owner.username}` === splittedValue;
      });

      const isRepliesReply = allCommentsData.replies.some((element) => {
        return `@${element.owner.username}` === splittedValue;
      });

      if (isCommentReply || isRepliesReply) {
        dispatch(setCommentType("reply"));
      } else {
        dispatch(setCommentType("comment"));
      }

      setComment(value);
    },
    [dispatch, allCommentsData]
  );

  if (!currentPost || !allCommentsData || !("comments" in allCommentsData)) {
    return <></>;
  }

  return (
    <div
      className="fixed z-50 h-screen w-screen bg-[#00000090] flex items-center justify-center"
      onClick={() => navigate(-1)}
    >
      {(commentLoading || replyPostLoading) && <WhiteScreen />}
      <RxCross2
        className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-3xl text-white cursor-pointer font-bold"
        onClick={() => navigate(-1)}
      />
      <article
        className="bg-[#353535] flex rounded-xl h-[38rem] w-[70rem] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="flex items-center justify-center w-[55%]">
          <img src={currentPost?.media.url} alt="post-media" />
        </section>
        <hr className="h-full w-px bg-white" />
        <section className="text-white w-[45%]">
          <section className="flex w-full relative items-center p-4">
            <img
              onClick={() => getUser(currentPost.owner)}
              className="rounded-full h-9 cursor-pointer"
              src={currentPost.owner.avatar.url}
              alt={currentPost.owner.name}
            />
            <strong
              onClick={() => getUser(currentPost.owner)}
              className="ml-3 cursor-pointer"
            >
              {currentPost.owner.username}
            </strong>
            <MoreHorizontal
              className="cursor-pointer ml-auto"
              size={25}
              strokeWidth={1.5}
            />
          </section>
          <hr />
          {getCommentLoading ? (
            <section className="no-scrollbar">
              {[...new Array(6).keys()].map((element) => {
                return <CommentSkeletonLoader key={element} />;
              })}
            </section>
          ) : (
            <section id="comment" className="w-full overflow-auto h-[60%]">
              {/* <AutoSizer>
              {({ height, width }) => {
                return (
                  <List
                    className="scrollbar-hide"
                    height={height}
                    width={width}
                    itemCount={5}
                    itemSize={170}
                    // itemSize={getItemSize}
                  >
                    {({ style }) => {
                      return <Comment style={style} />;
                    }}
                  </List>
                );
              }}
            </AutoSizer> */}

              {allCommentsData.comments.map((element, index) => {
                const { _id, message, likes, replies, createdAt } = element;
                const { avatar, username } = element.owner;

                return (
                  <Comment
                    key={_id}
                    commentId={_id}
                    currentElement={index}
                    commentMessage={message}
                    avatar={avatar?.url}
                    commentUser={element.owner}
                    username={username}
                    replies={replies}
                    onReply={onReplyClick}
                    createdAt={createdAt}
                    commentLikes={likes}
                  />
                );
              })}
            </section>
          )}

          <hr />
          <section className="flex p-3 w-full h-[16%]">
            {liked ? (
              <Heart
                className="text-3xl cursor-pointer"
                onClick={onLikeDislike}
                data-action="dislike"
                fill="#f56565"
                color="#f56565"
                strokeWidth={1.5}
                size={32}
              />
            ) : (
              <Heart
                className="text-3xl cursor-pointer"
                onClick={onLikeDislike}
                data-action="like"
                strokeWidth={1.5}
                size={32}
              />
            )}
            <MessageCircle
              strokeWidth={1.5}
              size={32}
              className="text-3xl cursor-pointer mx-3"
            />
            <Send
              strokeWidth={1.5}
              size={32}
              className="text-3xl cursor-pointer"
            />

            {bookMarked ? (
              <Bookmark
                className="text-2xl cursor-pointer ml-auto"
                onClick={removeBookMark}
                fill="white"
                strokeWidth={1.5}
                size={32}
              />
            ) : (
              <Bookmark
                className="text-2xl cursor-pointer ml-auto"
                onClick={addBookMark}
                strokeWidth={1.5}
                size={32}
              />
            )}
          </section>
          <hr />
          <form
            onSubmit={onAddComment}
            className="flex h-[12.3%] px-3 items-center my-auto"
          >
            <input
              onChange={onInputChange}
              value={comment}
              autoComplete="off"
              autoCorrect="off"
              className="py-3 outline-none bg-[#363636] border border-white px-2 rounded-md block w-full"
              type="text"
              placeholder="Add a comment..."
            />
            <button
              className={`rounded-lg px-3 py-1.5 bg-sky-500 ml-2 hover:bg-sky-400 transition duration-200 text-white`}
              type="submit"
            >
              Post
            </button>
          </form>
        </section>
      </article>
    </div>
  );
};

export default PostPreview;
