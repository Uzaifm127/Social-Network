import multer, { memoryStorage, StorageEngine } from "multer";

const Storage: StorageEngine = memoryStorage();

export const uploadAvatar = multer({ storage: Storage }).single("avatar");

export const uploadPost = multer({ storage: Storage }).single("postMedia");

export const uploadStory = multer({ storage: Storage }).single("story");
