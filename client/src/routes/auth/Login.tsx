import React, {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Loader from "@components/loaders/Loader";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useUserLoginMutation } from "@services/user.api";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { toast } from "react-hot-toast";
import { SimpleResponse } from "@/types";
import { setAuth, setMe } from "@/slices/user.slice";
import { setMoreAlert } from "@/slices/toggle.slice";

const Login: React.FC = () => {
  const seperatorClass = useMemo(() => {
    return "bg-slate-600 h-px w-72 my-[15px]";
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { isAuthenticated } = useAppSelector((state) => state.user);

  const location = useLocation();

  const [userLogin, result] = useUserLoginMutation();

  const { data, isSuccess, isLoading, error } = result;

  const dispatch = useAppDispatch();

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
        if (error.status === "FETCH_ERROR") {
          toast.error("Failed to connect", {
            duration: 2500,
          });
        } else if (error.status === "TIMEOUT_ERROR") {
          toast.error("Request Timeout", {
            duration: 2500,
          });
        } else if ("data" in error) {
          toast.error(
            (error.data as SimpleResponse).message || "Something went wrong",
            {
              duration: 2500,
            }
          );
        } else {
          toast.error("Something went wrong", {
            duration: 2500,
          });
        }
      } else {
        // you can access all properties of `SerializedError` here
        toast.error(error.message || "Something went wrong", {
          duration: 2500,
        });
      }
      dispatch(setAuth(false));
      dispatch(setMe(null));
    }
  }, [isSuccess, dispatch, data, error]);

  const inputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { name, value } = e.target;

    setUser((preUser) => ({ ...preUser, [name]: value }));
  }, []);

  const submitHandler: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      userLogin({ email: user.email, password: user.password });
    },
    [user, userLogin]
  );

  if (isAuthenticated) {
    return <Navigate to={location.state.prevPath} />;
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
  ) : (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={inputChange}
                autoComplete="email"
                placeholder="Enter your email"
                required
                className="block p-2 w-full rounded-md border-none outline-none transition duration-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-lg sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to={`/forgot-password`}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={inputChange}
                minLength={8}
                maxLength={30}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="block w-full p-2 rounded-md border-none outline-none transition duration-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full transition duration-200 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
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
          Don&apos;t have an account?{" "}
          <Link
            to={"/register"}
            className="underline hover:text-gray-600 transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
