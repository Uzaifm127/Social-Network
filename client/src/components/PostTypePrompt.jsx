import { useMemo } from "react";
import { useDispatch } from "react-redux";

const PostTypePrompt = () => {
  const btnClass = useMemo(() => {
    return "cursor-pointer text-center text-xl hover:bg-slate-300 transition duration-200 p-1 rounded-lg w-full";
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="absolute bg-white text-[#161616] -translate-y-2 bottom-full left-0 p-2 w-[100%] rounded-lg z-10">
      <button className={btnClass}>Story</button>
      <button
        onClick={() => {
          dispatch({ type: "postAlertToggle", payload: true });
        }}
        className={btnClass}
      >
        Post
      </button>
    </div>
  );
};

export default PostTypePrompt;
