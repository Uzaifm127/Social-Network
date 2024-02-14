import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import placeholderImage from "../assets/Image Placeholder.png";
import { useCallback, useEffect, useMemo } from "react";
import FollowAlert from "../components/FollowAlert";
import { useGetFollowStatus } from "../utils/hooks/useGetFollowStatus";
import { useGetUserProfileQuery } from "../services/userApi";
import UserSkewLoader from "../components/loaders/UserSkewLoader";

const UserProfile = ({ userId }) => {
  const navLinksClass = useMemo(() => {
    return "px-4 py-2 text-white bg-slate-400 hover:bg-slate-600 cursor-pointer rounded-lg transition duration-200 m-5 active:bg-slate-800 focus:bg-slate-900";
  }, []);

  const { data: userData, isLoading: userLoading } =
    useGetUserProfileQuery(userId);

  const { followButton } = useGetFollowStatus(userId);

  const { highlighter } = useSelector((state) => state.post);

  const { followAlert } = useSelector((state) => state.toggle);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.location.pathname === `/${userData?.user?.username}`) {
      dispatch({ type: "setHighlighter", payload: true });
    }

    return () => {
      dispatch({
        type: "followAlertToggle",
        payload: { alert: false, valueToAlert: undefined },
      });
    };
  }, [userData?.user?.username, dispatch]);

  const followClick = useCallback(
    (e) => {
      const clickedValue = e.target.getAttribute("data-clicked");

      dispatch({
        type: "followAlertToggle",
        payload: { alert: true, valueToAlert: clickedValue },
      });
    },
    [dispatch]
  );
};

UserProfile.propTypes = {
  userId: PropTypes.string,
};

export default UserProfile;
