import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { TbLogout2 } from "react-icons/tb";
import { useUserLogoutMutation } from "@services/user.api";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@hooks/hooks";
import { SimpleResponse } from "@/types";
import { setAuth, setMe } from "@/slices/user.slice";

const Logout: React.FC = () => {
  const [userLogout, result] = useUserLogoutMutation();
  const { data, isSuccess, isError, error } = result;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(false));
      dispatch(setMe(null));
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
      dispatch(setAuth(true));
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
