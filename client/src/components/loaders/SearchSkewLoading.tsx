import React from "react";

const SearchSkewLoading: React.FC = () => {
  const array = [...new Array(6).keys()];

  return (
    <div className="w-full h-[88%] animate-pulse">
      {array.map((element: number) => {
        return (
          <article key={element} className="my-3 p-3 flex items-center">
            <div className="flex items-center">
              <div className="rounded-full h-10 w-10 bg-slate-300"></div>
              <div className="ml-3">
                <div className="rounded-md h-4 w-40 bg-slate-300"></div>
                <div className="rounded-md h-4 w-20 bg-slate-300 mt-2"></div>
              </div>
            </div>
            <div className="ml-auto rounded-md h-8 w-16 bg-slate-300"></div>
          </article>
        );
      })}
    </div>
  );
};

export default SearchSkewLoading;
