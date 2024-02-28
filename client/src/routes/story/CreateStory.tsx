import React, {
  ChangeEventHandler,
  ReactEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import WhiteScreen from "@components/loaders/WhiteScreenLoader";
import Webcam from "react-webcam";
import placholder from "@assets/Image Placeholder.png";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/lib/utils/hooks/hooks";
import { useCreateStoryMutation } from "@services/stories.api";
import { useRecordVideo } from "@hooks/custom/useRecordVideo";
import {
  Image,
  X,
  Circle,
  Play,
  Video,
  VideoOff,
  Aperture,
} from "react-feather";
import { SimpleResponse } from "@/types";

const CreateStory: React.FC = () => {
  const [img, setImg] = useState<File | undefined>();
  const [imgSrc, setImgSrc] = useState<string>("");
  const [video, setVideo] = useState<File | undefined>();
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [webcamHeight, setWebcamHeight] = useState<number>(0);
  const [webcamWidth, setWebcamWidth] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  const { me } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const storyVideoRef = useRef<HTMLVideoElement | null>(null);
  const timerId = useRef<number>(0);
  const webcamRef = useRef<Webcam | null>(null);
  const webcamContainerRef = useRef<HTMLElement | null>(null);

  const [createStory, result] = useCreateStoryMutation();
  const { isSuccess, isLoading, data, error } = result;

  const [
    startRecording,
    stopRecording,
    isRecording,
    recordedVideoSrc,
    recordedVideo,
  ] = useRecordVideo();

  // To handle the api response coming from server.
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Something went wrong");
      navigate("/");
    } else if (error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        toast.error(
          (error.data as SimpleResponse).message || "Something went wrong",
          {
            duration: 2500,
          }
        );
      } else {
        // you can access all properties of `SerializedError` here
        toast.error(error.message || "Something went wrong", {
          duration: 2500,
        });
      }
    }
  }, [data, error, isSuccess, navigate]);

  // To stop the timer if reaches up to 59 seconds.
  useEffect(() => {
    if (timer > 59) {
      stopRecording();

      clearInterval(timerId.current);
    }
  }, [timer, stopRecording]);

  // To set the height and width of a webcam and setting the recorded video.
  useEffect(() => {
    if (webcamContainerRef.current) {
      const webcamHeight = webcamContainerRef.current.clientHeight;
      const webcamWidth = webcamContainerRef.current.clientWidth;

      setWebcamHeight(webcamHeight);
      setWebcamWidth(webcamWidth);
    }

    if (recordedVideoSrc) {
      setVideo(undefined); // as there has to be a recorded video or prompted video.

      setVideoSrc(recordedVideoSrc);
      setFileType("video");
    }
  }, [recordedVideoSrc]);

  const checkSizeLimit = useCallback((file: File, fileType: string) => {
    if (fileType === "image") {
      // Checking the file size limit
      const maxSize = 1 * 1024 * 1024 * 30;
      if (file.size > maxSize) {
        return toast.error("You exceed the file size limit");
      }

      // Setting the image and image url
      setImg(file);
      setImgSrc(URL.createObjectURL(file));
    } else if (fileType === "video") {
      // Checking the file size limit
      const maxSize = 1 * 1024 * 1024 * 100; // Size of 100MB in bytes.
      if (file.size > maxSize) {
        return toast.error("You exceed the file size limit");
      }

      // Setting the video and video url
      setVideo(file);
      setVideoSrc(URL.createObjectURL(file));
    }
    setFileType(fileType);
  }, []);

  const onFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const files = e.target.files;

      if (!files) {
        return;
      }

      const fileType = files[0].type.split("/")[0];

      const supportedTypes = [
        "video/mp4",
        "video/webm",
        "image/png",
        "image/jpeg",
      ];

      const isSupported = supportedTypes.some((element) => {
        return element === files[0].type;
      });

      if (!isSupported) {
        return toast.error("Given file type not supported");
      }

      checkSizeLimit(files[0], fileType);
    },
    [checkSizeLimit]
  );

  const stopStartVideo = useCallback(() => {
    if (storyVideoRef.current) {
      if (storyVideoRef.current.paused) {
        storyVideoRef.current.play();
        setIsPaused(false);
      } else {
        storyVideoRef.current.pause();
        setIsPaused(true);
      }
    }
  }, []);

  const onSubmitStory = useCallback(() => {
    if (!img || !video || !recordedVideo) {
      return;
    }

    const formData = new FormData();

    if (fileType === "image") {
      // .append method only contains string or Blob as a value.
      formData.append("story", img);
      formData.append("duration", "60");
    } else if (fileType === "video") {
      formData.append("story", video || recordedVideo);
      formData.append("duration", `${videoDuration}`);
    }

    formData.append("storyType", fileType);

    createStory(formData);
  }, [createStory, fileType, video, recordedVideo, img, videoDuration]);

  const capturePhoto = useCallback(async () => {
    if (!webcamRef.current) {
      return;
    }

    const capturedPhoto = webcamRef.current.getScreenshot();

    if (!capturedPhoto) {
      return;
    }

    setFileType("image");
    setImgSrc(capturedPhoto);

    // Extract the base64 string from datauri.
    const base64Data = capturedPhoto.split(",")[1];

    // Convert the base64 string into raw binary string data.
    const decodedData = atob(base64Data);

    // Write the bytes of the string to an ArrayBuffer
    const arrayBuffer = new ArrayBuffer(decodedData.length);

    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < decodedData.length; i++) {
      uint8Array[i] = decodedData.charCodeAt(i);
    }

    const imgBlob = new Blob([uint8Array], { type: "image/png" });

    // Converting the blob into a file to send to the server.
    const file = new File([imgBlob], "capturedPhoto.png", {
      type: "image/png",
    });

    setImg(file);
  }, []);

  const resetCapturedPhoto = useCallback(() => {
    setFileType("");
    setImgSrc("");
    setImg(undefined);
    setVideoSrc("");
    setVideo(undefined);
    setTimer(0);
  }, []);

  const onStartRecording = useCallback(() => {
    if (!webcamRef.current?.stream) {
      return;
    }

    startRecording(webcamRef.current.stream);

    timerId.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  }, [startRecording]);

  const onStopRecording = useCallback(() => {
    stopRecording();

    clearInterval(timerId.current);
  }, [stopRecording]);

  const onVideoMetaDataLoaded: ReactEventHandler<HTMLVideoElement> =
    useCallback(
      (e) => {
        const { duration } = e.target as HTMLVideoElement;

        // Checking the video duration limit
        if (duration > 59 && duration !== Number.POSITIVE_INFINITY) {
          setVideo(undefined);
          setVideoSrc("");
          setFileType("");
          return toast.error("Please select a short video");
        }
        // For recorded video, the duration is Infinity
        if (duration !== Number.POSITIVE_INFINITY) {
          setVideoDuration(Math.floor(duration));
        } else {
          setVideoDuration(timer);
        }

        setIsPaused(true);
      },
      [timer]
    );

  if (!me) {
    toast.error("You are not authenticated", { duration: 2500 });
    return <></>;
  }

  return (
    <main className="flex flex-col justify-around items-center min-h-screen min-w-full bg-[#161616]">
      {isLoading && <WhiteScreen />}
      <X
        onClick={() => {
          if (isRecording) {
            return;
          }

          navigate("/");
        }}
        className="absolute m-2 top-0 left-0 cursor-pointer"
        color="#fff"
      />

      <section
        ref={webcamContainerRef}
        className="w-[23rem] relative overflow-hidden h-[88vh] rounded-2xl"
      >
        {isRecording && (
          <div className="absolute left-1/2 -translate-x-1/2 text-white text-2xl z-10">
            00:{timer < 10 ? `0${timer}` : timer}
          </div>
        )}
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
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                      !isLoading && "z-10"
                    }`}
                  />
                )}
                <video
                  ref={storyVideoRef}
                  src={videoSrc}
                  onLoadedMetadata={onVideoMetaDataLoaded}
                  onClick={stopStartVideo}
                  onPause={() => setIsPaused(true)}
                  onPlay={() => setIsPaused(false)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  playsInline
                ></video>
              </>
            )}
          </>
        ) : (
          <Webcam
            ref={webcamRef}
            imageSmoothing={true}
            audio={true}
            screenshotFormat="image/png"
            mirrored={true}
            videoConstraints={{
              width: { exact: webcamWidth },
              height: { exact: webcamHeight },
              aspectRatio: webcamWidth / webcamHeight,
              facingMode: "user",
            }}
          />
        )}
      </section>
      <section className="flex justify-between items-center px-5 w-[23rem]">
        {imgSrc || videoSrc ? (
          <>
            <div
              className="flex border-2 border-white rounded-full items-center text-white pl-1 pr-2 py-1 cursor-pointer"
              onClick={onSubmitStory}
            >
              <img
                className="h-8 rounded-full"
                src={me.avatar.url || placholder}
                alt={me.username}
              />
              <h2 className="text-sm ml-3">Your story</h2>
            </div>
            <div
              className="flex border-2 border-white rounded-full items-center text-white pl-1 pr-2 py-1 cursor-pointer"
              onClick={resetCapturedPhoto}
            >
              <Aperture size={32} />
              <h2 className="text-base ml-3">Retake</h2>
            </div>
          </>
        ) : (
          <>
            {!isRecording && (
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
                  accept=".jpeg, .jpg, .png, .mp4, .webm"
                  onChange={onFileChange}
                  hidden
                />

                <div
                  className="border-2 border-white rounded-full p-px cursor-pointer bg-[#161616]"
                  onClick={capturePhoto}
                >
                  <Circle
                    fill="#fff"
                    color="#fff"
                    strokeWidth={1.5}
                    size={40}
                  />
                </div>
              </>
            )}

            <div
              className="border-2 relative border-white rounded-full p-px cursor-pointer bg-[#161616]"
              onClick={isRecording ? onStopRecording : onStartRecording}
            >
              <Circle fill="#fff" color="#fff" strokeWidth={1.5} size={40} />
              {isRecording ? (
                <VideoOff
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                  color="#000"
                  strokeWidth={2}
                  size={25}
                />
              ) : (
                <Video
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                  color="#000"
                  strokeWidth={2}
                  size={25}
                />
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default CreateStory;
