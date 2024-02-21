import { NextFunction, Response } from "express";
import { PostModel } from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";
import { shuffleArray } from "../utils/algorithms.js";
import { ErrorHandler } from "../utils/error.js";
import { CustomReq } from "../types/index.js";
import { PostTypes } from "../types/models/post.types.js";

export const createPost = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postCaption } = req.body;
    const { file, user } = req;

    if (!user) {
      throw new Error("req.user object is undefined");
    }

    if (!file) {
      throw new ErrorHandler("file not found", 404);
    }

    const b64 = Buffer.from(file.buffer).toString("base64");
    const fileData = `data:${file.mimetype};base64,${b64}`;

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      fileData,
      {
        folder: "postMedia",
      }
    );

    const post = await PostModel.create({
      media: { url: secure_url, publicId: public_id },
      caption: postCaption,
      likes: [],
      comments: [],
      owner: user._id,
    });

    user.posts.push(post._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Post successfully shared",
    });
  } catch (error) {
    next(error);
  }
};

export const getFeedPosts = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error("req.user object is undefined");
    }

    const { following } = req.user;
    const { feedPostLimit } = req.query;

    const posts = await PostModel.find({
      owner: { $in: [...following, req.user._id] },
    }).populate("owner");

    const shuffledPosts = shuffleArray<PostTypes>(posts);

    res.status(200).json({
      success: true,
      feedPosts: shuffledPosts.slice(0, parseInt(feedPostLimit as string)),
    });
  } catch (error) {
    next(error);
  }
};

export const likePost = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error("req.user object is undefined");
    }

    const { id } = req.params;

    const post = await PostModel.findById(id);

    if (!post) {
      throw new ErrorHandler("Post doesn't exist", 404);
    }

    const { _id } = req.user;

    post.likes.push(_id);

    await post.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const dislikePost = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error("req.user object is undefined");
    }

    const { id } = req.params;

    const post = await PostModel.findById(id);

    if (!post) {
      throw new ErrorHandler("Post doesn't exist", 404);
    }

    const { _id } = req.user;

    const dislikeIndex = post.likes.indexOf(_id);

    post.likes.splice(dislikeIndex, 1);

    await post.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const bookmarkPost = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error("req.user object is undefined");
    }

    const user = req.user;
    const bmPost = user.bookmarkedPosts;
    const { id } = req.params;
    const { action } = req.body;

    const postToBookmark = await PostModel.findById(id);

    // if you want to use `next` for error then use return along with it.
    if (!postToBookmark) {
      throw new ErrorHandler("Invalid Post", 404);
    }

    if (action === "add") {
      bmPost.push(id);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Bookmarked successfully",
      });
    } else {
      const indexToRemove = bmPost.findIndex((element) => {
        return element.toString() === id;
      });

      bmPost.splice(indexToRemove, 1);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Bookmarked removed",
      });
    }
  } catch (error) {
    next(error);
  }
};
