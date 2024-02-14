import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks/hooks";
import PostCrop from "@components/posts/PostCrop";
import PostCropPreview from "@components/posts/PostCropPreview";
import PostPrompt from "@components/posts/PostPrompt";
import PostCaption from "@components/posts/PostCaption";
import { setPostAlert, setPostCropAlert } from "@/slices/toggle.slice";
import { resetMediaPost } from "@/slices/post.slice";

const CreatePost: React.FC = () => {
  const [postPreview, setPostPreview] = useState<string>("");
  const [next, setNext] = useState<boolean>(false);

  const postContent = useRef<ReactNode | null>(null);

  const { postCropAlert, postAlert } = useAppSelector((state) => state.toggle);
  const { postMedia } = useAppSelector((state) => state.post);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // This code doesn't run when given states in the array changes but run when the component unmount with the older states.
    return () => {
      dispatch(resetMediaPost());
    };
  }, [dispatch, postAlert]);

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    if (input.files) {
      const file = input.files[0];

      setPostPreview(window.URL.createObjectURL(file));

      dispatch(setPostCropAlert(true));
    }
  };

  if (next) {
    postContent.current = <PostCaption />;
  } else if (postMedia.length > 0) {
    postContent.current = <PostCropPreview nextButton={setNext} />;
  } else {
    postContent.current = <PostPrompt onChange={inputChange} />;
  }

  return (
    <div
      className="fixed z-10 h-screen w-screen bg-[#00000090] flex items-center justify-center"
      onClick={() => dispatch(setPostAlert(false))}
    >
      <RxCross2
        className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-3xl text-white cursor-pointer font-bold"
        onClick={() => dispatch(setPostAlert(false))}
      />
      <article
        className="bg-[#353535] text-white rounded-xl overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setPostAlert(true));
        }}
      >
        {postCropAlert && <PostCrop Image={postPreview} />}
        <h1 className="text-center py-3 text-lg">Create new post</h1>
        <hr />
        {postContent.current}
      </article>
    </div>
  );
};

export default CreatePost;
