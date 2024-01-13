import { Router } from "express";
import { createStory, getStory } from "../controllers/stories.controllers.js";
import { authenticated } from "../middlewares/authMiddleware.js";

export const storyRouter = Router();

storyRouter.post("/new", authenticated, createStory);

storyRouter.get("/get/:storyId", authenticated, getStory);
