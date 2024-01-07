import { ErrorHandler } from "../utilities/error.js";
import { CommentModel } from "../models/commentModel.js";
import { PostModel } from "../models/postModel.js";

export const addComment = async (req, res, next) => {
  try {
    const { commentMessage } = req.body;
    const { postId } = req.query;

    const post = await PostModel.findById(postId);

    if (!post) {
      return next(new ErrorHandler("Comment Invalid on given post", 404));
    }

    const comment = await CommentModel.create({
      message: commentMessage,
      owner: req.user._id,
      replies: [],
      likes: [],
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

export const replyComment = (req, res, next) => {};

export const getComments = async (req, res, next) => {
  const { postId } = req.query;

  const post = await PostModel.findById(postId)
    .populate({
      path: "comments",
      populate: {
        path: "owner likes replies",
      },
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

export const likeComment = async (req, res, next) => {
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

export const dislikeComment = async (req, res, next) => {
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
