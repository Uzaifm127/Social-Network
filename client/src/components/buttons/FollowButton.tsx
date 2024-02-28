import React from "react";
import clsx from "clsx";
import { FUButtonPropTypes } from "@/types/propTypes/index";

const FollowButton: React.FC<FUButtonPropTypes> = ({ onFUClick, loading }) => {
  return (
    <button
      onClick={onFUClick}
      className={clsx(
        "rounded-lg px-3 py-1.5 hover:bg-sky-400 transition duration-200 text-white",
        {
          "bg-sky-300": loading,
          "bg-sky-500": !loading,
        }
      )}
    >
      Follow
    </button>
  );
};

export default FollowButton;
