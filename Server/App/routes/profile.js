import express from "express";
import multer from "multer";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ GET profile by email
router.get("/:email", getProfile);

// ✅ PUT (update or create) profile by email
router.put("/update/:email", upload.single("profileImg"), updateProfile);

export default router;