const UserSkewLoader = () => {
  return (
    <section className="m-16 w-[80%] animate-pulse">
      <section className="flex items-start mx-20">
        <div className="rounded-full bg-slate-300 h-40 w-40"></div>
        <article className="ml-24">
          <div className="flex items-center mb-5">
            <div className="bg-slate-300 mr-5 h-5 w-28 rounded"></div>
            <div className={`bg-slate-300 rounded w-16 h-9`}></div>
          </div>
          <div className="flex items-center mb-4">
            <div className="bg-slate-300 rounded h-5 w-14 mr-10"></div>

            <div className="bg-slate-300 rounded h-5 w-20 mr-10"></div>

            <div className="bg-slate-300 rounded h-5 w-20 mr-10"></div>
          </div>
          <div className="bg-slate-300 rounded h-5 w-14 mb-3"></div>
          <div className="bg-slate-300 rounded h-5 w-72 mb-3"></div>
          <div className="bg-slate-300 rounded h-5 w-60 mb-3"></div>
          <div className="bg-slate-300 rounded h-5 w-40 mb-3"></div>
        </article>
      </section>
      <hr className="w-full bg-black mt-16" />
      <nav className="flex justify-center">
        <ul className="flex">
          <div className="bg-slate-300 rounded-lg h-10 w-20 m-5"></div>
          <div className="bg-slate-300 rounded-lg h-10 w-20 m-5"></div>
          <div className="bg-slate-300 rounded-lg h-10 w-20 m-5"></div>
        </ul>
      </nav>
      <section id="posts" className="flex justify-center flex-wrap">
        <div className={`bg-slate-300 w-72 h-72 m-3 rounded-xl`}></div>
        <div className={`bg-slate-300 w-72 h-72 m-3 rounded-xl`}></div>
        <div className={`bg-slate-300 w-72 h-72 m-3 rounded-xl`}></div>
        <div className={`bg-slate-300 w-72 h-72 m-3 rounded-xl`}></div>
        <div className={`bg-slate-300 w-72 h-72 m-3 rounded-xl`}></div>
        <div className={`bg-slate-300 w-72 h-72 m-3 rounded-xl`}></div>
      </section>
    </section>
  );
};

export default UserSkewLoader;
