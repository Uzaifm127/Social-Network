import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useCallback, useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

const Post = ({
  captionContent,
  postMediaSrc,
  avatar,
  username,
  createdAt,
  likePost,
  userId,
  dislikePost,
  likesArray,
  user,
}) => {
  const [contentExpand, setContentExpand] = useState(false);
  const [bookMarked, setBookMarked] = useState(false);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [caption, setCaption] = useState("");

  const { me } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
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

  const getUserProfile = useCallback(() => {
    dispatch({ type: "setUser", payload: user });
  }, [dispatch, user]);

  const likeDislikeHandler = useCallback(
    (e) => {
      const action = e.currentTarget.getAttribute("data-action");

      if (action === "like") {
        likePost(userId);
        setLiked(true);
      } else if (action === "double-click") {
        likePost(userId);
        setLiked(true);
      } else {
        dislikePost(userId);
        setLiked(false);
      }
    },
    [likePost, userId, dislikePost]
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
  }, []);

  const removeBookMark = useCallback(() => {
    setBookMarked(false);
  }, []);

  return (
    <li className="pb-8">
      <section className="flex items-center w-full p-2">
        <article className="flex items-center">
          <Link to={`/${user?.username}`}>
            <img
              onClick={getUserProfile}
              className="cursor-pointer rounded-full h-9"
              src={avatar}
              alt="User avatar"
            />
          </Link>
          <Link to={`/${user?.username}`}>
            <strong
              onClick={getUserProfile}
              className="ml-2 text-sm cursor-pointer"
            >
              {username}
            </strong>
          </Link>
          <span className="mx-1 cursor-pointer">•</span>
          <p className="text-sm cursor-pointer">{createdAt}</p>
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
          <GoHeartFill
            data-action="dislike"
            onClick={likeDislikeHandler}
            className="text-3xl cursor-pointer text-red-500"
          />
        ) : (
          <GoHeart
            data-action="like"
            onClick={likeDislikeHandler}
            className="text-3xl cursor-pointer"
          />
        )}
        <FaRegComment className="text-3xl cursor-pointer mx-5" />
        <LuSend className="text-3xl cursor-pointer" />
        {bookMarked ? (
          <BsBookmarkCheckFill
            onClick={removeBookMark}
            className="text-2xl cursor-pointer ml-auto"
          />
        ) : (
          <BsBookmark
            onClick={addBookMark}
            className="text-2xl cursor-pointer ml-auto"
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
      <button className="text-slate-400 cursor-pointer py-2">
        View all 11 comments
      </button>
      <input
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        className="py-3 outline-none border-none block w-full"
        type="text"
        placeholder="Add a comment..."
      />
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
  userId: PropTypes.string,
  likesArray: PropTypes.array,
  user: PropTypes.object,
};

export default Post;
