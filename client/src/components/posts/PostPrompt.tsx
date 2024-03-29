import Media from "@assets/Media.png";
import { PostPromptPT } from "@/types/propTypes";

const PostPrompt: React.FC<PostPromptPT> = ({ onChange }) => {
  return (
    <div className="text-center my-20 w-[28rem] h-[15rem]">
      <img className="h-32 mx-auto" draggable="false" src={Media} alt="media" />
      <h2 className="text-xl py-5">Drag photos and videos here</h2>
      <label
        className="rounded-lg px-3 py-2 bg-sky-500 cursor-pointer"
        htmlFor="post-media"
      >
        select
      </label>
      <input id="post-media" onChange={onChange} type="file" hidden />
    </div>
  );
};

export default PostPrompt;
