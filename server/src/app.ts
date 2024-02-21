import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./api/user.routes.js";
import { postRouter } from "./api/post.routes.js";
import { commentRouter } from "./api/comment.routes.js";
import { storyRouter } from "./api/stories.routes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { config } from "dotenv";
import { ErrorHandler } from "./utils/error.js";

export const app = express();

config();

if (!process.env.FRONTEND_URL) {
  throw new ErrorHandler("env variable of frontend url is missing.", 404);
}

// Using Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app
  .use("/api/v1/user", userRouter)
  .use("/api/v1/post", postRouter)
  .use("/api/v1/comment", commentRouter)
  .use("/api/v1/story", storyRouter);

// Using error middleware
app.use(errorMiddleware);
