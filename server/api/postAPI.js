import Router from "express";
import { createPost } from "../controllers/postController.js";
import { getFeedPosts } from "../controllers/postController.js";
import { uploadPost } from "../middlewares/multerMiddleware.js";
import { authenticated } from "../middlewares/authMiddleware.js";

export const postRouter = Router();

postRouter.post("/new", authenticated, uploadPost, createPost);

postRouter.post("/all", authenticated, getFeedPosts);
