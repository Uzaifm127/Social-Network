import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./routes/Register";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import Home from "./routes/Home";
import MyProfile from "./routes/MyProfile";
import UserProfile from "./routes/UserProfile";
import { useGetMyProfileQuery } from "./services/userApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./routes/EditProfile";
import Saved from "./routes/Saved";
import CreatePost from "./components/CreatePost";
import Search from "./routes/Search";
import PostPreview from "./routes/PostPreview";
import Test from "./routes/Test";
import CreateStory from "./routes/CreateStory";

function App() {
  const { isAuthenticated, user, me } = useSelector((state) => state.user);
  const { postAlert } = useSelector((state) => state.toggle);
  const { data, isLoading, isSuccess, isError } = useGetMyProfileQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "changeAuth", payload: true });
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
              path="/test"
              element={
                isAuthenticated ? (
                  <Test />
                ) : (
                  <Navigate to="/login" state={{ prevPath: "/test" }} />
                )
              }
            />{" "}
            {/*Test, remove after*/}
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
                  <MyProfile />
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
}

export default App;
