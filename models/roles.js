import mongoose from "mongoose"

const RolesSchema = new mongoose.Schema({
 name: { type: String, enum: ["Admin", "Project Manager", "Developer", "Viewer"], required: true },
 description: { type: String, required: true },
 isActive: { type: Boolean, required: true, default: true },
 createAt: { type: Date, required: true },
 updateAt: { type: Date, required: false }
});

export default mongoose.model("roles", RolesSchema);