import React from "react";
import { FiCheckCircle } from "react-icons/fi";

const PostSuccess: React.FC = () => {
  return (
    <div>
      <FiCheckCircle className="text-7xl text-green-400 m-auto" />
      <h1 className="text-3xl mt-5">Post shared successfully</h1>
    </div>
  );
};

export default PostSuccess;
