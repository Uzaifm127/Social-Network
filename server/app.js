import express from "express";
import cookieParser from "cookie-parser";
import { userRouter } from "./api/userAPI.js";
import { postRouter } from "./api/postAPI.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { config } from "dotenv";
import cors from "cors";

export const app = express();

config();

// Using Middlewares
// app.use(multer({ limits: { fileSize: 1000000000 } }).any());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Using Routes Middlewares
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

// Using error middleware
app.use(errorMiddleware);