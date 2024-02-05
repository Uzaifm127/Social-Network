import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useGetUserProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getUser = (user) => {
    dispatch({ type: "setUser", payload: user });
    localStorage.setItem("username", user.username);
    navigate(`/${user.username}`);
    console.log("hook function is working fine");
  };

  return getUser;
};
