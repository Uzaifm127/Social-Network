import React from "react";
import HashLoader from "react-spinners/HashLoader";

interface LoaderPropTypes {
  loading: boolean;
  size: number;
  css: object;
  color: string;
}

const Loader: React.FC<LoaderPropTypes> = ({ loading, size, css, color }) => {
  return (
    <HashLoader color={color} size={size} loading={loading} cssOverride={css} />
  );
};

export default Loader;
