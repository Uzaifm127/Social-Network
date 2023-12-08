import cloudinary from "cloudinary";
import { config } from "dotenv";

config();

export const cloudinaryConfig = () => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
  });
};
