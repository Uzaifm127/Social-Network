import { useCallback, useState } from "react";
import SideBar from "../components/SideBar";
import User from "../components/User";
import { useSearchUserQuery } from "../services/userApi";

const Search = () => {
  const [searchUser, { data, isSuccess }] = useSearchUserQuery();

  const [search, setSearch] = useState("");

  const onSearchSubmit = useCallback(() => {
    searchUser(search);
  }, [searchUser, search]);

  return (
    <main className="flex">
      <SideBar />
      <section className="w-[80%] p-10">
        <form onSubmit={onSearchSubmit} className="w-full">
          <input
            className="w-full outline-none border-2 p-2 mb-5 text-xl rounded-lg"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter the username"
          />
        </form>
        <div className="border w-full h-[88%]">
          <User />
          <User />
          <User />
        </div>
      </section>
    </main>
  );
};

export default Search;
