import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import connectDb from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'


const app = express()

connectDb()

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.get("/" , (req, res) => {
    res.send("Api is running")
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server started on port: ${port}`)
})