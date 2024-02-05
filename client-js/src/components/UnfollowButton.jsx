import PropTypes from "prop-types";

const UnfollowButton = ({ onUnfollowClick, loading }) => {
  return (
    <button
      disabled={loading}
      onClick={onUnfollowClick}
      className={`rounded-lg px-3 py-1.5 ${
        loading ? "bg-slate-300" : "bg-slate-400"
      } hover:bg-slate-300 transition duration-200 text-white`}
    >
      Following
    </button>
  );
};

UnfollowButton.propTypes = {
  onUnfollowClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default UnfollowButton;
