import React, { useMemo } from "react";
import { useAppDispatch } from "@/lib/utils/hooks/hooks";
import { Link } from "react-router-dom";
import { setPostAlert } from "@/slices/toggle.slice";

const PostTypePrompt: React.FC = () => {
  const btnClass = useMemo(() => {
    return "cursor-pointer text-center text-xl hover:bg-slate-300 transition duration-200 p-1 rounded-lg w-full";
  }, []);

  const dispatch = useAppDispatch();

  return (
    <div className="absolute bg-white text-[#161616] -translate-y-2 bottom-full left-0 p-2 w-[100%] rounded-lg z-10">
      <Link to={"/stories/create"}>
        <button className={btnClass}>Story</button>
      </Link>

      <button onClick={() => dispatch(setPostAlert(true))} className={btnClass}>
        Post
      </button>
    </div>
  );
};

export default PostTypePrompt;
