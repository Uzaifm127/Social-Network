import SideBar from "../components/SideBar";
import Stories from "../components/Stories";
import Feed from "../components/Feed";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
