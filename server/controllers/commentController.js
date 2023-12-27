import { CommentModel } from "../models/commentModel.js";
import { PostModel } from "../models/postModel.js";

export const addComment = async (req, res, next) => {
  const { commentMessage } = req.body;
  const { postId } = req.query;

  console.log(commentMessage);
  console.log(req.body);
  console.log(postId);

  const post = await PostModel.findById(postId);

  if (!post) {
    return next(new ErrorHandler("Comment Invalid on given post", 404));
  }

  const comment = await CommentModel.create({
    message: commentMessage,
    owner: req.user._id,
    replies: [],
  });

  post.comments.push(comment._id);
  await post.save();

  res.status(201).json({
    success: true,
    message: "Comment added",
  });
};
