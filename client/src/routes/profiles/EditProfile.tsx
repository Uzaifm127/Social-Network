import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import SideBar from "@components/layouts/Sidebar";
import AvatarEditAlert from "@components/alerts/AvatarEditAlert";
import placeholderImage from "@assets/Image Placeholder.png";
import toast from "react-hot-toast";
import CropImage from "@components/CropImage";
import { useAppSelector, useAppDispatch } from "@hooks/hooks";
import { useEditProfileMutation } from "@services/user.api";
import Loader from "@components/loaders/Loader";
import { setAvatarAlert, setCropAlert } from "@/slices/toggle.slice";
import clsx from "clsx";
import { SimpleResponse } from "@/types";

const EditProfile: React.FC = () => {
  // EditProfile's variables
  const userEditValue = useMemo(() => {
    return {
      website: "",
      bio: "",
      gender: "",
    };
  }, []);

  // Getting required states
  const { me, userCroppedImage } = useAppSelector((state) => state.user);
  const { avatarAlert, cropAlert } = useAppSelector((state) => state.toggle);

  // All useState's variable
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [hasAvatarSrc, setHasAvatarSrc] = useState<boolean>(false);
  const [userEdit, setUserEdit] = useState(userEditValue);

  // hooks for API request
  const [editProfile, result] = useEditProfileMutation();
  const { data, isSuccess, isLoading, isError, error } = result;

  // dispatch function
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setUserEdit((preObject) => {
      return {
        ...preObject,
        website: me?.website || "",
        bio: me?.bio || "",
        gender: me?.gender || "",
      };
    });
  }, [me]);

  useEffect(() => {
    dispatch(setAvatarAlert(false));

    if (avatarSrc && avatarSrc !== "remove") {
      dispatch(setCropAlert(true));
    }
  }, [avatarSrc, hasAvatarSrc, dispatch]);

  // Handle API responses
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Something went wrong", {
        duration: 2500,
      });
    } else if (error) {
      if ("status" in error) {
        toast.error(
          (error.data as SimpleResponse).message || "Something went wrong",
          {
            duration: 2500,
          }
        );
      } else {
        // you can access all properties of `SerializedError` here
        toast.error(error.message || "Something went wrong", {
          duration: 2500,
        });
      }
    }
  }, [isSuccess, data, isError, error]);

  // Functions
  const inputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      const file = (e.target as HTMLInputElement).files;

      if (file) {
        setAvatarSrc(URL.createObjectURL(file[0]));
        setHasAvatarSrc((preValue) => !preValue);
      }

      // 2nd method to read the Image
      /*
      const reader = new FileReader();

      reader.onload = () => {
        setAvatarSrc(reader.result);
      };

      reader.readAsDataURL(file);
      */
    } else {
      setUserEdit((preValue) => ({ ...preValue, [name]: value }));
    }
  }, []);

  const submitHandler = useCallback(() => {
    const { website, bio, gender } = userEdit;

    const formData = new FormData();

    formData.append("website", website);
    formData.append("bio", bio);
    formData.append("gender", gender);

    if (!avatarSrc) {
      return editProfile(formData);
    } else if (avatarSrc === "remove") {
      formData.append("avatarMessage", "remove");
    } else {
      if (!userCroppedImage?.file) {
        return;
      }

      formData.append("avatar", userCroppedImage.file);
    }

    editProfile(formData);
  }, [avatarSrc, editProfile, userEdit, userCroppedImage?.file]);

  if (!me) {
    toast.error("You are not authenticated", { duration: 2500 });
    return <></>;
  }

  return (
    <main className="flex">
      {cropAlert && <CropImage Image={avatarSrc} />}
      {avatarAlert && <AvatarEditAlert setAvatarSrc={setAvatarSrc} />}
      <SideBar loading={isLoading} />
      <section className="mx-16 my-10 w-[80%]">
        <h1 className="font-bold text-3xl uppercase">Edit profile</h1>
        <section className="w-1/2 py-20 mx-auto">
          <div className="flex mb-10">
            <img
              onClick={() => {
                if (!isLoading) {
                  dispatch(setAvatarAlert(true));
                }
              }}
              className={clsx("h-12 rounded-full", {
                "cursor-not-allowed": isLoading,
                "cursor-pointer": !isLoading,
              })}
              src={
                avatarSrc === "remove"
                  ? placeholderImage
                  : userCroppedImage?.filePreview ||
                    me.avatar?.url ||
                    placeholderImage
              }
              alt={
                avatarSrc === "remove" ? "placeholderImage" : me.name || "user"
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
              <h3>{me.username}</h3>
              <div
                onClick={() => {
                  if (!isLoading) {
                    dispatch(setAvatarAlert(true));
                  }
                }}
                className={clsx(
                  "text-sky-500 hover:text-sky-400 transition duration-150",
                  {
                    "cursor-not-allowed": isLoading,
                  }
                )}
              >
                Change profile photo
              </div>
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
              className={clsx(
                "p-2 w-3/4 ml-7 rounded-md border-none outline-none transition duration-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-base sm:leading-6",
                {
                  "cursor-not-allowed": isLoading,
                }
              )}
            />
          </div>
          <div className="flex items-start my-3">
            <label htmlFor="bio">Bio</label>
            <textarea
              disabled={isLoading}
              id="bio"
              name="bio"
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
              onChange={inputChange}
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
              <Loader
                loading={isLoading}
                size={15}
                color={"#ffffff"}
                css={{ marginLeft: "0.5rem" }}
              />
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default EditProfile;
