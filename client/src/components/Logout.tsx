import { useEffect } from "react";
import { TbLogout2 } from "react-icons/tb";
import { useUserLogoutMutation } from "@services/user.api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@hooks/hooks";

const Logout = () => {
  const [userLogout, { data, isSuccess, isError, error }] =
    useUserLogoutMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "changeAuth", payload: false });
      dispatch({ type: "setMe", payload: {} });
      toast.success(data?.message || "Something went wrong");
    } else if (isError) {
      dispatch({ type: "changeAuth", payload: true });
      toast.success(error.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError, dispatch, data, error]);

  const logoutHandler = () => userLogout();

  return (
    <Link
      onClick={logoutHandler}
      to={`/`}
      className="flex items-center w-full p-3 cursor-pointer hover:bg-slate-300 rounded-lg transition duration-250"
    >
      <TbLogout2 className="text-3xl mr-5" />
      Logout
    </Link>
  );
};

export default Logout;
