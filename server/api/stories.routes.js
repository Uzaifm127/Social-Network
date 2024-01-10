import { Router } from "express";
import { createStory } from "../controllers/stories.controllers";

export const storyRouter = Router();

storyRouter.post("/new", createStory);
