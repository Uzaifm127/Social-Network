import React from "react";
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
      className={`${storyHeight} cursor-pointer mx-2 rounded-full p-[2px] border-2 border-green-500`}
      src={userAvatar || placeholder}
      alt="userStoryAvatar"
    />
  );
};

export default Stories;
