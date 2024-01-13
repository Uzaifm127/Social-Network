import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { config } from "dotenv";

config();

export const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (error) {
    console.log("Some error while connecting to DB");
  }
};

export const cloudinaryConfig = () => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
  });
};
