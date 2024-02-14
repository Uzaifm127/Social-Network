import { LuGalleryHorizontal } from "react-icons/lu";
import { useAppSelector } from "@hooks/hooks";
import { PostCropPreviewPT } from "@/types/propTypes/index";

const PostCropPreview: React.FC<PostCropPreviewPT> = ({ nextButton }) => {
  const { postMedia } = useAppSelector((state) => state.post);

  return (
    <>
      <button
        onClick={() => {
          nextButton(true);
        }}
        className="absolute right-[34%] top-[13.3%] rounded-lg px-3 py-1 bg-sky-500 cursor-pointer"
      >
        Next
      </button>
      <div className="relative w-[28rem] h-[28rem] overflow-hidden">
        <img
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={postMedia[0].filePreview}
          alt={"media"}
        />
        <div className="absolute right-[1%] bottom-[1%] rounded-full p-3 transition duration-150 hover:bg-[#141414] cursor-pointer">
          <LuGalleryHorizontal className="text-white text-lg " />
        </div>
      </div>
    </>
  );
};

export default PostCropPreview;
