import Router from "express";
import {
  getFeedPosts,
  createPost,
  dislikePost,
  likePost,
  bookmarkPost,
} from "../controllers/postController.js";
import { uploadPost } from "../middlewares/multerMiddleware.js";
import { authenticated } from "../middlewares/authMiddleware.js";

export const postRouter = Router();

postRouter.post("/new", authenticated, uploadPost, createPost);

postRouter.get("/all", authenticated, getFeedPosts);

postRouter.put("/like/:id", authenticated, likePost);

postRouter.put("/dislike/:id", authenticated, dislikePost);

postRouter.put("/bookmark/:id", authenticated, bookmarkPost);
