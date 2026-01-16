import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";

// Load env
dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Routes Import
import authRoute from "./App/routes/authRoutes.js";
import postRoute from "./App/routes/postRoutes.js";
import profileRoute from "./App/routes/profile.js";
import contactRoute from "./App/routes/contact.js";
import categoryRoute from "./App/routes/categories.js";

// Use Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/profile", profileRoute);
app.use("/api/contact", contactRoute);
app.use("/api/categories", categoryRoute);

// MongoDB Connect
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));