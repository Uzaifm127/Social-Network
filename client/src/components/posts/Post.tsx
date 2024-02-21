import React, { MouseEventHandler } from "react";
import WhiteScreen from "@components/loaders/WhiteScreenLoader";
import placeholder from "@assets/Image Placeholder.png";
import { PostPropTypes } from "@/types/propTypes/index";
import { Link } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import { useCallback, useEffect, useState } from "react";
import { useAddCommentMutation } from "@services/comment.api";
import { toast } from "react-hot-toast";
import { useBookmarkMutation } from "@services/post.api";
import { Heart, MessageCircle, Send, Bookmark } from "react-feather";
import { useGetTime } from "@hooks/custom/useGetTime";
import { useGetUserProfile } from "@hooks/custom/useGetUserProfile";
import { useAppSelector, useAppDispatch } from "@hooks/hooks";
import { Post } from "@/types/states/post.types";
import { setCurrentPost } from "@/slices/post.slice";
import { SimpleResponse } from "@/types";
import { useIsPostLiked } from "@/lib/utils/hooks/custom/useIsPostLiked";

const Post: React.FC<PostPropTypes> = ({
  captionContent,
  postMediaSrc,
  avatar,
  username,
  createdAt,
  likePost,
  postId,
  dislikePost,
  likesArray,
  user,
  currentPost,
  comments,
}) => {
  // Calling the useStates
  const [contentExpand, setContentExpand] = useState<boolean>(false);
  const [bookMarked, setBookMarked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");

  // Calling the custom hooks
  const getUser = useGetUserProfile();
  const postTime = useGetTime(createdAt);
  const hasLiked = useIsPostLiked();

  // Calling the APIs hooks
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
    bookmark,
    { data: bookmarkData, isSuccess: bookmarkSuccess, error: bookmarkError },
  ] = useBookmarkMutation();

  // useSelectors
  const { me } = useAppSelector((state) => state.user);

  // useDispatch
  const dispatch = useAppDispatch();

  // useEffects for the side effects
  useEffect(() => {
    const isBookmarked = me.bookmarkedPosts.some((element: Post) => {
      return element._id === postId;
    });

    if (isBookmarked) {
      setBookMarked(true);
    }
  }, [me.bookmarkedPosts, postId]);

  useEffect(() => {
    // there will be a bug when you implement who liked your post.

    // Checking if user already liked the given post or not.
    if (hasLiked(likesArray, me)) {
      setLiked(true);
    }
  }, [likesArray, me, hasLiked]);

  useEffect(() => {
    if (captionContent.length > 115) {
      setCaption(captionContent.slice(0, 116));
      setContentExpand(false);
    } else {
      setCaption(captionContent);
      setContentExpand(true);
    }
  }, [captionContent.length, captionContent]);

  useEffect(() => {
    if (bookmarkSuccess) {
      toast.success(bookmarkData?.message || "Something went wrong", {
        duration: 2500,
      });
      setComment("");
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

  // Custom functions
  const likeDislikeHandler: MouseEventHandler = useCallback(
    (e) => {
      const action = e.currentTarget.getAttribute("data-action");

      if (action === "like") {
        likePost(postId);
        setLiked(true);
      } else if (action === "double-click") {
        likePost(postId);
        setLiked(true);
      } else {
        dislikePost(postId);
        setLiked(false);
      }
    },
    [likePost, postId, dislikePost]
  );

  const toggleContExp = useCallback(() => {
    if (contentExpand) {
      setCaption(captionContent.slice(0, 116));
    } else {
      setCaption(captionContent);
    }
    setContentExpand((preValue) => !preValue);
  }, [captionContent, contentExpand]);

  const addBookMark = useCallback(() => {
    setBookMarked(true);
    bookmark({ postId, action: "add" });
  }, [postId, bookmark]);

  const removeBookMark = useCallback(() => {
    setBookMarked(false);
    bookmark({ postId, action: "remove" });
  }, [postId, bookmark]);

  const onAddComment = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      addComment({ postId, commentMessage: comment });
    },
    [addComment, comment, postId]
  );

  const viewComments = useCallback(() => {
    dispatch(setCurrentPost(currentPost));
  }, [currentPost, dispatch]);

  return (
    <li className="pb-8">
      {commentLoading && <WhiteScreen />}
      <section className="flex items-center w-full p-2">
        <article className="flex items-center">
          <img
            onClick={() => getUser(user)}
            className="cursor-pointer rounded-full h-9"
            src={avatar || placeholder}
            alt="User avatar"
          />

          <strong
            onClick={() => getUser(user)}
            className="ml-2 text-sm cursor-pointer"
          >
            {username}
          </strong>

          <span className="mx-1 cursor-pointer">•</span>
          <p className="text-sm cursor-pointer">{postTime}</p>
        </article>
        <RxDotsHorizontal className="ml-auto text-xl cursor-pointer" />
      </section>
      <img
        onDoubleClick={likeDislikeHandler}
        data-action="double-click"
        className="w-[30rem] cursor-pointer rounded-lg"
        src={postMediaSrc}
        alt="Post Media"
      />
      <section className="flex py-3 mb-3">
        {liked ? (
          <Heart
            className="cursor-pointer"
            onClick={likeDislikeHandler}
            data-action="dislike"
            fill="#ff1032"
            color="#ff1032"
            strokeWidth={1.5}
            size={32}
          />
        ) : (
          <Heart
            className="cursor-pointer"
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
        <Send strokeWidth={1.5} size={32} className="text-3xl cursor-pointer" />

        {bookMarked ? (
          <Bookmark
            className="text-2xl cursor-pointer ml-auto"
            onClick={removeBookMark}
            fill="black"
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
      <p className="w-[30rem]">
        <span className="font-bold">{username}</span> {caption}
        {!contentExpand && (
          <button className="text-slate-400" onClick={toggleContExp}>
            {contentExpand ? "Read Less" : "Read more..."}
          </button>
        )}
      </p>
      {comments.length !== 0 && (
        <Link to={`/p/${postId}`}>
          <button
            onClick={viewComments}
            className="text-slate-400 cursor-pointer py-2"
          >
            View all {comments.length} comments
          </button>
        </Link>
      )}
      <form onSubmit={onAddComment} className="flex items-center">
        <input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          autoComplete="off"
          autoCorrect="off"
          className="py-3 outline-none border-none block w-full"
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

      <hr className="bg-slate-600" />
    </li>
  );
};

export default Post;
