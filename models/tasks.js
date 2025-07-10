import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    project:{type:mongoose.Schema.Types.ObjectId, ref:"projects", required:true},
    assignedTo:{type:mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    status:{type:mongoose.Schema.Types.ObjectId, ref:"states", required:true},
    priority:{type:String, enum:["Low", "Medium", "High", "Critical"], required:true},
    estimatedHours:{type:Number, required:true},
    actualHours:{type:Number, default:0},
    startDate:{type:Date, required:true},
    dueDate:{type:Date, required:true},
    completedAt:{type:Date},
    tags:[{type:String}],
    isActive:{type:Boolean, required:true, default:true},
    createdAt:{type:Date, required:true, default: Date.now},
    updatedAt:{type:Date, required:true, default: Date.now}
    
})

export default mongoose.model("tasks", tasksSchema);