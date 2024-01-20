import { useCallback, useRef, useState } from "react";

export const useRecordVideo = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [recordedVideoSrc, setRecordedVideoSrc] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);

  const videoRecorder = useRef(null);

  const onDataAvailable = useCallback((e) => {
    const { data } = e;

    // Means if we have a data to proceed
    if (data.size > 0) {
      const blob = new Blob([data], { type: "video/webm" });

      const file = new File([blob], "recorded-story-media.webm", {
        type: "video/webm",
      });

      setRecordedVideoSrc(URL.createObjectURL(file));

      setRecordedVideo(file);
    }
  }, []);

  const startRecording = useCallback(
    (stream) => {
      setIsCapturing(true);

      videoRecorder.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      videoRecorder.current.addEventListener("dataavailable", onDataAvailable);

      videoRecorder.current.start();
    },
    [onDataAvailable]
  );

  const stopRecording = useCallback(() => {
    setIsCapturing(false);

    videoRecorder.current.stop();
  }, []);

  return [
    startRecording,
    stopRecording,
    isCapturing,
    recordedVideoSrc,
    recordedVideo,
  ];
};
