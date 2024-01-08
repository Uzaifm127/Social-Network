import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { MoreHorizontal } from "react-feather";
import { useCallback, useEffect, useState } from "react";
import { Heart, MessageCircle, Send, Bookmark } from "react-feather";
import { toast } from "react-hot-toast";
// import { VariableSizeList as List } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
import {
  useBookmarkMutation,
  usePostDislikeMutation,
  usePostLikeMutation,
} from "../services/postApi";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
  useReplyCommentMutation,
} from "../services/commentApi";
import WhiteScreen from "../components/WhiteScreen";
import Comment from "../components/Comment";
import CommentSkeletonLoader from "../components/loaders/CommentSkeletonLoader";

const PostPreview = () => {
  const { me } = useSelector((state) => state.user);
  const { currentPost } = useSelector((state) => state.post);
  const { commentType, repliedCommentId } = useSelector(
    (state) => state.comment
  );

  const { data: allCommentsData, isLoading: getCommentLoading } =
    useGetCommentsQuery(currentPost._id);
  const [postLike] = usePostLikeMutation();
  const [postDislike] = usePostDislikeMutation();
  const [
    addComment,
    {
      data: commentData,
      isSuccess: commentSuccess,
      isLoading: commentLoading,
      error: commentError,
    },
  ] = useAddCommentMutation();

  const [
    replyComment,
    {
      data: replyData,
      isSuccess: replySuccess,
      isLoading: replyPostLoading,
      error: replyError,
    },
  ] = useReplyCommentMutation();

  const [
    bookmark,
    { data: bookmarkData, isSuccess: bookmarkSuccess, bookmarkError },
  ] = useBookmarkMutation();

  const [comment, setComment] = useState("");

  const [liked, setLiked] = useState(false);
  const [bookMarked, setBookMarked] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const isBookmarked = me.bookmarkedPosts.some((element) => {
      return element._id === currentPost._id;
    });

    if (isBookmarked) {
      setBookMarked(true);
    }
  }, [me.bookmarkedPosts, currentPost._id]);

  useEffect(() => {
    if (currentPost.likes.includes(me._id)) {
      setLiked(true);
    }
  }, [currentPost.likes, me._id]);

  useEffect(() => {
    if (bookmarkSuccess) {
      toast.success(bookmarkData?.message || "Something went wrong", {
        duration: 2500,
      });
    } else if (bookmarkError) {
      toast.error(bookmarkError.data?.message || "Something went wrong", {
        duration: 2500,
      });
    }
  }, [bookmarkSuccess, bookmarkData, bookmarkError]);

  useEffect(() => {
    if (commentSuccess) {
      toast.success(commentData?.message || "Something went wrong", {
        duration: 2500,
      });
      setComment("");
    } else if (commentError) {
      toast.error(commentError.data?.message || "Something went wrong", {
        duration: 2500,
      });
    }
  }, [commentData, commentSuccess, commentError]);

  useEffect(() => {
    if (replySuccess) {
      toast.success(replyData?.message || "Something went wrong", {
        duration: 2500,
      });
      setComment("");
    } else if (replyError) {
      toast.error(replyError.data?.message || "Something went wrong", {
        duration: 2500,
      });
    }
  }, [replyData, replySuccess, replyError]);

  const likeDislikeHandler = useCallback(
    (e) => {
      const action = e.currentTarget.getAttribute("data-action");

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
    [postDislike, currentPost._id, postLike]
  );

  const addBookMark = useCallback(() => {
    setBookMarked(true);
    bookmark({ postId: currentPost._id, action: "add" });
  }, [currentPost._id, bookmark]);

  const removeBookMark = useCallback(() => {
    setBookMarked(false);
    bookmark({ postId: currentPost._id, action: "remove" });
  }, [currentPost._id, bookmark]);

  const onAddComment = useCallback(
    (e) => {
      e.preventDefault();

      if (commentType === "comment" && commentType) {
        addComment({ postId: currentPost._id, commentMessage: comment });
      } else {
        replyComment({ commentId: repliedCommentId, repliedMessage: comment });
      }
    },
    [
      addComment,
      comment,
      currentPost._id,
      commentType,
      replyComment,
      repliedCommentId,
    ]
  );

  const onReplyClick = useCallback((username) => {
    setComment(`@${username} `);
  }, []);

  const onInputChange = useCallback(
    (e) => {
      const { value } = e.target;
      const splittedValue = value.split(" ")[0];

      const isCommentReply = allCommentsData.comments?.some((element) => {
        return `@${element.owner.username}` === splittedValue;
      });

      const isRepliesReply = allCommentsData.replies?.some((element) => {
        return `@${element.owner.username}` === splittedValue;
      });

      if (isCommentReply || isRepliesReply) {
        dispatch({ type: "changeCommentType", payload: "reply" });
      } else {
        dispatch({ type: "changeCommentType", payload: "comment" });
      }

      setComment(value);
    },
    [dispatch, allCommentsData?.replies, allCommentsData?.comments]
  );

  console.log(allCommentsData?.comments);

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
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <section className="flex items-center justify-center w-[55%]">
          <img src={currentPost?.media.url} alt="post-media" />
        </section>
        <hr className="h-full w-px bg-white" />
        <section className="text-white w-[45%]">
          <section className="flex w-full relative items-center p-4">
            <img
              className="rounded-full h-9 cursor-pointer"
              src={currentPost.owner.avatar.url}
              alt={currentPost.owner.name}
            />
            <strong className="ml-3 cursor-pointer">
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
            <section className="no-scrollbars">
              {[...new Array(6).keys()].map((element, index) => {
                return <CommentSkeletonLoader key={index} />;
              })}
            </section>
          ) : (
            <section id="comment" className="w-full overflow-auto h-[60%]">
              {/* <AutoSizer>
              {({ height, width }) => {
                return (
                  <List
                    className="no-scrollbars"
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

              {allCommentsData?.comments.map((element, index) => {
                const { _id, message, likes, replies, createdAt } = element;
                const { avatar, username } = element.owner;

                return (
                  <Comment
                    key={_id}
                    commentId={_id}
                    currentElement={index}
                    commentMessage={message}
                    avatar={avatar?.url}
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
                onClick={likeDislikeHandler}
                data-action="dislike"
                fill="#f56565"
                color="#f56565"
                strokeWidth={1.5}
                size={32}
              />
            ) : (
              <Heart
                className="text-3xl cursor-pointer"
                onClick={likeDislikeHandler}
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
