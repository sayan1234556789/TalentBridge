import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const { projectId, assignedTo, title, description } = req.body

        const task = await Task.create({
            projectId,
            assignedTo,
            title,
            description
        })

        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const getProjectTasks = async (req, res) =>{
    try {
        const tasks = await Task.find({
            projectId: req.params.projectId,
        }).populate("assignedTo", "name email")

        res.json(tasks)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({
                message: "task not found"
            })
        }

        Object.assign(task, req.body);

        const updatedData = await task.save();
        
        res.status(200).json(updatedData)
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({
                message: "task not found"
            })
        }

        await task.deleteOne()

        res.status(200).json({
            message: "successfully deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}