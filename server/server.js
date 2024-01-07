import { app } from "./app.js";
import { cloudinaryConfig, connectDB } from "./config/index.js";
import { config } from "dotenv";
import SendGridMail from "@sendgrid/mail";

config();

// Connect to the cloudinary SDK to use cloudinary.
cloudinaryConfig();

// Connecting to the database.
connectDB(process.env.DB_URL);

// Setting the api key of SendGrid for sending the emails.
SendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("Server is Working"));
