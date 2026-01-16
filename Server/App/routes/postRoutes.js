import express from "express";
import multer from "multer";
import Post from "../models/Post.js";

const router = express.Router();

// Multer storage (reuse existing storage)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ----------------- CREATE POST -----------------
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, desc, username } = req.body;

        // Validate
        if (!title || !desc) {
            return res.status(400).json({ message: "Title and Description are required" });
        }

        const newPost = new Post({
            title,
            desc,
            username: username || "Anonymous", // Default if not provided
            image: req.file ? `/uploads/${req.file.filename}` : "",
            categories: req.body.categories ? [req.body.categories] : [],
        });

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        console.error("Create Post Error:", err);
        res.status(500).json(err);
    }
});

// ----------------- GET ALL POSTS -----------------
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username }).sort({ createdAt: -1 });
        } else if (catName) {
            posts = await Post.find({ categories: { $in: [catName] } }).sort({ createdAt: -1 }); // Handles both single string vs array if schema changes
        } else {
            posts = await Post.find().sort({ createdAt: -1 });
        }
        res.status(200).json(posts);
    } catch (err) {
        console.error("Get All Posts Error:", err);
        res.status(500).json(err);
    }
});

// ----------------- UPDATE POST -----------------
router.put("/update/:id", upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // Check required fields
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content required" });
        }

        // Build update object
        const updateData = {
            title,
            desc: content,
        };

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
            new: true, // return updated document
            runValidators: true,
        });

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(updatedPost);
    } catch (err) {
        console.error("Update Error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// Get single post by ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// ----------------- DELETE POST -----------------
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post has been deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

export default router;