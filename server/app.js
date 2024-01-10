import express from "express";
import cookieParser from "cookie-parser";
import { userRouter } from "./api/user.routes.js";
import { postRouter } from "./api/post.routes.js";
import { commentRouter } from "./api/comment.routes.js";
import { storyRouter } from "./api/stories.routes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { config } from "dotenv";
import cors from "cors";

export const app = express();

config();

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
