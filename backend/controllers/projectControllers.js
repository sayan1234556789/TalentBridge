import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const {title, description, budget, skillsRequired, deadline } = req.body

        const project = await Project.create({
            title,
            description,
            budget,
            skillsRequired,
            deadline,
            clientId: req.user
        })

        res.status(201).json({
            message: "project created successfully",
            project: project
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


export const getprojects = async (req, res) => {
    try {
        const projects = await Project.find()
        .populate("clientId", "name email")

        res.json(projects)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        .populate("clientId", "name email")

        if(!project){
            res.status(404).json({
                message: "project not found"
            })
        }
        res.json(project)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
