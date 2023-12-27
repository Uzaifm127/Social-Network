import { useCallback, useState } from "react";
import SideBar from "../components/SideBar";
import User from "../components/User";
import { useLazySearchUserQuery } from "../services/userApi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");

  const [trigger, result] = useLazySearchUserQuery();

  const { isAuthenticated } = useSelector((state) => state.user);

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();

      trigger(search);
    },
    [trigger, search]
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

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
          {result.data?.users.map((element) => {
            const { name, username, avatar, _id } = element;

            return (
              <User
                key={_id}
                user={element}
                name={name}
                hoverBgColor={"hover:bg-gray-100"}
                username={username}
                avatar={avatar.url}
                userId={_id}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Search;
