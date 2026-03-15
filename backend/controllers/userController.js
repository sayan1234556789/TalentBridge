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
        const updatedUser = await User.findByIdAndUpdate(
            req.user,
            req.body,
            {new: true}
        )

        res.json(updatedUser)
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