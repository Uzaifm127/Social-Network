import { UserModel } from "../models/userModel.js";
import { ErrorHandler } from "../config/error.js";
import { authenticateUser } from "../utilities/auth.js";
import { v2 as cloudinary } from "cloudinary";

export const registerUser = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const userEmail = await UserModel.findOne({ email });

    const userName = await UserModel.findOne({ username });

    if (userEmail) return next(new ErrorHandler("User already exist", 400));

    if (userName) return next(new ErrorHandler("Invalid username"));

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
    next(new ErrorHandler(error.message, error.http_code));
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");

  const passwordMatch = await user?.matchPassword(password);

  if (!user || !passwordMatch)
    return next(new ErrorHandler("Invalid email or password", 404));

  authenticateUser(user, res, 200, "Logged in successfully");
};

export const logoutUser = (req, res) => {
  const ENV = process.env.ENVIRONMENT;
  res
    .status(200)
    .cookie("token", "", {
      maxAge: 0,
      sameSite: ENV === "development" ? "Lax" : "None",
      secure: ENV === "development" ? false : true,
      httpOnly: ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const getUserProfile = async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findById(id)
    .populate("posts")
    .populate("followers")
    .populate("following");

  if (!user) {
    return next(new ErrorHandler("User not exist", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
};

export const editUserProfile = async (req, res, next) => {
  try {
    const { bio, website, gender, avatarMessage } = req.body;
    const { user, file: avatar } = req;
    const { publicId } = req.user;

    if (!avatar) {
      if (avatarMessage === "remove") {
        await cloudinary.uploader.destroy({
          folder: "avatar",
          invalidate: true,
          public_id: publicId,
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
    next(new ErrorHandler(error.message, error.http_code));
  }
};

export const followUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userWhoFollow = req.user;

    const userToFollow = await UserModel.findById(id);

    if (!userToFollow) {
      return next(new ErrorHandler("Invalid User", 404));
    }

    userWhoFollow.following.push(userToFollow);
    userToFollow.followers.push(userWhoFollow);

    await userWhoFollow.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, error.http_code));
  }
};

export const unFollowUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userWhoUnfollow = req.user;

    const userToUnfollow = await UserModel.findById(id);

    if (!userToUnfollow) {
      return next(new ErrorHandler("Invalid User", 404));
    }

    const userWhoUnfollowId = userWhoUnfollow.following.indexOf(userToUnfollow);
    const userToUnfollowId = userToUnfollow.followers.indexOf(userWhoUnfollow);

    userWhoUnfollow.following.splice(userToUnfollowId, 1);
    userToUnfollow.followers.splice(userWhoUnfollowId, 1);

    await userWhoUnfollow.save();
    await userToUnfollow.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, error.http_code));
  }
};

export const searchUser = async (req, res) => {
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
    next(new ErrorHandler(error.message, error.http_code));
  }
};
