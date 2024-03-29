import Router from "express";
import {
  getFeedPosts,
  createPost,
  dislikePost,
  likePost,
  bookmarkPost,
} from "../controllers/post.controllers.js";
import { uploadPost } from "../middlewares/multer.middleware.js";
import { authenticated } from "../middlewares/authMiddleware.js";

export const postRouter = Router();

postRouter.post("/new", authenticated, uploadPost, createPost);

postRouter.get("/all", authenticated, getFeedPosts);

postRouter.put("/like/:id", authenticated, likePost);

postRouter.put("/dislike/:id", authenticated, dislikePost);

postRouter.put("/bookmark/:id", authenticated, bookmarkPost);
