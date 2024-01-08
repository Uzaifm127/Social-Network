import PropTypes from "prop-types";
import { Heart } from "react-feather";
import { useCallback, useEffect, useState } from "react";
import { useGetTime } from "../utils/hooks/useGetTime";
import { useDispatch, useSelector } from "react-redux";
import placeholder from "../assets/Image Placeholder.png";
import CommentReplies from "./CommentReplies";
import {
  useDislikeCommentMutation,
  useLikeCommentMutation,
} from "../services/commentApi";

const Comment = ({
  avatar,
  username,
  commentMessage,
  commentLikes,
  replies,
  currentElement,
  createdAt,
  commentId,
  onReply,
}) => {
  const [commentLike, setCommentLike] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const { currentPost } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const commentTime = useGetTime(createdAt);

  const [dislikeComment] = useDislikeCommentMutation();
  const [likeComment] = useLikeCommentMutation();

  useEffect(() => {
    const isCommentLiked = commentLikes?.some((element) => {
      return element._id === me._id;
    });

    if (isCommentLiked) {
      setCommentLike(true);
    }
  }, [commentLikes, me._id]);

  const likeDislikeHandler = useCallback(
    (e) => {
      const action = e.currentTarget.getAttribute("data-action");

      if (action === "like") {
        likeComment(commentId);
        setCommentLike(true);
      } else if (action === "dislike") {
        dislikeComment(commentId);
        setCommentLike(false);
      }
    },
    [commentId, dislikeComment, likeComment]
  );

  return (
    <section className="flex w-full relative items-start p-4">
      <img
        className="rounded-full h-9 cursor-pointer"
        src={avatar || placeholder}
        alt={username}
      />

      <div className="flex items-start flex-col ml-3">
        <p>
          <span className="font-bold cursor-pointer">{username}</span>
          {username === currentPost.owner.username && (
            <span className="bg-slate-300 pointer-events-none text-[0.7rem] ml-1 relative -top-[0.2rem] text-slate-700 px-1 py-1 rounded-[0.2rem]">
              Author
            </span>
          )}{" "}
          {commentMessage}
        </p>
        <div className="flex mt-2 text-gray-300">
          <span>{commentTime}</span>
          {currentElement !== 0 && (
            <>
              <span className="flex items-center mx-3 cursor-pointer">
                {commentLike ? (
                  <Heart
                    className="mr-2 cursor-pointer"
                    onClick={likeDislikeHandler}
                    data-action="dislike"
                    fill="#f56565"
                    color="#f56565"
                    strokeWidth={1.5}
                    size={16}
                  />
                ) : (
                  <Heart
                    className="mr-2 cursor-pointer"
                    onClick={likeDislikeHandler}
                    data-action="like"
                    strokeWidth={1.5}
                    size={16}
                  />
                )}
                {commentLikes?.length !== 0 && (
                  <>{commentLikes?.length} likes</>
                )}
              </span>
              <button
                onClick={() => {
                  dispatch({ type: "changeCommentType", payload: "reply" });
                  dispatch({
                    type: "storeRepliedCommendId",
                    payload: commentId,
                  });
                  onReply(username);
                }}
                className="cursor-pointer"
              >
                Reply
              </button>
            </>
          )}
        </div>
        {replies.length !== 0 && (
          <div className="flex mt-2 text-gray-300 cursor-pointer">
            <span>-----</span>
            {showReplies ? (
              <button className="ml-3" onClick={() => setShowReplies(false)}>
                Hide replies
              </button>
            ) : (
              <button className="ml-3" onClick={() => setShowReplies(true)}>
                View replies ({replies.length})
              </button>
            )}
          </div>
        )}
        {showReplies && (
          <section id="replies" className="ml-7">
            {replies?.map((element) => {
              const { _id, message, likes, createdAt } = element;
              const { avatar, username } = element.owner;

              return (
                <CommentReplies
                  key={_id}
                  commentId={_id}
                  commentMessage={message}
                  avatar={avatar?.url}
                  username={username}
                  onReply={() => {
                    dispatch({ type: "changeCommentType", payload: "reply" });
                    dispatch({
                      type: "storeRepliedCommendId",
                      payload: commentId,
                    });
                    onReply(username);
                  }}
                  createdAt={createdAt}
                  commentLikes={likes}
                />
              );
            })}
          </section>
        )}
      </div>
    </section>
  );
};

Comment.propTypes = {
  avatar: PropTypes.string,
  commentMessage: PropTypes.string,
  createdAt: PropTypes.string,
  commentId: PropTypes.string,
  commentLikes: PropTypes.array,
  currentElement: PropTypes.number,
  onReply: PropTypes.func,
  replies: PropTypes.array,
  username: PropTypes.string,
};

export default Comment;
