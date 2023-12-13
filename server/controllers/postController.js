import { PostModel } from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";
import { UserModel } from "../models/userModel.js";
import { shuffleArray } from "../utilities/algorithms.js";

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

  const followingPosts = await PostModel.find({ owner: { $in: following } });

  const myPosts = req.user.posts;

  const posts = shuffleArray([...followingPosts, ...myPosts]);

  res.status(200).json({
    success: true,
    feedPosts: posts.slice(0, feedPostLimit),
  });
};
