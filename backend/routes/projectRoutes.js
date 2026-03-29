import express from 'express'
import { createProject, deleteProject, getMyProjects, getProjectById, getprojects, updateProject } from '../controllers/projectControllers.js'
import protect from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/", protect,  createProject)
router.get("/", getprojects)
router.get("/my-projects", protect, getMyProjects)
router.get("/:id", getProjectById)
router.put("/:id", protect, updateProject)
router.delete("/:id",protect, deleteProject)

export default router