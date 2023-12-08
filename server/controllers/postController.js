import { PostModel } from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res, next) => {
  const { postCaption } = req.body;
  const { file, user } = req;

  const b64 = Buffer.from(file.buffer).toString("base64");
  const fileData = `data:${file.mimetype};base64,${b64}`;

  const { secure_url, public_id } = await cloudinary.uploader.upload(fileData, {
    folder: "postMedia",
  });

  await PostModel.create({
    media: { url: secure_url, publicId: public_id },
    caption: postCaption,
    owner: user._id,
    comments: [],
  });

  res.status(200).json({
    success: true,
    message: "Post successfully shared",
  });
};
