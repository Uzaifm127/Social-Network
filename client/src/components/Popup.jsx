import PropTypes from "prop-types";

const Popup = ({ popupValue, popHeight, popWidth, popCoordinates }) => {
  return (
    <span
      className={`absolute ${popCoordinates} flex ${popHeight} ${popWidth}`}
    >
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff1032] opacity-75`}
      ></span>
      <span
        className={`relative inline-flex justify-center items-center rounded-full ${popHeight} ${popWidth} text-xs bg-[#ff1032]`}
      >
        {popupValue}
      </span>
    </span>
  );
};

Popup.propTypes = {
  popupValue: PropTypes.number,
  popHeight: PropTypes.string,
  popWidth: PropTypes.string,
  popCoordinates: PropTypes.string,
};

export default Popup;
