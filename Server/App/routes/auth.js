import express from "express";
import { registerUser, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

export default router;
// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// router.post("/register", async(req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const existing = await User.findOne({ email });
//         if (existing) return res.status(400).json({ message: "User exists" });
//         const hashed = await bcrypt.hash(password, 10);
//         const user = new User({ name, email, password: hashed });
//         await user.save();
//         res.json({ message: "Registered successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.post("/login", async(req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "User not found" });
//         const valid = await bcrypt.compare(password, user.password);
//         if (!valid) return res.status(400).json({ message: "Invalid credentials" });
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// export default router;