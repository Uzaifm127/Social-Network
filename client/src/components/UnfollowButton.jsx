import PropTypes from "prop-types";

const UnfollowButton = ({ onUnfollowClick }) => {
  return (
    <button
      onClick={onUnfollowClick}
      className="rounded-lg px-3 py-1.5 bg-sky-500 hover:bg-sky-400 transition duration-200 text-white"
    >
      Following
    </button>
  );
};

UnfollowButton.propTypes = {
  onUnfollowClick: PropTypes.func,
};

export default UnfollowButton;
