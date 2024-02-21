import { ErrorHandler } from "../utils/error.js";
import { CommentModel } from "../models/comment.model.js";
import { PostModel } from "../models/post.model.js";
import { NextFunction, Response } from "express";
import { CustomReq } from "../types/index.js";
import { v4 as uuidv4 } from "uuid";
import {
  AllCommentsType,
  CommentTypes,
  FirstComment,
} from "../types/models/comment.types.js";
import { UserTypes } from "../types/models/user.types.js";
import { Types } from "mongoose";

export const addComment = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentMessage } = req.body;
    const { postId } = req.query;

    const post = await PostModel.findById(postId);

    if (!req.user) {
      throw new Error("req.user object is undefined");
    }

    if (!post) {
      return next(new ErrorHandler("Comment Invalid on given post", 404));
    }

    const comment = await CommentModel.create({
      message: commentMessage,
      likes: [],
      owner: req.user._id,
      replies: [],
      tag: "comment",
    });

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({
      success: true,
      message: "Comment added",
    });
  } catch (error) {
    next(error);
  }
};

export const replyComment = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.query;
    const { repliedMessage } = req.body;

    const comment = await CommentModel.findById(commentId);

    if (!req.user) {
      throw new Error("req.user object is undefined");
    }

    if (!comment) {
      return next(new ErrorHandler("Invalid comment", 404));
    }

    const reply = await CommentModel.create({
      message: repliedMessage,
      likes: [],
      owner: req.user._id,
      replies: undefined,
      tag: "reply",
    });

    (comment.replies as Types.Array<CommentTypes>).push(reply);
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Replied successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.query;

    const post = await PostModel.findById(postId)
      .populate({
        path: "comments",
        populate: [
          { path: "owner" },
          { path: "likes" },
          {
            path: "replies",
            populate: [{ path: "likes" }, { path: "owner" }],
          },
        ],
      })
      .populate("owner");

    if (!post) {
      throw new ErrorHandler("Invalid Post", 404);
    }

    const firstComment = {
      message: post.caption,
      owner: post.owner as UserTypes,
      replies: [],
      likes: [],
      createdAt: post.createdAt,
      _id: uuidv4().replace(/[-]/g, ""),
    };

    const comments: AllCommentsType = [
      firstComment,
      ...(post.comments as Array<CommentTypes>),
    ];

    const replies = comments.reduce<CommentTypes[]>(
      (accumulator: CommentTypes[], element: CommentTypes | FirstComment) => {
        return [
          ...accumulator,
          ...(element.replies as CommentTypes[] | never[]),
        ];
      },
      []
    );

    res.status(200).json({
      success: true,
      comments,
      replies,
    });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;

    const comment = await CommentModel.findById(commentId);

    if (!req.user) {
      throw new Error("req.user object is undefined");
    }

    if (!comment) {
      throw new ErrorHandler("Invalid comment", 404);
    }

    (comment.likes as Types.Array<Types.ObjectId>).push(req.user._id);
    await comment.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const dislikeComment = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;

    const comment = await CommentModel.findById(commentId).populate("likes");

    if (!comment) {
      throw new ErrorHandler("Invalid comment", 404);
    }

    const commentIndex = comment.likes.findIndex((element) => {
      if (!req.user) {
        throw new Error("req.user object is undefined");
      }

      return req.user._id === element._id;
    });

    comment.likes.splice(commentIndex, 1);
    await comment.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
