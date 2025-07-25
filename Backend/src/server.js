import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db.js"
import { errorMiddleware } from "./middleware/errorMiddleware.js"
import authMiddleware from "./middleware/authMiddleware.js"

// Import all routes
import aiRoutes from "./routes/ai.routes.js" // <-- We will use this now
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import citizenRoutes from "./routes/citizenRoutes.js"
import documentRoutes from "./routes/documentRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js"
import kioskRoutes from "./routes/kioskRoutes.js"
import legalIssueRoutes from "./routes/legalIssueRoutes.js"
import paralegalRoutes from "./routes/paralegalRoutes.js"
import subscriptionRoutes from "./routes/subscriptionRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import voiceQueryRoutes from "./routes/voiceQueryRoutes.js"

const app = express()
const PORT = process.env.PORT || 5001

const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) || []

if (allowedOrigins.length === 0) {
  console.error("FATAL ERROR: CORS_ORIGIN is not defined properly.")
  process.exit(1)
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))
app.set("trust proxy", 1)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cookieParser())

// --- Main API Router ---
const apiRouter = express.Router()

// Health check and public routes
apiRouter.get("/", (req, res) => res.json({ message: "API is Live" }))
apiRouter.use("/auth", authRoutes)

// --- THIS IS THE CRITICAL FIX ---
// All routes below this point are protected and will require a valid JWT
apiRouter.use(authMiddleware)

// Protected routes are now correctly organized
apiRouter.use("/ai", aiRoutes) // <-- The AI route is now live and protected
apiRouter.use("/admins", adminRoutes)
apiRouter.use("/citizens", citizenRoutes)
apiRouter.use("/documents", documentRoutes)
apiRouter.use("/employees", employeeRoutes)
apiRouter.use("/kiosks", kioskRoutes)
apiRouter.use("/issues", legalIssueRoutes)
apiRouter.use("/paralegals", paralegalRoutes)
apiRouter.use("/subscriptions", subscriptionRoutes)
apiRouter.use("/users", userRoutes)
apiRouter.use("/voicequeries", voiceQueryRoutes)

// Mount the entire API router to the /api path
app.use("/api", apiRouter)

app.get("/", (req, res) => res.send("NyayaSaathi Backend is running."))
app.use(errorMiddleware)

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server is running at port ${PORT}`))
  })
  .catch((err) => {
    console.error("MONGO DB connection failed !!!", err)
    process.exit(1)
  })