import PropTypes from "prop-types";
import { useState } from "react";
import { getCroppedImage } from "../utils/imageCrop.js";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Crop from "react-easy-crop";
import { useDispatch } from "react-redux";

function CropImage({ Image }) {
  const dispatch = useDispatch();

  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 50, height: 50 });
  const [croppedImage, setCroppedImage] = useState(Image);

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    const croppedImage = await getCroppedImage(Image, croppedAreaPixels);
    setCroppedImage(croppedImage);
  };

  const cropSubmitHandler = () => {
    dispatch({ type: "storeUserCroppedImage", payload: croppedImage });
    dispatch({ type: "cropAlertToggle", payload: false });
  };

  return (
    <div className="bg-[#121212] h-screen w-screen absolute">
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
        aspect={1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
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
          onClick={() => dispatch({ type: "cropAlertToggle", action: false })}
          className="flex items-center px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-400 focus:bg-gray-800 transition duration-200 mt-10 left-1/2"
        >
          Cancel
          <RxCross2 className="text-red-500 ml-1 text-lg" />
        </button>
      </div>
    </div>
  );
}

CropImage.propTypes = {
  Image: PropTypes.string,
};

export default CropImage;
