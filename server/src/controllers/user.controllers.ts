import { UserModel } from "../models/user.model.js";
import { ErrorHandler } from "../utils/error.js";
import { authenticateUser } from "../utils/auth.js";
import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Response } from "express";
import { CustomReq } from "../types/index.js";

export const registerUser = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, username, email, password } = req.body;

    const userEmail = await UserModel.findOne({ email });

    const userName = await UserModel.findOne({ username });

    if (userEmail) {
      throw new ErrorHandler("User already exist", 400);
    }

    if (userName) {
      return next(new ErrorHandler("Invalid username", 404));
    }

    const avatar = req.file;

    if (!avatar) {
      const newUser = await UserModel.create({
        avatar: { url: "", publicId: "" },
        name,
        username,
        email,
        password,
        bookmarkedPosts: [],
        posts: [],
        followers: [],
        following: [],
      });

      return authenticateUser(
        newUser,
        res,
        201,
        "Account successfully created"
      );
    }

    const b64 = Buffer.from(avatar.buffer).toString("base64");
    const avatarData = `data:${avatar.mimetype};base64,${b64}`;

    // uploading to cloudinary
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      avatarData,
      { folder: "avatar" }
    );

    const newUser = await UserModel.create({
      avatar: { url: secure_url, publicId: public_id },
      name,
      username,
      email,
      password,
      bookmarkedPosts: [],
      posts: [],
      followers: [],
      following: [],
    });

    authenticateUser(newUser, res, 201, "Account successfully created");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");

  const passwordMatch = await user?.matchPassword(password);

  if (!user || !passwordMatch)
    throw new ErrorHandler("Invalid email or password", 404);

  authenticateUser(user, res, 200, "Logged in successfully");
};

export const logoutUser = (req: CustomReq, res: Response) => {
  const ENV = process.env.ENVIRONMENT;
  res
    .status(200)
    .cookie("token", "", {
      maxAge: 0,
      sameSite: ENV === "development" ? "lax" : "none",
      secure: ENV === "development" ? false : true,
      httpOnly: ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

export const getMyProfile = (req: CustomReq, res: Response) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const getUserProfile = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const user = await UserModel.findById(id)
    .populate("posts")
    .populate("followers")
    .populate("following");

  if (!user) {
    throw new ErrorHandler("User not exist", 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
};

export const editUserProfile = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ErrorHandler("req.user object is undefined", 404);
    }

    const { bio, website, gender, avatarMessage } = req.body;
    const { user, file: avatar } = req;
    const {
      avatar: { publicId },
    } = req.user;

    if (!avatar) {
      if (avatarMessage === "remove") {
        await cloudinary.uploader.destroy(publicId, {
          invalidate: true,
        });

        user.avatar.publicId = "";
        user.avatar.url = "";
      }
      user.website = website || "";
      user.bio = bio || "";
      user.gender = gender || "";

      await user.save();

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
      });
    }

    // Do this if your file is an input type file
    const b64 = Buffer.from(avatar.buffer).toString("base64");
    const avatarData = `data:${avatar.mimetype};base64,${b64}`;

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      avatarData,
      {
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        folder: "avatar",
      }
    );

    user.avatar.publicId = public_id;
    user.avatar.url = secure_url;
    user.website = website || "";
    user.bio = bio || "";
    user.gender = gender || "";

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const followUser = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ErrorHandler("req.user object is undefined", 404);
    }

    const { id } = req.params;
    const userWhoFollow = req.user;

    const userToFollow = await UserModel.findById(id);

    if (!userToFollow) {
      throw new ErrorHandler("Invalid User", 404);
    }

    userWhoFollow.following.push(userToFollow._id);
    userToFollow.followers.push(userWhoFollow._id);

    await userWhoFollow.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const unFollowUser = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ErrorHandler("req.user object is undefined", 404);
    }

    const { id } = req.params;
    const userWhoUnfollow = req.user._id;

    const userToUnfollow = await UserModel.findById(id);

    if (!userToUnfollow) {
      throw new ErrorHandler("Invalid User", 404);
    }

    const userWhoUnfollowId = userWhoUnfollow.following.indexOf(
      userToUnfollow._id
    );
    const userToUnfollowId = userToUnfollow.followers.indexOf(userWhoUnfollow);

    userWhoUnfollow.following.splice(userToUnfollowId, 1);
    userToUnfollow.followers.splice(userWhoUnfollowId, 1);

    await userWhoUnfollow.save();
    await userToUnfollow.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const searchUser = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q } = req.query;

    const users = await UserModel.find({ username: q })
      .populate("posts")
      .populate("followers")
      .populate("following");

    if (!users) {
      return res.status(404).json({
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
