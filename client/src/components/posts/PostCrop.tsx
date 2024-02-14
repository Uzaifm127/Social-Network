import Crop from "react-easy-crop";
import { useState } from "react";
import { getCroppedImage } from "@/lib/utils/imageCrop";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { BiSquareRounded } from "react-icons/bi";
import { LuRectangleHorizontal } from "react-icons/lu";
import { LuRectangleVertical } from "react-icons/lu";
import { useAppDispatch } from "@/lib/utils/hooks/hooks.js";
import { PostCropPT } from "@/types/propTypes/index.js";
import { setPostCropAlert } from "@/slices/toggle.slice";
import { CropArea } from "@/types/functions/index";
import { setPostMedia } from "@/slices/post.slice";

const PostCrop: React.FC<PostCropPT> = ({ Image }) => {
  const [zoom, setZoom] = useState<number>(1);
  const [aspect, setAspect] = useState<number>(0);
  const [originalAspect, setOriginalAspect] = useState<number>(0);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [croppedImage, setCroppedImage] = useState<{
    file: File | null;
    filePreview: string;
  }>({ file: null, filePreview: Image });

  const dispatch = useAppDispatch();

  const onCropComplete = async (
    croppedArea: CropArea,
    croppedAreaPixels: CropArea
  ) => {
    const croppedImage = await getCroppedImage(Image, croppedAreaPixels);
    setCroppedImage(croppedImage);
  };

  const cropSubmitHandler = () => {
    dispatch(setPostMedia(croppedImage));
    setPostCropAlert(false);
  };

  const aspectHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const mediaRatio = e.currentTarget.getAttribute("data-aspect");

    switch (mediaRatio) {
      case "1:1":
        setAspect(1);
        break;
      case "4:5":
        setAspect(4 / 5);
        break;
      case "16:9":
        setAspect(16 / 9);
        break;
      case "original":
        setAspect(originalAspect);
        break;

      default:
        setAspect(1);
        break;
    }
  };

  return (
    <div className="bg-[#121212] top-0 left-0 h-screen w-screen absolute">
      <div
        id="aspect-container"
        className="flex absolute top-[8.5%] left-1/2 -translate-x-1/2"
      >
        <span
          className="flex mx-5 cursor-pointer px-3 py-2 rounded-lg hover:bg-[#353535] transition duration-250"
          onClick={aspectHandler}
          data-aspect="original"
        >
          Original{" "}
          <BiSquareRounded
            data-aspect="original"
            className="text-white text-2xl ml-3"
          />
        </span>
        <span
          className="flex mx-5 cursor-pointer px-3 py-2 rounded-lg hover:bg-[#353535] transition duration-250"
          onClick={aspectHandler}
          data-aspect="1:1"
        >
          1:1{" "}
          <BiSquareRounded
            data-aspect="1:1"
            className="text-white text-2xl ml-3"
          />
        </span>
        <div
          className="flex mx-5 cursor-pointer px-3 py-2 rounded-lg hover:bg-[#353535] transition duration-250"
          onClick={aspectHandler}
          data-aspect="4:5"
        >
          4:5 <LuRectangleVertical className="text-white text-2xl ml-3" />
        </div>
        <span
          className="flex mx-5 cursor-pointer px-3 py-2 rounded-lg hover:bg-[#353535] transition duration-250"
          onClick={aspectHandler}
          data-aspect="16:9"
        >
          16:9{" "}
          <LuRectangleHorizontal
            data-aspect="16:9"
            className="text-white text-2xl ml-3"
          />
        </span>
      </div>
      <Crop
        image={Image}
        crop={crop}
        zoom={zoom}
        style={{
          containerStyle: {
            backgroundColor: "#252525",
            height: "70%",
            width: "34%",
            margin: "auto",
          },
        }}
        aspect={aspect}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        onMediaLoaded={(mediaSize) => {
          const { height, width } = mediaSize;

          setOriginalAspect(width / height);
        }}
      />
      <div className="flex absolute bottom-[4%] left-1/2 -translate-x-1/2">
        <button
          type="button"
          onClick={cropSubmitHandler}
          className="flex items-center px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-400 focus:bg-gray-800 transition duration-200 mt-10 mr-10"
        >
          Done
          <FaCheck className="text-green-500 ml-1 text-base" />
        </button>
        <button
          type="button"
          onClick={() => dispatch(setPostCropAlert(false))}
          className="flex items-center px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-400 focus:bg-gray-800 transition duration-200 mt-10 left-1/2"
        >
          Cancel
          <RxCross2 className="text-red-500 ml-1 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default PostCrop;
