import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    location: { type: String, default: "" },
    website: { type: String, default: "" },
    profileImg: { type: String, default: "" },
});

export default mongoose.model("Profile", profileSchema);