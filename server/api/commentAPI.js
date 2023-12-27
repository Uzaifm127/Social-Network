import Router from "express";
import { addComment } from "../controllers/commentController.js";
import { authenticated } from "../middlewares/authMiddleware.js";

export const commentRouter = Router();

commentRouter.post("/add-comment", authenticated, addComment);
