import multer, { diskStorage, memoryStorage, StorageEngine } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const Storage: StorageEngine = memoryStorage();

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${uuidv4().replace(/[-]/g, "")}.${path.extname(file.originalname)}`
    );
  },
});

// export const uploadAvatar = multer({ storage: Storage }).single("avatar");
export const uploadAvatar = multer({ storage }).single("avatar");

export const uploadPost = multer({ storage: Storage }).single("postMedia");

export const uploadStory = multer({ storage: Storage }).single("story");
