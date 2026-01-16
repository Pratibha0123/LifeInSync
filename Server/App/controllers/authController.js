import User from "../models/userModel.js";
import Profile from "../models/Profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register User
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const existingUsername = await User.findOne({ username });
        if (existingUsername) return res.status(400).json({ message: "Username already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Create initial profile
        const newProfile = new Profile({
            name: username,
            email: email,
            profileImg: ""
        });
        await newProfile.save();

        // Exclude password from response
        const { password: _, ...others } = newUser._doc;

        res.status(201).json({ message: "User registered successfully", user: others });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Exclude password from response
        const { password: _, ...others } = user._doc;

        res.status(200).json({ message: "Login successful", token, user: others });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};