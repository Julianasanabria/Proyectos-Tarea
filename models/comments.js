import mongoose from "mongoose";


const commentsSchema = new mongoose.Schema({
    content:{type:String, required:true},
    author:{type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    projectId:{type: mongoose.Schema.Types.ObjectId, ref:"projects", required:true},
    editedAt:{type:Date},
     createdAt:{type:Date, required:true, default: Date.now},
    updatedAt:{type:Date, required:true, default: Date.now}
    
})

export default mongoose.model("comments", commentsSchema);