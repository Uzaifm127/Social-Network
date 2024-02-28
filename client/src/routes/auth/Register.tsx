import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CropImage from "@components/CropImage";
import Loader from "@components/loaders/Loader";
import placeholder from "@assets/Image Placeholder.png";
import UploadPhoto from "@components/features/UploadPhoto";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUserRegisterMutation } from "@services/user.api";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { setCropAlert, setMoreAlert } from "@/slices/toggle.slice";
import { setAuth, setMe } from "@/slices/user.slice";
import { SimpleResponse } from "@/types";
import { CurrentUserTypes } from "@/types/states";

const Register = () => {
  const seperatorClass = useMemo(() => {
    return "bg-slate-600 h-px w-72 my-[15px]";
  }, []);

  const initialCurrentUser = useMemo(() => {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
      avatarPreview: placeholder,
    };
  }, []);

  const avatarRegister = useRef<React.ReactNode | null>(null);

  // All local states
  const [next, setNext] = useState<boolean>(false);
  const [currentUser, setCurrentUser] =
    useState<CurrentUserTypes>(initialCurrentUser);

  // Selector and Dispatcher
  const { cropAlert } = useAppSelector((state) => state.toggle);
  const { isAuthenticated, userCroppedImage } = useAppSelector(
    (state) => state.user
  );

  // Hook for fetching
  const [userRegister, result] = useUserRegisterMutation();

  const { data, isSuccess, isLoading, error } = result;

  const dispatch = useAppDispatch();

  // useEffects
  useEffect(() => {
    if (currentUser.avatarPreview !== placeholder) {
      dispatch(setCropAlert(true));
    }
  }, [currentUser.avatarPreview, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(true));
      dispatch(setMe(data.user));
      dispatch(setMoreAlert(false));
      toast.success(data?.message || "Something went wrong", {
        duration: 2500,
      });
    } else if (error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
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
      dispatch(setAuth(false));
      dispatch(setMe(null));
      setCurrentUser(initialCurrentUser);
      setNext(false);
    }
  }, [isSuccess, dispatch, data, error, initialCurrentUser]);

  // All required functions
  const inputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "avatar") {
      const file = e.target.files;

      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        setCurrentUser((preUser) => ({
          ...preUser,
          avatarPreview: reader.result || "",
        }));
      };

      reader.readAsDataURL(file[0]);
    } else {
      setCurrentUser((preUser) => ({ ...preUser, [name]: value }));
    }
  }, []);

  const onTotalSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      const action = (e.target as HTMLButtonElement).getAttribute("data-name");
      const { name, username, email, password } = currentUser;

      const data = new FormData();
      data.append("name", name);
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);

      if (action === "withImage") {
        if (!userCroppedImage) {
          return;
        }

        data.append("avatar", userCroppedImage.file);
      } else {
        data.append("avatar", "");
      }

      userRegister(data);
    },
    [currentUser, userRegister, userCroppedImage]
  );

  if (cropAlert) {
    avatarRegister.current = (
      <CropImage Image={currentUser.avatarPreview.toString()} />
    );
  } else {
    avatarRegister.current = (
      <UploadPhoto
        onTotalSubmit={onTotalSubmit}
        onImageChange={inputChange}
        avatarPreview={userCroppedImage?.filePreview || placeholder}
      />
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return isLoading ? (
    <Loader
      loading={isLoading}
      size={100}
      color={"#1e1e1e"}
      css={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(5deg)",
      }}
    />
  ) : next ? (
    avatarRegister.current
  ) : (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setNext(true);
            }}
          >
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={currentUser.name}
                  onChange={inputChange}
                  autoComplete="name"
                  placeholder="Enter your Full name"
                  required
                  className="p-2 w-full rounded-md border-none outline-none transition duration-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-lg sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={currentUser.username}
                  onChange={inputChange}
                  placeholder="Enter your username"
                  required
                  className="block p-2 w-full rounded-md border-none outline-none  transition duration-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-lg sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={currentUser.email}
                  onChange={inputChange}
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  className="block p-2 w-full rounded-md border-none outline-none  transition duration-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-lg sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={currentUser.password}
                  onChange={inputChange}
                  minLength={8}
                  maxLength={30}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="block p-2 w-full rounded-md border-none outline-none  transition duration-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-lg sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="my-3 flex items-center text-center text-sm text-gray-500">
            <hr className={seperatorClass} />

            <p className="w-4/5">or continue with</p>

            <hr className={seperatorClass} />
          </div>

          <div className="w-full flex justify-between">
            <button className="w-4/5 bg-rose-500 hover:bg-rose-400 transition py-1.5 rounded-lg text-white">
              Google
            </button>
            <button className="w-4/5 ml-5 bg-gradient-to-b from-[#17A9FD] to-[#0165E1] py-1.5 rounded-lg text-white">
              facebook
            </button>
          </div>

          <p className="text-gray-500 text-center my-5">
            Already have an account.{" "}
            <Link
              to={"/login"}
              className="underline hover:text-gray-600 transition"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
