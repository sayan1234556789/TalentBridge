import express from 'express'
import { loginUser, registerUser, verifyEmail } from '../controllers/authControllers.js'

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/verify/:token", verifyEmail)

export default router