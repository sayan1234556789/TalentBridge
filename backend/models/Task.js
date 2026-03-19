import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending","in-progress", "completed"],
        default: "pending"
    }
},{timestamps: true})

const Task = mongoose.model("Task", taskSchema)
export default Task