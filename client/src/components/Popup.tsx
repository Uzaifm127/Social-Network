import React from "react";
import clsx from "clsx";
import { PopupPT } from "@/types/propTypes";

const Popup: React.FC<PopupPT> = ({
  popupValue,
  popHeight,
  popWidth,
  popCoordinates,
}) => {
  return (
    <span
      className={clsx("absolute flex", popCoordinates, popHeight, popWidth)}
    >
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff1032] opacity-75`}
      ></span>
      <span
        className={clsx(
          "relative inline-flex justify-center items-center rounded-full ${popHeight} ${popWidth} text-xs bg-[#ff1032]",
          popHeight,
          popWidth
        )}
      >
        {popupValue}
      </span>
    </span>
  );
};

export default Popup;
