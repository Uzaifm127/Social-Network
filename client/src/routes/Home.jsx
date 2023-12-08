import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <SideBar />
    </>
  );
};

export default Home;
