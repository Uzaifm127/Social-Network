import { FUButtonPropTypes } from "@/types/propTypes/index";
import clsx from "clsx";
import React from "react";

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
