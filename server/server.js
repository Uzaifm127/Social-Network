import { app } from "./app.js";
import { cloudinaryConfig } from "./config/cloudinary.js";
import { connectDB } from "./config/data.js";
import { config } from "dotenv";

config();

cloudinaryConfig();
connectDB(process.env.DB_URL);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("Server is Working"));
