import Router from "express";
import {
  addComment,
  getComments,
  likeComment,
  dislikeComment,
  replyComment,
} from "../controllers/comment.controllers.js";
import { authenticated } from "../middlewares/authMiddleware.js";

export const commentRouter = Router();

commentRouter.post("/add-comment", authenticated, addComment);

commentRouter.get("/get", authenticated, getComments);

commentRouter.put("/like/:commentId", authenticated, likeComment);

commentRouter.put("/reply-comment", authenticated, replyComment);

commentRouter.put("/dislike/:commentId", authenticated, dislikeComment);
