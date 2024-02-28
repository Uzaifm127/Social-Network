import React from "react";
import { Toaster } from "react-hot-toast";
import Register from "@routes/auth/Register";
import Login from "@routes/auth/Login";
import NotFound from "@routes/NotFound";
import Loader from "@components/loaders/Loader";
import Home from "@routes/Home";
import MyProfile from "@routes/profiles/MyProfile";
import UserProfile from "@routes/profiles/UserProfile";
import EditProfile from "@routes/profiles/EditProfile";
import Saved from "@routes/Saved";
import CreatePost from "@components/posts/CreatePost";
import Search from "@routes/Search";
import PostPreview from "@routes/posts/PostPreview";
import CreateStory from "@routes/story/CreateStory";
import Story from "@routes/story/Story";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { useGetMyProfileQuery } from "@services/user.api";
import { setAuth, setMe } from "@slices/user.slice";

const App: React.FC = () => {
  // const socket = useMemo(() => new WebSocket("ws://localhost:4000"), []);

  // Getting all states from redux store
  const { isAuthenticated, user, me } = useAppSelector((state) => state.user);
  const { currentStory } = useAppSelector((state) => state.story);
  const { postAlert } = useAppSelector((state) => state.toggle);

  // This hooks request a query to get my profile
  const { data, isLoading, isSuccess, isError } = useGetMyProfileQuery();

  const dispatch = useAppDispatch();

  // To handle the authentication of the user.
  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(true));
      dispatch(setMe(data.user));
    }
    if (isError) {
      dispatch(setAuth(false));
      dispatch(setMe(null));
    }
  }, [dispatch, isSuccess, isError, data]);

  return (
    <>
      {isLoading ? (
        <Loader
          loading={isLoading}
          color={"#1e1e1e"}
          size={100}
          css={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(5deg)",
          }}
        />
      ) : (
        <>
          {isAuthenticated && me && postAlert && <CreatePost />}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                isAuthenticated && me ? (
                  <Home />
                ) : (
                  <Navigate to="/login" state={{ prevPath: "/" }} />
                )
              }
            />
            <Route
              path="/explore/search"
              element={
                isAuthenticated && me ? (
                  <Search />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ prevPath: "/explore/search" }}
                  />
                )
              }
            />
            <Route
              path={`/${me?.username}`}
              element={
                isAuthenticated && me ? (
                  <MyProfile refreshLoading={false} />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ prevPath: `/${me?.username}` }}
                  />
                )
              }
            />
            <Route
              path={`/${me?.username}/saved`}
              element={
                isAuthenticated && me ? (
                  <Saved refreshLoading={isLoading} />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ prevPath: `/${me?.username}/saved` }}
                  />
                )
              }
            />
            <Route
              path={`/${localStorage.getItem("username")}`}
              element={
                isAuthenticated && me ? (
                  <UserProfile userId={user?._id || ""} />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ prevPath: `/${localStorage.getItem("username")}` }}
                  />
                )
              }
            />
            <Route
              path={"/accounts/edit"}
              element={
                isAuthenticated && me ? (
                  <EditProfile />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ prevPath: "/accounts/edit" }}
                  />
                )
              }
            />
            <Route
              path={"/stories/create"}
              element={
                isAuthenticated && me ? (
                  <CreateStory />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ prevPath: "/stories/create" }}
                  />
                )
              }
            />
            <Route
              path={`/stories/${currentStory?.username}/${currentStory?._id}`}
              element={
                isAuthenticated && me ? (
                  <Story />
                ) : (
                  <Navigate
                    to="/login"
                    state={{
                      prevPath: `/stories/${currentStory?.username}/${currentStory?._id}`,
                    }}
                  />
                )
              }
            />
            <Route
              path={"/p/:postId"}
              element={
                isAuthenticated && me ? (
                  <PostPreview />
                ) : (
                  <Navigate to="/login" state={{ prevPath: "/p/:postId" }} />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      <Toaster />
    </>
  );
};

export default App;
