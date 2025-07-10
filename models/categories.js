import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
	name: {type:String, required:true},
    description: {type:String, required:true},
    isActive: { type: Boolean, required: true, default: true },
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: "users", required:true },
    createAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
    
});

export default mongoose.model("categories", categoriesSchema);