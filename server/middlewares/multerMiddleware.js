import multer, { memoryStorage } from "multer";

const Storage = new memoryStorage();

export const uploadAvatar = multer({ storage: Storage }).single("avatar");

export const uploadPost = multer({ storage: Storage }).single("postMedia");
