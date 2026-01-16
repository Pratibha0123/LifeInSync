import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async(req, res) => {
    console.log("📩 Incoming contact request:", req.body); // ✅ Add this line

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        console.log("✅ Contact saved successfully:", newContact);
        res.status(201).json({ message: "Message saved successfully" });
    } catch (err) {
        console.error("❌ Error saving contact:", err);
        res.status(500).json({ message: "Server error while saving message" });
    }
});

export default router;