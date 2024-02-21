import React, { FormEventHandler, useCallback, useState } from "react";
import SideBar from "@components/layouts/Sidebar";
import User from "@components/layouts/User";
import SearchSkewLoading from "@components/loaders/SearchSkewLoading";
import { useLazySearchUserQuery } from "@services/user.api";
import { useAppDispatch } from "@/lib/utils/hooks/hooks";
import { setPostAlert } from "@/slices/toggle.slice";

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const [trigger, result] = useLazySearchUserQuery();

  const dispatch = useAppDispatch();

  const onSearchSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      trigger(search);
    },
    [trigger, search]
  );

  return (
    <main className="flex" onClick={() => dispatch(setPostAlert(false))}>
      <SideBar loading={false} />
      <section className="w-[80%] p-10">
        <form onSubmit={onSearchSubmit} className="w-full">
          <input
            className="w-full outline-none border-2 p-2 mb-5 text-xl rounded-lg"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter the username..."
          />
        </form>
        {result.isLoading || result.isFetching ? (
          <SearchSkewLoading />
        ) : (
          <div className="w-full h-[88%]">
            {result.data?.users.length === 0 ? (
              <div className="text-center h-full flex justify-center flex-col">
                <p className="text-5xl font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  User not found
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Sorry, we couldn&apos;t find the user.
                </p>
              </div>
            ) : (
              result.data?.users.map((element) => {
                const { name, username, avatar, _id } = element;

                return (
                  <User
                    key={_id}
                    style={{}}
                    user={element}
                    name={name}
                    hoverBgColor={"hover:bg-gray-100"}
                    username={username}
                    avatar={avatar.url}
                    userId={_id}
                  />
                );
              })
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Search;
