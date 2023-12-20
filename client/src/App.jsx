import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import CreatePost from "./components/CreatePost";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, me, user } = useSelector((state) => state.user);
  const { postAlert } = useSelector((state) => state.toggle);
  const { data, isLoading, isSuccess, isError } = useGetMyProfileQuery();

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
      <BrowserRouter>
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
              <Route path="/" element={<Home />} />
              <Route path={`/${me.username}`} element={<MyProfile />} />
              <Route
                path={`/${user.username}`}
                element={
                  <UserProfile
                    name={user.name}
                    username={user.username}
                    bio={user.bio}
                    followers={user.followers}
                    following={user.following}
                    avatar={user.avatar?.url}
                    posts={user.posts}
                  />
                }
              />
              <Route path={"/accounts/edit"} element={<EditProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        )}
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
