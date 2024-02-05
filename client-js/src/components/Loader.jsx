import HashLoader from "react-spinners/HashLoader";
import PropTypes from "prop-types";

const Loader = ({ loading, size, css, color }) => {
  return (
    <HashLoader color={color} size={size} loading={loading} cssOverride={css} />
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
  css: PropTypes.object,
};

export default Loader;
