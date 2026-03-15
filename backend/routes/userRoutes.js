import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import { getProfile, getUsers, updateProfile } from '../controllers/userController.js'

const router = express.Router()

router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.get('/', protect, getUsers)

export default router