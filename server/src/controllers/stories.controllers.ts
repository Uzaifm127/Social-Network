import { StoryModel } from "../models/stories.model.js";
import { UserModel } from "../models/user.model.js";
import { Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/error.js";
import { v2 as cloudinary } from "cloudinary";
import { CustomReq } from "../types/index.js";
import { UserTypes } from "../types/models/user.types.js";

export const createStory = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new ErrorHandler("req.user object is undefined", 404);
  }

  try {
    const { storyType, duration } = req.body;
    const { file, user } = req;

    if (!file) {
      throw new ErrorHandler("file not found", 404);
    }

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
      expiresAt: Date.now(),
    });

    user.myStories.push(story._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Story published",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllFollowingStories = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ErrorHandler("req.user object is undefined", 404);
    }

    const user = await req.user.populate("following");
    const following = user.following;
    let populatedUser = await user.populate("myStories");
    const myStories = populatedUser.myStories;

    // following.map returns a promise as callback is async func.
    let followingStories = await Promise.all(
      following.map(async (user) => {
        // Use await to populate an existing document.
        if ("populate" in user) {
          const stories = await user.populate("myStories");

          return {
            _id: user._id,
            userAvatar: user.avatar.url,
            username: user.username,
            userStories: stories.myStories,
          };
        }
      })
    );

    followingStories = followingStories.filter((story) => {
      if (!story) {
        // If there is no story, then we don't filter that element.
        return false;
      }

      return story.userStories.length > 0;
    });

    if (myStories.length > 0) {
      const myStoryElement = {
        _id: req.user._id,
        userAvatar: req.user.avatar.url,
        username: req.user.username,
        userStories: myStories,
      };

      const stories = [myStoryElement, ...followingStories];

      return res.status(200).json({
        success: true,
        stories,
      });
    } else {
      res.status(200).json({
        success: true,
        stories: followingStories,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getStory = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { storyUserId } = req.params;

    const storyUser = await UserModel.findById(storyUserId).populate(
      "myStories"
    );

    if (!storyUser) {
      throw new ErrorHandler("Invalid story", 404);
    }

    res.status(200).json({
      success: true,
      storyUser,
    });
  } catch (error) {
    next(error);
  }
};
