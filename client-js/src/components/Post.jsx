import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAddCommentMutation } from "../services/commentApi";
import WhiteScreen from "./WhiteScreen";
import { toast } from "react-hot-toast";
import { useBookmarkMutation } from "../services/postApi";
import { Heart, MessageCircle, Send, Bookmark } from "react-feather";
import { useGetTime } from "../utils/hooks/useGetTime";
import { useGetUserProfile } from "../utils/hooks/useGetUserProfile";
import placeholder from "../assets/Image Placeholder.png";

const Post = ({
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
  const [contentExpand, setContentExpand] = useState(false);
  const [bookMarked, setBookMarked] = useState(false);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [caption, setCaption] = useState("");

  // Calling the custom hooks
  const getUser = useGetUserProfile();
  const postTime = useGetTime(createdAt);

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
    { data: bookmarkData, isSuccess: bookmarkSuccess, bookmarkError },
  ] = useBookmarkMutation();

  // useSelectors
  const { me } = useSelector((state) => state.user);

  // useDispatch
  const dispatch = useDispatch();

  // useEffects for the side effects
  useEffect(() => {
    const isBookmarked = me.bookmarkedPosts.some((element) => {
      return element._id === postId;
    });

    if (isBookmarked) {
      setBookMarked(true);
    }
  }, [me.bookmarkedPosts, postId]);

  useEffect(() => {
    // there will be a bug when you implement who liked your post.
    if (likesArray.includes(me._id)) {
      setLiked(true);
    }
  }, [likesArray, me._id]);

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

  // Custom functions 
  const likeDislikeHandler = useCallback(
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
    (e) => {
      e.preventDefault();

      addComment({ postId, commentMessage: comment });
    },
    [addComment, comment, postId]
  );

  const viewComments = useCallback(() => {
    dispatch({ type: "storeCurrentPost", payload: currentPost });
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

Post.propTypes = {
  captionContent: PropTypes.string,
  postMediaSrc: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  createdAt: PropTypes.string,
  likePost: PropTypes.func,
  dislikePost: PropTypes.func,
  postId: PropTypes.string,
  likesArray: PropTypes.array,
  comments: PropTypes.array,
  user: PropTypes.object,
  currentPost: PropTypes.object,
};

export default Post;
