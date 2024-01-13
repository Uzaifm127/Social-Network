import { ErrorHandler } from "../utils/error.js";
import { CommentModel } from "../models/comment.model.js";
import { PostModel } from "../models/post.model.js";
import { NextFunction, Request, Response } from "express";

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentMessage } = req.body;
    const { postId } = req.query;

    const post = await PostModel.findById(postId);

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
    next(new ErrorHandler(error.message, error.http_code));
  }
};

export const replyComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commentId } = req.query;
  const { repliedMessage } = req.body;

  const comment = await CommentModel.findById(commentId);

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

  comment.replies.push(reply);
  await comment.save();

  res.status(200).json({
    success: true,
    message: "Replied successfully",
  });
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    return next(new ErrorHandler("Invalid Post", 404));
  }

  const comments = [
    {
      message: post.caption,
      owner: post.owner,
      replies: [],
      likes: [],
      createdAt: post.createdAt,
      _id: "6534223Aa8da8dfa8sd",
    },
    ...post.comments,
  ];

  const replies = comments.reduce((accumulator, element) => {
    return [...accumulator, ...element.replies];
  }, []);

  res.status(200).json({
    success: true,
    comments,
    replies,
  });
};

export const likeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;

    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return next(new ErrorHandler("Invalid comment", 404));
    }

    comment.likes.push(req.user._id);
    await comment.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, error.http_code));
  }
};

export const dislikeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;

    const comment = await CommentModel.findById(commentId).populate("likes");

    if (!comment) {
      return next(new ErrorHandler("Invalid comment", 404));
    }

    const commentIndex = comment.likes.findIndex((element) => {
      return req.user._id === element._id;
    });

    comment.splice(commentIndex, 1);
    await comment.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, error.http_code));
  }
};
