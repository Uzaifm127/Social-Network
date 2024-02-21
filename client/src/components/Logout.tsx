import React, { useEffect } from "react";
import { TbLogout2 } from "react-icons/tb";
import { useUserLogoutMutation } from "@services/user.api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@hooks/hooks";
import { SimpleResponse } from "@/types";

const Logout: React.FC = () => {
  const [userLogout, { data, isSuccess, isError, error }] =
    useUserLogoutMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "changeAuth", payload: false });
      dispatch({ type: "setMe", payload: {} });
      toast.success(data?.message || "Something went wrong", {
        duration: 2500,
      });
    } else if (error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        toast.success(
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
      dispatch({ type: "changeAuth", payload: true });
    }
  }, [isSuccess, isError, dispatch, data, error]);

  return (
    <Link
      onClick={() => userLogout()}
      to={`/`}
      className="flex items-center w-full p-3 cursor-pointer hover:bg-slate-300 rounded-lg transition duration-250"
    >
      <TbLogout2 className="text-3xl mr-5" />
      Logout
    </Link>
  );
};

export default Logout;
