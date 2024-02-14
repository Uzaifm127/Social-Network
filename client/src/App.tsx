import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { Toaster } from "react-hot-toast";
import { useGetMyProfileQuery } from "@services/user.api";
import { setAuth } from "@slices/user.slice";
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

const App: React.FC = () => {
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
      dispatch({ type: "setMe", payload: data.user });
    }
    if (isError) {
      dispatch({ type: "changeAuth", payload: false });
      dispatch({ type: "setMe", payload: {} });
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
          {isAuthenticated && postAlert && <CreatePost />}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home />
                ) : (
                  <Navigate to="/login" state={{ prevPath: "/" }} />
                )
              }
            />
            <Route
              path="/explore/search"
              element={
                isAuthenticated ? (
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
              path={`/${me.username}`}
              element={
                isAuthenticated ? (
                  <MyProfile refreshLoading={false} />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ prevPath: `/${me.username}` }}
                  />
                )
              }
            />
            <Route
              path={`/${me.username}/saved`}
              element={
                isAuthenticated ? (
                  <Saved />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ prevPath: `/${me.username}/saved` }}
                  />
                )
              }
            />
            <Route
              path={`/${localStorage.getItem("username")}`}
              element={
                isAuthenticated ? (
                  <UserProfile userId={user._id} />
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
                isAuthenticated ? (
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
                isAuthenticated ? (
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
                isAuthenticated ? (
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
                isAuthenticated ? (
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
