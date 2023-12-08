import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";

const AvatarEditAlert = ({ setAvatarPreview }) => {
  const dispatch = useDispatch();

  return (
    <div className="h-screen w-screen bg-[#00000070] absolute top-0 left-0">
      <div
        id="alert-box"
        className="bg-zinc-700 text-white px-20 py-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl text-center"
      >
        <RxCross2
          className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-xl text-white cursor-pointer"
          onClick={() =>
            dispatch({ type: "avatarAlertToggle", payload: false })
          }
        />
        <h1 className="text-2xl mb-5 pointer-events-none">
          Change profile photo
        </h1>
        <ul>
          <li className="my-4">
            <label
              htmlFor="edit-avatar"
              className="text-sky-500 block cursor-pointer hover:text-sky-400 transition duration-150"
            >
              Upload Photo
            </label>
          </li>
          <li
            className="text-red-600 my-4 cursor-pointer hover:text-red-400 transition duration-150"
            onClick={() => {
              setAvatarPreview("remove");
              dispatch({ type: "avatarAlertToggle", payload: false });
            }}
          >
            Remove
          </li>
          <li
            className="cursor-pointer my-4"
            onClick={() =>
              dispatch({ type: "avatarAlertToggle", payload: false })
            }
          >
            Cancel
          </li>
        </ul>
      </div>
    </div>
  );
};

AvatarEditAlert.propTypes = {
  setAvatarPreview: PropTypes.func,
};

export default AvatarEditAlert;
