import { WebSocketServer } from "ws";
import { app } from "./app.js";
import { cloudinaryConfig, connectDB } from "./config/index.js";
import { config } from "dotenv";
import SendGridMail from "@sendgrid/mail";
import { createServer } from "http";

config();

// Connect to the cloudinary SDK to use cloudinary.
cloudinaryConfig();

// Connecting to the database.
connectDB(process.env.DB_URL || "");

// Setting the api key of SendGrid for sending the emails.
SendGridMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const PORT = process.env.PORT || 4000;

const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log(`New Socket is connected`);
  console.log(wss.clients.size);
  //   console.log(wss.clients.values.toString());

  socket.on("close", () => {
    console.log("connection closed successfully on close event");
  });

  socket.on("message", (message) => {
    if (message instanceof Buffer) {
      const decoder = new TextDecoder();
      const data = decoder.decode(message);
      socket.emit("chat-message", data);
    }
    console.log(message.toString("utf-8"));
  });
});

server.listen(PORT, () => console.log("HTTP and WebSocket server are Working"));
