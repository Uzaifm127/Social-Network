import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUserRegisterMutation } from "../services/userApi";
import { useDispatch, useSelector } from "react-redux";
import UploadPhoto from "../components/UploadPhoto";
import placeholder from "../assets/Image Placeholder.png";
import Loader from "../components/Loader";
import CropImage from "../components/CropImage";

const seperatorClass = "bg-slate-600 h-px w-72 my-[15px]";

let avatarRegister;

const Register = () => {
  // Hook for fetching
  const [userRegister, { data, isSuccess, isFetching, isLoading, error }] =
    useUserRegisterMutation();

  // All local states
  const [next, setNext] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    avatarPreview: placeholder,
  });

  // Selector and Dispatcher
  const { cropAlert } = useSelector((state) => state.toggle);
  const { isAuthenticated, userCroppedImage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  // useEffects

  useEffect(() => {
    if (currentUser.avatarPreview !== placeholder) {
      dispatch({ type: "cropAlertToggle", payload: true });
    }
  }, [currentUser.avatarPreview, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "changeAuth", payload: true });
      toast.success(data?.message || "Something went wrong", {
        duration: 2500,
      });
    }
    if (error) {
      dispatch({ type: "changeAuth", payload: false });
      toast.error(error.data?.message || "Something went wrong", {
        duration: 2500,
      });
      setCurrentUser({
        name: "",
        username: "",
        email: "",
        password: "",
        avatarPreview: placeholder,
      });
      setNext(false);
    }
  }, [isSuccess, dispatch, data, error]);

  // All required functions
  const inputChange = (event) => {
    const { name, value } = event.target;

    if (name === "avatar") {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = () =>
        setCurrentUser((preUser) => ({
          ...preUser,
          avatarPreview: reader.result,
        }));

      reader.readAsDataURL(file);
    } else {
      setCurrentUser((preUser) => ({ ...preUser, [name]: value }));
    }
  };

  const totalSubmitHandler = async (event) => {
    event.preventDefault();
    const { name, username, email, password } = currentUser;

    const data = new FormData();
    data.append("name", name);
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);

    if (event.target.name === "withImage") {
      data.append("avatar", userCroppedImage.file);
    } else {
      data.append("avatar", "");
    }

    userRegister(data);
  };

  if (cropAlert) {
    avatarRegister = <CropImage Image={currentUser.avatarPreview} />;
  } else {
    avatarRegister = (
      <UploadPhoto
        onTotalSubmit={totalSubmitHandler}
        onImageChange={inputChange}
        avatarPreview={userCroppedImage.filePreview || placeholder}
      />
    );
  }

  if (isAuthenticated) return <Navigate to="/" />;

  return isLoading || isFetching ? (
    <Loader
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
    avatarRegister
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
            onSubmit={(event) => {
              event.preventDefault();
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
