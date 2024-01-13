import { useEffect, useMemo, useState } from "react";

const Test = () => {
  const [message, setMessage] = useState();

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
