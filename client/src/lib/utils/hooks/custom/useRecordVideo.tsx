import { RecordVideoTypes } from "@/types/functions/hooks";
import { useCallback, useRef, useState } from "react";

export const useRecordVideo: RecordVideoTypes = () => {
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [recordedVideoSrc, setRecordedVideoSrc] = useState<string>("");
  const [recordedVideo, setRecordedVideo] = useState<File | undefined>();

  const videoRecorder = useRef<MediaRecorder | null>(null);

  const onDataAvailable = useCallback((e: BlobEvent) => {
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
    (stream: MediaStream) => {
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
    if (videoRecorder.current) {
      setIsCapturing(false);
      videoRecorder.current.stop();
    }
  }, []);

  return [
    startRecording,
    stopRecording,
    isCapturing,
    recordedVideoSrc,
    recordedVideo,
  ];
};
