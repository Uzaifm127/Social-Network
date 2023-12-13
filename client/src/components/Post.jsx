import PropTypes from "prop-types";
import { RxDotsHorizontal } from "react-icons/rx";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";

const Post = ({ captionContent, postMediaSrc }) => {
  const [contentExpand, setContentExpand] = useState(false);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (captionContent.length > 115) {
      setCaption(captionContent.slice(0, 116));
      setContentExpand(false);
    } else {
      setContentExpand(true);
    }
  }, [captionContent.length, captionContent]);

  const likeToggle = () => setLiked((preValue) => !preValue);

  const toggleContExp = () => {
    if (contentExpand) {
      setCaption(captionContent.slice(0, 116));
    } else {
      setCaption(captionContent);
    }
    setContentExpand((preValue) => !preValue);
  };

  return (
    <>
      <li className='mb-8'>
        <section className="flex items-center w-full p-2">
          <article className="flex items-center">
            <img
              className="cursor-pointer rounded-full h-9"
              src={postMediaSrc}
              alt="User avatar"
            />
            <strong className="ml-2 text-sm cursor-pointer">uzaifm.404</strong>
            <span className="mx-1 cursor-pointer">•</span>
            <p className="text-sm cursor-pointer">3m</p>
          </article>
          <RxDotsHorizontal className="ml-auto text-xl cursor-pointer" />
        </section>
        <img
          onDoubleClick={() => setLiked(true)}
          className="w-[30rem] cursor-pointer rounded-lg"
          src={postMediaSrc}
          alt="Post Media"
        />
        <section className="flex py-3 mb-3">
          {liked ? (
            <GoHeartFill
              onClick={likeToggle}
              className="text-3xl cursor-pointer text-red-500"
            />
          ) : (
            <GoHeart onClick={likeToggle} className="text-3xl cursor-pointer" />
          )}
          <FaRegComment className="text-3xl cursor-pointer mx-5" />
          <LuSend className="text-3xl cursor-pointer" />
          <BsBookmark className="text-2xl cursor-pointer ml-auto" />
        </section>
        <p className="w-[30rem]">
          <span className="font-bold">uzaifm.404</span> {caption}
          <button className="text-slate-400" onClick={toggleContExp}>
            {contentExpand ? "Read Less" : "Read more..."}
          </button>
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
    </>
  );
};

Post.propTypes = {
  captionContent: PropTypes.string,
  postMediaSrc: PropTypes.string,
};

export default Post;
