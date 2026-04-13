import "./config/env.js"
import cors from "cors"

import express from 'express'
import connectDb from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import passport from './config/passport.js'
import uploadRoutes from './routes/uploadRoutes.js'


const app = express()

connectDb()

app.use(cors({
    origin: [
  "https://freelance-io-beta.vercel.app",
  "http://localhost:5173"
],
    credentials: true
}))

app.use(express.json())

app.use(passport.initialize())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/" , (req, res) => {
    res.send("Api is running")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server started on port: ${port}`)
})
