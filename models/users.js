import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    phone: { type: String, required: true },
    glogalRole: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", required: true },
    isActive: { type: Boolean, required: true, default: true },
    isEmailVerified: { type: Boolean, required: true, default: false },
    lastLogin: { type: Date },
    createAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
})

export default mongoose.model("users", usersSchema);