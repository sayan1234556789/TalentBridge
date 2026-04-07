import User from "../models/User.js"

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password")
        res.json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user)

        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }

        user.name = req.body.name || user.name
        user.bio = req.body.bio || user.bio
        user.skills = req.body.skills || user.skills
        user.avatar = req.body.avatar || user.avatar

        await user.save()
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await User.find().select("-password")
        res.json(users)
    } catch (error) {
        res.staus(500).json({
            message: error.message
        })
    }
}