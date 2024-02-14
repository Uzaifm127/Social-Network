import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/utils/hooks/hooks";
import { useSharePostMutation } from "@services/post.api";
import Loader from "@components/loaders/Loader";
import { toast } from "react-hot-toast";
import PostSuccess from "@components/posts/PostSuccess";
import placeholder from "@assets/Image Placeholder.png";
import { setPostAlert } from "@/slices/toggle.slice";

const PostCaption: React.FC = () => {
  const [postCaption, setPostCaption] = useState<string>("");

  const [sharePost, { data, isSuccess, isLoading, error }] =
    useSharePostMutation();

  const { me } = useAppSelector((state) => state.user);
  const { postMedia } = useAppSelector((state) => state.post);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let timerId: number;

    if (isSuccess) {
      toast.success(data?.message || "Something went wrong");

      timerId = setTimeout(() => {
        dispatch(setPostAlert(false));
      }, 5000);
    } else if (error) {
      if ("status" in error) {
        toast.error(error.data?.message || "Something went wrong");
      }
    }

    return () => clearTimeout(timerId);
  }, [isSuccess, data, error, dispatch]);

  const submitPost = () => {
    const formData = new FormData();

    formData.append("postMedia", postMedia[0].file);
    formData.append("postCaption", postCaption);

    sharePost(formData);
  };

  return (
    <div
      className={`${
        isSuccess && "flex items-center justify-center"
      } relative text-center w-[28rem] h-[28rem]`}
    >
      {isLoading ? (
        <Loader
          color={"white"}
          size={80}
          loading={isLoading}
          css={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : isSuccess ? (
        <PostSuccess />
      ) : (
        <>
          <button
            className="absolute right-[2%] top-[-9.5%] rounded-lg px-3 py-1 bg-sky-500 cursor-pointer"
            onClick={submitPost}
          >
            Share
          </button>

          <div className="flex items-center p-4">
            <img
              src={me.avatar.url || placeholder}
              alt={me.username}
              className="rounded-full h-7"
            />
            <h2 className="text-white ml-3">{me.username}</h2>
          </div>
          <textarea
            maxLength={2200}
            cols={30}
            rows={8}
            value={postCaption}
            onChange={(e) => setPostCaption(e.target.value)}
            placeholder="write a caption..."
            className="w-full placeholder-slate-400 bg-[#353535] px-4 resize-none text-white border-none outline-none"
          ></textarea>
          <div className="ml-auto w-24">{postCaption?.length || 0}/2,200</div>
        </>
      )}
    </div>
  );
};

export default PostCaption;
