import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSharePostMutation } from "../services/postApi";
import Loader from "./Loader";
import { toast } from "react-hot-toast";
import PostSuccess from "./PostSuccess";
import placeholder from "../assets/Image Placeholder.png"

const PostCaption = () => {
  const [postCaption, setPostCaption] = useState();

  const [sharePost, { data, isSuccess, isError, isLoading, error }] =
    useSharePostMutation();

  const { me } = useSelector((state) => state.user);
  const { postMedia } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    let timerId;

    if (isSuccess) {
      toast.success(data?.message || "Something went wrong");

      timerId = setTimeout(() => {
        dispatch({ type: "postAlertToggle", payload: false });
      }, 5000);
    } else if (isError) {
      toast.error(error.data?.message || "Something went wrong");
    }

    return () => clearTimeout(timerId);
  }, [isSuccess, data, error, isError, dispatch]);

  const submitPost = () => {
    const data = new FormData();

    data.append("postMedia", postMedia[0].file);
    data.append("postCaption", postCaption);

    sharePost(data);
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
            maxLength="2200"
            cols="30"
            rows="8"
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
