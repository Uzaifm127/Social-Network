import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import PostCrop from "./PostCrop";
import PostCropPreview from "./PostCropPreview";
import PostPrompt from "./PostPrompt";
import PostCaption from "./PostCaption";

const CreatePost = () => {
  let postContent;

  const [postPreview, setPostPreview] = useState();
  const [next, setNext] = useState(false);

  const { postCropAlert, postAlert } = useSelector((state) => state.toggle);
  const { postMedia } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    // This code doesn't run when given states in the array changes but run when the component unmount with the older states.
    return () => {
      dispatch({ type: "resetMediaPost" });
    };
  }, [dispatch, postAlert]);

  const inputChange = (event) => {
    const file = event.target.files[0];

    setPostPreview(window.URL.createObjectURL(file));

    dispatch({ type: "postCropAlertToggle", payload: true });
  };

  if (next) {
    postContent = <PostCaption />;
  } else if (postMedia.length > 0) {
    postContent = <PostCropPreview nextButtonHandler={setNext} />;
  } else {
    postContent = <PostPrompt onChange={inputChange} />;
  }

  return (
    <div
      className="fixed z-10 h-screen w-screen bg-[#00000090] flex items-center justify-center"
      name="alertBack"
      onClick={() => {
        dispatch({ type: "postAlertToggle", payload: false });
      }}
    >
      <RxCross2
        className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-3xl text-white cursor-pointer font-bold"
        onClick={() => dispatch({ type: "postAlertToggle", payload: false })}
      />
      <article
        className="bg-[#353535] text-white rounded-xl overflow-hidden"
        name="mainAlert"
        onClick={(event) => {
          event.stopPropagation();
          dispatch({ type: "postAlertToggle", payload: true });
        }}
      >
        {postCropAlert && <PostCrop Image={postPreview} />}
        <h1 className="text-center py-3 text-lg">Create new post</h1>
        <hr />
        {postContent}
      </article>
    </div>
  );
};

export default CreatePost;
