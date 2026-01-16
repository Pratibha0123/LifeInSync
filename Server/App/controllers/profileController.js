import Profile from "../models/Profile.js";

// ✅ Get Profile by Email
export const getProfile = async(req, res) => {
    try {
        const { email } = req.params;
        const profile = await Profile.findOne({ email });

        if (!profile)
            return res.status(404).json({ message: "Profile not found" });

        res.json(profile);
    } catch (err) {
        console.error("❌ Error fetching profile:", err);
        res.status(500).json({ message: err.message });
    }
};

// ✅ Update or Create Profile
export const updateProfile = async(req, res) => {
    try {
        const { email } = req.params;
        const updateData = req.body;

        if (req.file) updateData.profileImg = `/uploads/${req.file.filename}`;

        const profile = await Profile.findOneAndUpdate({ email },
            updateData, { new: true, upsert: true } // create if not exist
        );

        res.json(profile);
    } catch (err) {
        console.error("❌ Error updating profile:", err);
        res.status(500).json({ message: err.message });
    }
};