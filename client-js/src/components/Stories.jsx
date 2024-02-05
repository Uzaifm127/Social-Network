import PropTypes from "prop-types";
import placeholder from "../assets/Image Placeholder.png";

const Stories = ({ storyRef, storyHeight, userAvatar, onStoryClick }) => {
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

Stories.propTypes = {
  storyHeight: PropTypes.string,
  storyRef: PropTypes.object,
  userAvatar: PropTypes.string,
  onStoryClick: PropTypes.func,
};

export default Stories;
