const CommentSkeletonLoader = () => {
  return (
    <section className="flex animate-pulse w-full relative items-start p-4">
      <div className="rounded-full w-9 h-9 bg-slate-300 cursor-pointer" />

      <div className="flex items-start flex-col ml-3">
        <div className="bg-slate-300 w-80 h-3 rounded-full"></div>
        <div className="bg-slate-300 w-40 my-2 h-3 rounded-full"></div>
        <div className="flex">
          <span className="bg-slate-300 w-10 h-3 rounded-full"></span>
          <span className="bg-slate-300 w-10 mx-3 h-3 rounded-full"></span>
          <span className="bg-slate-300 w-10 h-3 rounded-full"></span>
        </div>
      </div>
    </section>
  );
};

export default CommentSkeletonLoader;
