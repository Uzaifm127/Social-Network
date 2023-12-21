import PropTypes from "prop-types";

const FollowButton = ({ onFollowClick }) => {
  return (
    <button
      onClick={onFollowClick}
      className="rounded-lg px-3 py-1.5 bg-sky-500 hover:bg-sky-400 transition duration-200 text-white"
    >
      Follow
    </button>
  );
};

FollowButton.propTypes = {
  onFollowClick: PropTypes.func,
};

export default FollowButton;
