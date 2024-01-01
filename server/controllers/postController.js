import { PostModel } from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";
import { shuffleArray } from "../utilities/algorithms.js";
import { ErrorHandler } from "../config/error.js";

export const createPost = async (req, res, next) => {
  const { postCaption } = req.body;
  const { file, user } = req;

  const b64 = Buffer.from(file.buffer).toString("base64");
  const fileData = `data:${file.mimetype};base64,${b64}`;

  const { secure_url, public_id } = await cloudinary.uploader.upload(fileData, {
    folder: "postMedia",
  });

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
};

export const getFeedPosts = async (req, res) => {
  const { following } = req.user;
  const { feedPostLimit } = req.query;
  const { _id } = req.user;

  let posts = await PostModel.find({
    owner: { $in: [...following, _id] },
  }).populate("owner");

  posts = shuffleArray(posts);

  res.status(200).json({
    success: true,
    feedPosts: posts.slice(0, feedPostLimit),
  });
};

export const likePost = async (req, res, next) => {
  const { id } = req.params;

  const post = await PostModel.findById(id);

  if (!post) {
    return next(new ErrorHandler("Post doesn't exist", 404));
  }

  const { _id } = req.user;

  post.likes.push(_id);

  await post.save();

  res.status(200).json({
    success: true,
  });
};

export const dislikePost = async (req, res, next) => {
  const { id } = req.params;

  const post = await PostModel.findById(id);

  if (!post) {
    return next(new ErrorHandler("Post doesn't exist", 404));
  }

  const { _id } = req.user;

  const dislikeIndex = post.likes.indexOf(_id);

  post.likes.splice(dislikeIndex, 1);

  await post.save();

  res.status(200).json({
    success: true,
  });
};

export const bookmarkPost = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  const bmPost = user.bookmarkedPosts;
  const { action } = req.body;

  const postToBookmark = await PostModel.findById(id);

  if (!postToBookmark) {
    return next(new ErrorHandler("Invalid Post", 404));
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
      return element._id === id;
    });

    bmPost.splice(indexToRemove, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Bookmarked removed",
    });
  }
};
