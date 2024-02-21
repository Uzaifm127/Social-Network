import placeholder from "@assets/Image Placeholder.png";
import { Heart } from "react-feather";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useGetTime } from "@hooks/custom/useGetTime";
import { useAppSelector } from "@/lib/utils/hooks/hooks";
import {
  useDislikeCommentMutation,
  useLikeCommentMutation,
} from "@services/comment.api";
import { useGetUserProfile } from "@hooks/custom/useGetUserProfile";
import { CommentRepliesPT } from "@/types/propTypes";

const CommentReplies: React.FC<CommentRepliesPT> = ({
  avatar,
  username,
  commentMessage,
  commentLikes,
  commentUser,
  createdAt,
  commentId,
  onReply,
}) => {
  const [commentLike, setCommentLike] = useState<boolean>(false);

  const { currentPost } = useAppSelector((state) => state.post);
  const { me } = useAppSelector((state) => state.user);

  const getUser = useGetUserProfile();
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

  const onLikeDislike: MouseEventHandler<SVGElement> = useCallback(
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
        onClick={() => getUser(commentUser)}
        className="rounded-full h-9 cursor-pointer"
        src={avatar || placeholder}
        alt={username}
      />

      <div className="flex items-start flex-col ml-3">
        <p>
          <span
            onClick={() => getUser(commentUser)}
            className="font-bold cursor-pointer"
          >
            {username}
          </span>
          {username === currentPost.owner.username && (
            <span className="bg-slate-300 pointer-events-none text-[0.7rem] ml-1 relative -top-[0.2rem] text-slate-700 px-1 py-1 rounded-[0.2rem]">
              Author
            </span>
          )}{" "}
          {commentMessage}
        </p>
        <div className="flex mt-2 text-gray-300">
          <span>{commentTime}</span>

          <>
            <span className="flex items-center mx-3 cursor-pointer">
              {commentLike ? (
                <Heart
                  className="mr-2 cursor-pointer"
                  onClick={onLikeDislike}
                  data-action="dislike"
                  fill="#f56565"
                  color="#f56565"
                  strokeWidth={1.5}
                  size={16}
                />
              ) : (
                <Heart
                  className="mr-2 cursor-pointer"
                  onClick={onLikeDislike}
                  data-action="like"
                  strokeWidth={1.5}
                  size={16}
                />
              )}
              {commentLikes?.length !== 0 && <>{commentLikes?.length} likes</>}
            </span>
            <button onClick={onReply} className="cursor-pointer">
              Reply
            </button>
          </>
        </div>
      </div>
    </section>
  );
};

export default CommentReplies;
