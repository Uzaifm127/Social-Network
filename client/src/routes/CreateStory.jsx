import { Image, X, Circle } from "react-feather";

const CreateStory = () => {
  return (
    <main className="flex flex-col justify-around items-center min-h-screen min-w-full bg-[#161616]">
      <X className="absolute m-2 top-0 left-0 cursor-pointer" color="#fff" />

      <section className="w-[23rem] relative overflow-hidden h-[88vh] rounded-2xl">
        <div
          className="w-full h-full blur-3xl"
          style={{
            background:
              "url(https://th.bing.com/th/id/R.dcdc8bad2bf2b7d9df62dac77a2c09cb?rik=3LuTbbdPZCPlEQ&riu=http%3a%2f%2fwww.dumpaday.com%2fwp-content%2fuploads%2f2017%2f03%2frandom-pictures-30-2.jpg&ehk=SC2aiUgeNfhZkns0PtEeD9kKriZKh9IRW8OKjP3OD9c%3d&risl=&pid=ImgRaw&r=0)",
          }}
        ></div>
        <img
          className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src="https://th.bing.com/th/id/R.dcdc8bad2bf2b7d9df62dac77a2c09cb?rik=3LuTbbdPZCPlEQ&riu=http%3a%2f%2fwww.dumpaday.com%2fwp-content%2fuploads%2f2017%2f03%2frandom-pictures-30-2.jpg&ehk=SC2aiUgeNfhZkns0PtEeD9kKriZKh9IRW8OKjP3OD9c%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        />
      </section>
      <section className="flex justify-between items-center w-[23rem]">
        <div className="rounded-xl p-1 cursor-pointer bg-[#161616] border-2 border-white">
          <Image color="#ffffff" strokeWidth={1.5} size={32} />
        </div>
        <div className="border-2 border-white rounded-full p-px cursor-pointer bg-[#161616]">
          <Circle fill="#fff" color="#fff" strokeWidth={1.5} size={40} />
        </div>
      </section>
    </main>
  );
};

export default CreateStory;
