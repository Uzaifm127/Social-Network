import { setUser } from "@/slices/user.slice";
import { User } from "@/types/states/user.types";
import { useAppDispatch } from "@hooks/hooks";
import { useNavigate } from "react-router-dom";

export const useGetUserProfile = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const getUser = (user: User | null) => {
    dispatch(setUser(user));
    localStorage.setItem("username", user.username);
    navigate(`/${user.username}`);
  };

  return getUser;
};
