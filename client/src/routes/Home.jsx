import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Stories from "../components/Stories";
import Feed from "../components/Feed";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <main className="flex">
      <SideBar />
      <section className="w-[53%] border px-14">
        <Stories />
        <Feed />
      </section>
    </main>
  );
};

export default Home;
