import { FUButtonPropTypes } from "@/types/propTypes/index";
import clsx from "clsx";

const UnfollowButton: React.FC<FUButtonPropTypes> = ({
  onFUClick,
  loading,
}) => {
  return (
    <button
      disabled={loading}
      onClick={onFUClick}
      className={clsx(
        "rounded-lg px-3 py-1.5 hover:bg-slate-300 transition duration-200 text-white",
        { "bg-slate-300": loading, "bg-slate-400": !loading }
      )}
    >
      Following
    </button>
  );
};

export default UnfollowButton;
