import { useCallback, useRef, useState } from "react";
import { Image, X, Circle, Play } from "react-feather";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import mediaIcon from "../assets/Media.png";
import { useCreateStoryMutation } from "../services/stories.api";

const CreateStory = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [fileType, setFileType] = useState();
  const [isPaused, setIsPaused] = useState(false);

  const { me } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const storyVideoRef = useRef(null);

  const [createStory, { isSuccess, isLoading }] = useCreateStoryMutation();

  const checkSizeLimit = useCallback((file, fileType) => {
    if (fileType === "image") {
      // Checking the file size limit
      const maxSize = 1 * 1024 * 1024 * 30;
      if (file.size > maxSize) {
        toast.error("You exceed the file size limit");
        return true;
      }

      // Setting the video url
      setImgSrc(URL.createObjectURL(file));
    } else if (fileType === "video") {
      // Checking the file size limit
      const maxSize = 1 * 1024 * 1024 * 500; // Size of 500MB in bytes.
      if (file.size > maxSize) {
        toast.error("You exceed the file size limit");
        return true;
      }

      // Setting the video url
      setVideoSrc(URL.createObjectURL(file));
    }
    setFileType(fileType);
  }, []);

  const storyMediaHandler = useCallback(
    (e) => {
      const file = e.target.files[0];

      const fileType = file.type.split("/")[0];

      console.log(file.type);

      const supportedTypes = ["video/mp4", "image/png", "image/jpeg"];

      const isSupported = supportedTypes.some((element) => {
        return element === file.type;
      });

      if (!isSupported) {
        return toast.error("Given file type not supported");
      }

      checkSizeLimit(file, fileType);
    },
    [checkSizeLimit]
  );

  const stopStartVideo = useCallback(() => {
    if (storyVideoRef.current.paused) {
      storyVideoRef.current.play();
      setIsPaused(false);
    } else {
      storyVideoRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const onSubmitStory = useCallback(() => {
    if(fileType === "image"){

      const file = new File(imgSrc, ``)
    }
    
    const formData = new FormData();

    formData.append("storyType", fileType);

    createStory(formData);
  }, [createStory, fileType]);

  return (
    <main className="flex flex-col justify-around items-center min-h-screen min-w-full bg-[#161616]">
      <X
        onClick={() => navigate("/")}
        className="absolute m-2 top-0 left-0 cursor-pointer"
        color="#fff"
      />

      <section className="w-[23rem] relative overflow-hidden h-[88vh] rounded-2xl">
        {imgSrc || videoSrc ? (
          <>
            <div
              className="w-full h-full blur-3xl"
              style={{
                background: fileType === "image" ? `url(${imgSrc})` : "#444",
              }}
            ></div>
            {fileType === "image" && (
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src={imgSrc}
                alt=""
              />
            )}
            {fileType === "video" && (
              <>
                {isPaused && (
                  <Play
                    onClick={stopStartVideo}
                    color="#fff"
                    size={60}
                    fill="#fff"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                  />
                )}
                <video
                  ref={storyVideoRef}
                  src={videoSrc}
                  onLoadedMetadata={() => setIsPaused(true)}
                  onClick={stopStartVideo}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  playsInline
                ></video>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full border-2 border-white rounded-2xl flex flex-col items-center">
            <h1 className="text-white text-2xl text-center my-1">
              Create your story
            </h1>

            <img className="h-32 mt-40" src={mediaIcon} alt="media-icon" />
          </div>
        )}
      </section>
      <section className="flex justify-between items-center w-[23rem]">
        {imgSrc || videoSrc ? (
          <>
            <div
              className="flex border-2 border-white rounded-full items-center text-white px-2 py-1 cursor-pointer"
              onClick={onSubmitStory}
            >
              <img
                className="h-8 rounded-full"
                src={me.avatar.url}
                alt={me.username}
              />
              <h2 className="text-sm ml-3">Your story</h2>
            </div>
          </>
        ) : (
          <>
            <label
              htmlFor="story-input"
              className="rounded-xl p-1 cursor-pointer bg-[#161616] border-2 border-white"
            >
              <Image color="#ffffff" strokeWidth={1.5} size={32} />
            </label>

            <input
              type="file"
              id="story-input"
              accept=".jpeg, .jpg, .png, .mp4"
              onChange={storyMediaHandler}
              hidden
            />

            <div className="border-2 border-white rounded-full p-px cursor-pointer bg-[#161616]">
              <Circle fill="#fff" color="#fff" strokeWidth={1.5} size={40} />
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default CreateStory;
