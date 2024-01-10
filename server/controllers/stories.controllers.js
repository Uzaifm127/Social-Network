import { StoryModel } from "../models/stories.model.js";

export const createStory = (req, res, next) => {};

export const getStory = async (req, res, next) => {
  const { id } = req.params;

  const story = await StoryModel.findById(id);

  if (!story) {
    return next(new ErrorHandler("Invalid story", 404));
  }
};
