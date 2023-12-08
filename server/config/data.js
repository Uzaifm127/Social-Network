import mongoose from "mongoose";

export const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (error) {
    console.log("Some error while connecting to DB");
  }
};
