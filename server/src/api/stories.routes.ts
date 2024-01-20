import { Router } from "express";
import {
  createStory,
  getStory,
  getAllFollowingStories,
} from "../controllers/stories.controllers.js";
import { authenticated } from "../middlewares/authMiddleware.js";
import { uploadStory } from "../middlewares/multer.middleware.js";

export const storyRouter = Router();

storyRouter.post("/new", authenticated, uploadStory, createStory);

storyRouter.get("/all-following", authenticated, getAllFollowingStories);

storyRouter.get("/get/:storyId", authenticated, getStory);
