import { StoryModel } from "../models/stories.model.js";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/error.js";
import { v2 as cloudinary } from "cloudinary";

export const createStory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { storyType, duration } = req.body;
    const { file, user } = req;

    const b64 = Buffer.from(file.buffer).toString("base64");
    const fileData = `data:${file.mimetype};base64,${b64}`;

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      fileData,
      {
        folder: "storiesMedia",
        resource_type: storyType,
      }
    );

    const story = await StoryModel.create({
      story: {
        url: secure_url,
        publicId: public_id,
      },
      storyType,
      tag: "temporary",
      duration,
    });

    user.myStories.push(story._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Story published",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, error.http_code));
  }
};

export const getAllFollowingStories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const following = req.user.following.populate("myStories");

  const followingStories = following.map((element) => {
    return { userAvatar: element.avatar.url, userStories: element.myStories };
  });

  res.status(200).json({
    success: true,
    stories: followingStories,
  });
};

export const getStory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { storyId } = req.params;

  const story = await StoryModel.findById(storyId);

  if (!story) {
    return next(new ErrorHandler("Invalid story", 404));
  }
};
