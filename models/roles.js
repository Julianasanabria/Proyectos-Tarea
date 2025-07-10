import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema({
    name: {type: String, enum: ["Admin", "Project Manager", "Developer", "Viewer"], required: true},
    description: {type: String, required: true},
    isActive: {type: Boolean, required: true, default: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true}
})

export default mongoose.model("Roles", rolesSchema)