import { useEffect, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam";

const Test = () => {
  const [message, setMessage] = useState();

  const webcamRef = useRef(null);

  const socket = useMemo(() => {
    return new WebSocket("ws://localhost:4000");
  }, []);

  useEffect(() => {
    socket.addEventListener("chat-message", () => {});

    return () => {
      socket.close();
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.send(message);
  };

  return (
    <>
      
      <form onSubmit={sendMessage}>
        <input
          type="text"
          className="border-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>Messages</div>
      <div>Messages</div>
      <div>Messages</div>
      <div>Messages</div>
      <div>Messages</div>
    </>
  );
};

export default Test;