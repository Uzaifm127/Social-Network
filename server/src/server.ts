import { WebSocketServer } from "ws";
import { app } from "./app.js";
import { cloudinaryConfig, connectDB } from "./config/index.js";
import { config } from "dotenv";
import SendGridMail from "@sendgrid/mail";
import { v4 as uuidv4 } from "uuid";
import { createServer } from "http";

config();

if (!process.env.DB_URL) {
  throw new Error("env variable of data url not found.");
}

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("env variable of sendgrid api key not found.");
}

// Connect to the cloudinary SDK to use cloudinary.
cloudinaryConfig();

// Connecting to the database.
connectDB(process.env.DB_URL);

// Setting the api key of SendGrid for sending the emails.
SendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const PORT = process.env.PORT || 4000;

const server = createServer(app);

const wss = new WebSocketServer({ server });

const clients = new Map();

wss.on("connection", (ws) => {
  const clientId = uuidv4().replace(/-/g, "");

  clients.set(clientId, ws);

  ws.send(clientId);

  ws.on("close", () => {
    console.log("connection closed successfully on close event");
  });

  ws.on("message", (message) => {
    if (message instanceof Buffer) {
      const decoder = new TextDecoder();
      const data = decoder.decode(message);
      ws.emit("chat-message", data);
    } else {
      ws.emit("chat-message", message);
    }
    console.log(message.toString("utf-8"));
  });
});

server.listen(PORT, () => console.log("HTTP and WebSocket server are Working"));
