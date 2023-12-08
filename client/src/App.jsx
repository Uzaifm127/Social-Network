import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./routes/Register";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import Home from "./routes/Home";
("remove after");
import Profile from "./routes/Profile";
import { useGetMyProfileQuery } from "./services/userApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./routes/EditProfile";
import Post from "./components/Post";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { postAlert } = useSelector((state) => state.toggle);
  const { data, isLoading, isSuccess, isError, refetch } =
    useGetMyProfileQuery();

  useEffect(() => {
    refetch();
  }, [isAuthenticated, refetch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "changeAuth", payload: true });
      dispatch({ type: "setUser", payload: data.user });
    }
    if (isError) {
      dispatch({ type: "changeAuth", payload: false });
      dispatch({ type: "setUser", payload: {} });
    }
  }, [dispatch, isSuccess, isError, data]);

  return (
    <>
      <BrowserRouter>
        {isLoading ? (
          <Loader
            loading={isLoading}
            color={"#36d7b7"}
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
            {isAuthenticated && postAlert && <Post />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path={`/${user.username}`} element={<Profile />} />
              <Route path={"/accounts/edit"} element={<EditProfile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
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
