import { Link, Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import AvatarEditAlert from "../components/AvatarEditAlert";
import { useEffect, useState } from "react";
import { useEditProfileMutation } from "../services/userApi";
import toast from "react-hot-toast";
import placeholderImage from "../assets/Image Placeholder.png";
import CropImage from "../components/CropImage";
import Loader from "../components/Loader";

const EditProfile = () => {
  const [editProfile, { data, isSuccess, isLoading, isError, error }] =
    useEditProfileMutation();

  const { user, userCroppedImage, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { avatarAlert, cropAlert } = useSelector((state) => state.toggle);

  const [avatarPreview, setAvatarPreview] = useState(undefined);
  const [avatarPreviewToggle, setAvatarPreviewToggle] = useState(false);
  const [userEdit, setUserEdit] = useState({
    website: "",
    bio: "",
    gender: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setUserEdit((preObject) => {
      return {
        ...preObject,
        website: user.website,
        bio: user.bio,
        gender: user.gender,
      };
    });
  }, [user.website, user.bio, user.gender]);

  useEffect(() => {
    dispatch({ type: "avatarAlertToggle", payload: false });

    if (avatarPreview && avatarPreview !== "remove") {
      dispatch({ type: "cropAlertToggle", payload: true });
    }
  }, [avatarPreview, avatarPreviewToggle, dispatch]);

  // Handle API responses
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Something went wrong", {
        duration: 2500,
      });
    }
    if (isError) {
      toast.error(error.data?.message || "Something went wrong", {
        duration: 2500,
      });
    }
  }, [isSuccess, data, isError, error]);

  // Functions
  const inputChange = (event) => {
    const { name, value } = event.target;
    if (name === "avatar") {
      const file = event.target.files[0];

      setAvatarPreview(URL.createObjectURL(file));
      setAvatarPreviewToggle((preValue) => !preValue);

      // 2nd method to read the Image
      /*
      const reader = new FileReader();

      reader.onload = () => {
        setAvatarPreview(reader.result);
      };

      reader.readAsDataURL(file);
      */
    } else {
      setUserEdit((preValue) => ({ ...preValue, [name]: value }));
    }
  };

  const submitHandler = () => {
    const { website, bio, gender } = userEdit;

    const formData = new FormData();

    formData.append("website", website);
    formData.append("bio", bio);
    formData.append("gender", gender);

    if (!avatarPreview) {
      return editProfile(formData);
    } else if (avatarPreview === "remove") {
      formData.append("avatarMessage", "remove");
    } else {
      formData.append("avatar", userCroppedImage.file);
    }

    editProfile(formData);
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <main className="flex">
      {cropAlert && <CropImage Image={avatarPreview} />}
      {avatarAlert && <AvatarEditAlert setAvatarPreview={setAvatarPreview} />}
      <SideBar loading={isLoading} />
      <section className="mx-16 my-10 w-[80%]">
        <h1 className="font-bold text-3xl uppercase">Edit profile</h1>
        <section className="w-1/2 py-20 mx-auto">
          <div className="flex mb-10">
            <img
              onClick={() => {
                if (!isLoading) {
                  dispatch({ type: "avatarAlertToggle", payload: true });
                }
              }}
              className={`h-12 rounded-full ${
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              src={
                avatarPreview === "remove"
                  ? placeholderImage
                  : userCroppedImage.filePreview ||
                    user.avatar?.url ||
                    placeholderImage
              }
              alt={
                avatarPreview === "remove"
                  ? "placeholderImage"
                  : user.name || "user"
              }
            />
            <input
              id="edit-avatar"
              name="avatar"
              onChange={inputChange}
              type="file"
              hidden
            />
            <span className="ml-10">
              <h3>{user.username}</h3>
              <Link
                onClick={() => {
                  if (!isLoading) {
                    dispatch({ type: "avatarAlertToggle", payload: true });
                  }
                }}
                className={`text-sky-500 hover:text-sky-400 transition duration-150 ${
                  isLoading && "cursor-not-allowed"
                }`}
              >
                Change profile photo
              </Link>
            </span>
          </div>
          <div className="flex items-center my-3">
            <label htmlFor="website">Website</label>
            <input
              disabled={isLoading}
              id="website"
              name="website"
              type="text"
              value={userEdit.website || ""}
              onChange={inputChange}
              placeholder="Website"
              className={`p-2 w-3/4 ml-7 rounded-md border-none outline-none transition duration-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-base sm:leading-6 ${
                isLoading && "cursor-not-allowed"
              }`}
            />
          </div>
          <div className="flex items-start my-3">
            <label htmlFor="bio">Bio</label>
            <textarea
              disabled={isLoading}
              id="bio"
              name="bio"
              type="text"
              rows={3}
              value={userEdit.bio || ""}
              onChange={inputChange}
              placeholder="write bio..."
              className={`p-2 resize-none w-3/4 ml-[3.8rem] rounded-md border-none outline-none transition duration-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-lg sm:leading-6 ${
                isLoading && "cursor-not-allowed"
              }`}
            />
          </div>
          <div className="flex items-center my-3">
            <label htmlFor="gender">Gender</label>
            <select
              disabled={isLoading}
              name="gender"
              id="gender"
              className={`border ml-[1.85rem] p-1 rounded-md border-none outline-none transition duration-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-lg sm:leading-6 ${
                isLoading && "cursor-not-allowed"
              }`}
              onClick={inputChange}
            >
              <option value="">--Please choose a gender--</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div>
            <button
              type="button"
              disabled={isLoading}
              onClick={submitHandler}
              className={`flex items-center px-4 py-2 ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600"
              } rounded-lg text-white hover:bg-gray-400 focus:bg-gray-800 transition duration-200 mt-10`}
            >
              Submit
              {isLoading && (
                <Loader
                  size={15}
                  color={"#ffffff"}
                  css={{ marginLeft: "0.5rem" }}
                />
              )}
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default EditProfile;
