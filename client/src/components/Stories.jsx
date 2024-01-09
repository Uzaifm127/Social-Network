import PropTypes from "prop-types";
import placeholder from "../assets/Image Placeholder.png";

const Stories = ({ storyRef }) => {
  return (
    <img
      ref={storyRef}
      className="h-14 mx-2 rounded-full"
      src={placeholder}
      alt=""
    />
  );
};

Stories.propTypes = {
  storyRef: PropTypes.object,
};

export default Stories;
