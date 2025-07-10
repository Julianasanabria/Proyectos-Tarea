import mongoose from "mongoose"

const projectsSchema = new mongoose.Schema({
	name:{type: String, required:true},
    description:{type:String, required:true},
    category:{type: mongoose.Schema.Types.ObjectId, ref:"categories", required:true},
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    members: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
        role: { type: mongoose.Schema.Types.ObjectId, ref: "roles", required: true },
        joinedAt: { type: Date, default: Date.now }
    }],
    status:{type: mongoose.Schema.Types.ObjectId, ref:"states", required:true},
    priority:{type:String, enum: ["Low", "Medium", "High", "Critical"], required:true},
    startDate:{type:Date, required:true},
    endDate:{type:Date, required:true},
    estimatedHours:{type:Number, required:true},
    actualHours:{type:Number, default:0},
    budget:{type:Number, required:true},
    isActive:{type:Boolean, required:true, default:true},
    tags:[{ type: String }],
    createdAt:{type:Date, required:true, default: Date.now},
    updatedAt:{type:Date, required:true, default: Date.now}



});

export default mongoose.model("projects", projectsSchema);