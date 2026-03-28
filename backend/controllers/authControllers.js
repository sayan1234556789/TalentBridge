import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import sendEmail from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const token = crypto.randomBytes(32).toString("hex")
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            verificationToken: token
        })

        const verificationUrl = `${process.env.CLIENT_URL}/verify/${token}`

        await sendEmail(
            email,
            "Verify your Email",
            `<h2>Click to verify</h2><a href="${verificationUrl}">${verificationUrl}</a>`
        )

        res.status(201).json({
            success: true,
            message: "User registered successfully, please verify your email",
            token,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }
        if(!user.isVerified){
            return res.status(400).json({
                message: "please verify your email"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                message: "invalid credentials"
            })
        }

        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.json({
            success: true,
            message: "Login Successful",
            token,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyEmail = async(req, res) => {
    try {
        const user = await User.findOne({
            verificationToken: req.params.token
        })

        if(!user){
            return res.status(400).json({
                message: "invalid token"
            })
        }

        user.isVerified = true;
        user.verificationToken = undefined

        await user.save()

        res.status(200).json({
            message: "email verified successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}