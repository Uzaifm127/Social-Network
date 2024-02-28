import React from "react";
import clsx from "clsx";
import placeholder from "@assets/Image Placeholder.png";
import { StoriesPT } from "@/types/propTypes";

const Stories: React.FC<StoriesPT> = ({
  storyRef,
  storyHeight,
  userAvatar,
  onStoryClick,
}) => {
  return (
    <img
      ref={storyRef}
      onClick={onStoryClick}
      className={clsx(
        "cursor-pointer mx-2 rounded-full p-[2px] border-2 border-green-500",
        storyHeight
      )}
      src={userAvatar || placeholder}
      alt="userStoryAvatar"
    />
  );
};

export default Stories;
