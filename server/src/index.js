import express from "express"
import "dotenv/config"
import loginRoutes from "./routes/auth.routes.js"
import domainRoutes from "./routes/domain.routes.js"
import { connectDB } from "./db/sqlDB.js"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))

app.use("/api/auth/google", loginRoutes)
app.use("/api/domain", domainRoutes)

app.get("/", (req, res) => {
  res.send("Hello, World!")
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}).catch((error) => {
  console.error("Failed to start server:", error)
})