// // // // // // // // // import dotenv from "dotenv"
// // // // // // // // // dotenv.config()

// // // // // // // // // import express from "express"
// // // // // // // // // import cors from "cors"
// // // // // // // // // import cookieParser from "cookie-parser"
// // // // // // // // // import { connectDB } from "./config/db.js"
// // // // // // // // // import { errorMiddleware } from "./middleware/errorMiddleware.js"
// // // // // // // // // import authMiddleware from "./middleware/authMiddleware.js"

// // // // // // // // // // Import all routes
// // // // // // // // // import aiRoutes from "./routes/ai.routes.js" // <-- We will use this now
// // // // // // // // // import authRoutes from "./routes/authRoutes.js"
// // // // // // // // // import adminRoutes from "./routes/adminRoutes.js"
// // // // // // // // // import citizenRoutes from "./routes/citizenRoutes.js"
// // // // // // // // // import documentRoutes from "./routes/documentRoutes.js"
// // // // // // // // // import employeeRoutes from "./routes/employeeRoutes.js"
// // // // // // // // // import kioskRoutes from "./routes/kioskRoutes.js"
// // // // // // // // // import legalIssueRoutes from "./routes/legalIssueRoutes.js"
// // // // // // // // // import paralegalRoutes from "./routes/paralegalRoutes.js"
// // // // // // // // // import subscriptionRoutes from "./routes/subscriptionRoutes.js"
// // // // // // // // // import userRoutes from "./routes/userRoutes.js"
// // // // // // // // // import voiceQueryRoutes from "./routes/voiceQueryRoutes.js"

// // // // // // // // // const app = express()
// // // // // // // // // const PORT = process.env.PORT || 5001

// // // // // // // // // const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) || []

// // // // // // // // // if (allowedOrigins.length === 0) {
// // // // // // // // //   console.error("FATAL ERROR: CORS_ORIGIN is not defined properly.")
// // // // // // // // //   process.exit(1)
// // // // // // // // // }

// // // // // // // // // const corsOptions = {
// // // // // // // // //   origin: (origin, callback) => {
// // // // // // // // //     if (!origin || allowedOrigins.includes(origin)) {
// // // // // // // // //       callback(null, true)
// // // // // // // // //     } else {
// // // // // // // // //       callback(new Error(`Not allowed by CORS: ${origin}`))
// // // // // // // // //     }
// // // // // // // // //   },
// // // // // // // // //   credentials: true,
// // // // // // // // // }

// // // // // // // // // app.use(cors(corsOptions))
// // // // // // // // // app.set("trust proxy", 1)
// // // // // // // // // app.use(express.json({ limit: "10mb" }))
// // // // // // // // // app.use(express.urlencoded({ extended: true, limit: "10mb" }))
// // // // // // // // // app.use(cookieParser())

// // // // // // // // // // --- Main API Router ---
// // // // // // // // // const apiRouter = express.Router()

// // // // // // // // // // Health check and public routes
// // // // // // // // // apiRouter.get("/", (req, res) => res.json({ message: "API is Live" }))
// // // // // // // // // apiRouter.use("/auth", authRoutes)

// // // // // // // // // // --- THIS IS THE CRITICAL FIX ---
// // // // // // // // // // All routes below this point are protected and will require a valid JWT
// // // // // // // // // apiRouter.use(authMiddleware)

// // // // // // // // // // Protected routes are now correctly organized
// // // // // // // // // apiRouter.use("/ai", aiRoutes) // <-- The AI route is now live and protected
// // // // // // // // // apiRouter.use("/admins", adminRoutes)
// // // // // // // // // apiRouter.use("/citizens", citizenRoutes)
// // // // // // // // // apiRouter.use("/documents", documentRoutes)
// // // // // // // // // apiRouter.use("/employees", employeeRoutes)
// // // // // // // // // apiRouter.use("/kiosks", kioskRoutes)
// // // // // // // // // apiRouter.use("/issues", legalIssueRoutes)
// // // // // // // // // apiRouter.use("/paralegals", paralegalRoutes)
// // // // // // // // // apiRouter.use("/subscriptions", subscriptionRoutes)
// // // // // // // // // apiRouter.use("/users", userRoutes)
// // // // // // // // // apiRouter.use("/voicequeries", voiceQueryRoutes)

// // // // // // // // // // Mount the entire API router to the /api path
// // // // // // // // // app.use("/api", apiRouter)

// // // // // // // // // app.get("/", (req, res) => res.send("NyayaSaathi Backend is running."))
// // // // // // // // // app.use(errorMiddleware)

// // // // // // // // // connectDB()
// // // // // // // // //   .then(() => {
// // // // // // // // //     app.listen(PORT, () => console.log(`🚀 Server is running at port ${PORT}`))
// // // // // // // // //   })
// // // // // // // // //   .catch((err) => {
// // // // // // // // //     console.error("MONGO DB connection failed !!!", err)
// // // // // // // // //     process.exit(1)
// // // // // // // // //   })
// // // // // // // // import dotenv from "dotenv"
// // // // // // // // dotenv.config()

// // // // // // // // import express from "express"
// // // // // // // // import cors from "cors"
// // // // // // // // import cookieParser from "cookie-parser"
// // // // // // // // import { connectDB } from "./config/db.js"
// // // // // // // // import { errorMiddleware } from "./middleware/errorMiddleware.js"
// // // // // // // // import authMiddleware from "./middleware/authMiddleware.js"

// // // // // // // // // Import all routes
// // // // // // // // import aiRoutes from "./routes/ai.routes.js"
// // // // // // // // import authRoutes from "./routes/authRoutes.js"
// // // // // // // // import adminRoutes from "./routes/adminRoutes.js"
// // // // // // // // import citizenRoutes from "./routes/citizenRoutes.js"
// // // // // // // // import documentRoutes from "./routes/documentRoutes.js"
// // // // // // // // import employeeRoutes from "./routes/employeeRoutes.js"
// // // // // // // // import kioskRoutes from "./routes/kioskRoutes.js" // <-- Import is fine here
// // // // // // // // import legalIssueRoutes from "./routes/legalIssueRoutes.js"
// // // // // // // // import paralegalRoutes from "./routes/paralegalRoutes.js"
// // // // // // // // import subscriptionRoutes from "./routes/subscriptionRoutes.js"
// // // // // // // // import userRoutes from "./routes/userRoutes.js"
// // // // // // // // import voiceQueryRoutes from "./routes/voiceQueryRoutes.js"

// // // // // // // // const app = express()
// // // // // // // // const PORT = process.env.PORT || 5001

// // // // // // // // const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) || []

// // // // // // // // if (allowedOrigins.length === 0) {
// // // // // // // //   console.error("FATAL ERROR: CORS_ORIGIN is not defined properly.")
// // // // // // // //   process.exit(1)
// // // // // // // // }

// // // // // // // // const corsOptions = {
// // // // // // // //   origin: (origin, callback) => {
// // // // // // // //     if (!origin || allowedOrigins.includes(origin)) {
// // // // // // // //       callback(null, true)
// // // // // // // //     } else {
// // // // // // // //       callback(new Error(`Not allowed by CORS: ${origin}`))
// // // // // // // //     }
// // // // // // // //   },
// // // // // // // //   credentials: true,
// // // // // // // // }

// // // // // // // // app.use(cors(corsOptions))
// // // // // // // // app.set("trust proxy", 1)
// // // // // // // // app.use(express.json({ limit: "10mb" }))
// // // // // // // // app.use(express.urlencoded({ extended: true, limit: "10mb" }))
// // // // // // // // app.use(cookieParser())

// // // // // // // // // --- Main API Router ---
// // // // // // // // const apiRouter = express.Router()

// // // // // // // // // --- PUBLIC ROUTES ---
// // // // // // // // // Health check and authentication routes that do not require a token.
// // // // // // // // apiRouter.get("/", (req, res) => res.json({ message: "API is Live" }))
// // // // // // // // apiRouter.use("/auth", authRoutes)

// // // // // // // // // --- FIX: Kiosk list is now public for the registration page ---
// // // // // // // // // This allows unauthenticated users to see kiosks when signing up as an employee.
// // // // // // // // apiRouter.use("/kiosks", kioskRoutes)


// // // // // // // // // --- PROTECTED ROUTES ---
// // // // // // // // // All routes below this point are protected and will require a valid JWT.
// // // // // // // // apiRouter.use(authMiddleware)

// // // // // // // // // Protected routes are now correctly organized
// // // // // // // // apiRouter.use("/ai", aiRoutes) 
// // // // // // // // apiRouter.use("/admins", adminRoutes)
// // // // // // // // apiRouter.use("/citizens", citizenRoutes)
// // // // // // // // apiRouter.use("/documents", documentRoutes)
// // // // // // // // apiRouter.use("/employees", employeeRoutes)
// // // // // // // // // apiRouter.use("/kiosks", kioskRoutes) // <-- This has been moved up
// // // // // // // // apiRouter.use("/issues", legalIssueRoutes)
// // // // // // // // apiRouter.use("/paralegals", paralegalRoutes)
// // // // // // // // apiRouter.use("/subscriptions", subscriptionRoutes)
// // // // // // // // apiRouter.use("/users", userRoutes)
// // // // // // // // apiRouter.use("/voicequeries", voiceQueryRoutes)

// // // // // // // // // Mount the entire API router to the /api path
// // // // // // // // app.use("/api", apiRouter)

// // // // // // // // app.get("/", (req, res) => res.send("NyayaSaathi Backend is running."))
// // // // // // // // app.use(errorMiddleware)

// // // // // // // // connectDB()
// // // // // // // //   .then(() => {
// // // // // // // //     app.listen(PORT, () => console.log(`🚀 Server is running at port ${PORT}`))
// // // // // // // //   })
// // // // // // // //   .catch((err) => {
// // // // // // // //     console.error("MONGO DB connection failed !!!", err)
// // // // // // // //     process.exit(1)
// // // // // // // //   })
// // // // // // // import dotenv from "dotenv"
// // // // // // // dotenv.config()

// // // // // // // import express from "express"
// // // // // // // import cors from "cors"
// // // // // // // import cookieParser from "cookie-parser"
// // // // // // // import { connectDB } from "./config/db.js"
// // // // // // // import { errorMiddleware } from "./middleware/errorMiddleware.js"
// // // // // // // import authMiddleware from "./middleware/authMiddleware.js"

// // // // // // // // Import all routes
// // // // // // // import aiRoutes from "./routes/ai.routes.js"
// // // // // // // import authRoutes from "./routes/authRoutes.js"
// // // // // // // import adminRoutes from "./routes/adminRoutes.js"
// // // // // // // import citizenRoutes from "./routes/citizenRoutes.js"
// // // // // // // import documentRoutes from "./routes/documentRoutes.js"
// // // // // // // import employeeRoutes from "./routes/employeeRoutes.js"
// // // // // // // import kioskRoutes from "./routes/kioskRoutes.js"
// // // // // // // import legalIssueRoutes from "./routes/legalIssueRoutes.js"
// // // // // // // import paralegalRoutes from "./routes/paralegalRoutes.js"
// // // // // // // import subscriptionRoutes from "./routes/subscriptionRoutes.js"
// // // // // // // import userRoutes from "./routes/userRoutes.js"
// // // // // // // import voiceQueryRoutes from "./routes/voiceQueryRoutes.js"

// // // // // // // const app = express()
// // // // // // // const PORT = process.env.PORT || 5001

// // // // // // // // --- FIX: Explicitly allow the frontend development server's origin ---
// // // // // // // // This ensures that requests from http://localhost:5173 are not blocked by CORS.
// // // // // // // const allowedOrigins = [
// // // // // // //     "http://localhost:5173", 
// // // // // // //     ...(process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) || [])
// // // // // // // ]

// // // // // // // if (allowedOrigins.length === 0) {
// // // // // // //   console.error("FATAL ERROR: CORS_ORIGIN is not defined.")
// // // // // // //   process.exit(1)
// // // // // // // }

// // // // // // // const corsOptions = {
// // // // // // //   origin: (origin, callback) => {
// // // // // // //     // Allow requests with no origin (like mobile apps or curl requests)
// // // // // // //     if (!origin || allowedOrigins.includes(origin)) {
// // // // // // //       callback(null, true)
// // // // // // //     } else {
// // // // // // //       callback(new Error(`Not allowed by CORS: ${origin}`))
// // // // // // //     }
// // // // // // //   },
// // // // // // //   credentials: true,
// // // // // // // }

// // // // // // // app.use(cors(corsOptions))
// // // // // // // app.set("trust proxy", 1)
// // // // // // // app.use(express.json({ limit: "10mb" }))
// // // // // // // app.use(express.urlencoded({ extended: true, limit: "10mb" }))
// // // // // // // app.use(cookieParser())

// // // // // // // // --- Main API Router ---
// // // // // // // const apiRouter = express.Router()

// // // // // // // // --- PUBLIC ROUTES ---
// // // // // // // apiRouter.get("/", (req, res) => res.json({ message: "API is Live" }))
// // // // // // // apiRouter.use("/auth", authRoutes)
// // // // // // // // Kiosk list is public for the registration page
// // // // // // // apiRouter.use("/kiosks", kioskRoutes)

// // // // // // // // --- PROTECTED ROUTES (require valid token) ---
// // // // // // // apiRouter.use(authMiddleware)

// // // // // // // apiRouter.use("/ai", aiRoutes)
// // // // // // // apiRouter.use("/admins", adminRoutes)
// // // // // // // apiRouter.use("/citizens", citizenRoutes)
// // // // // // // apiRouter.use("/documents", documentRoutes)
// // // // // // // apiRouter.use("/employees", employeeRoutes)
// // // // // // // apiRouter.use("/issues", legalIssueRoutes)
// // // // // // // apiRouter.use("/paralegals", paralegalRoutes)
// // // // // // // apiRouter.use("/subscriptions", subscriptionRoutes)
// // // // // // // apiRouter.use("/users", userRoutes)
// // // // // // // apiRouter.use("/voicequeries", voiceQueryRoutes)

// // // // // // // // Mount the entire API router to the /api path
// // // // // // // app.use("/api", apiRouter)

// // // // // // // app.get("/", (req, res) => res.send("NyayaSaathi Backend is running."))
// // // // // // // app.use(errorMiddleware)

// // // // // // // connectDB()
// // // // // // //   .then(() => {
// // // // // // //     app.listen(PORT, () => console.log(`🚀 Server is running at port ${PORT}`))
// // // // // // //   })
// // // // // // //   .catch((err) => {
// // // // // // //     console.error("MONGO DB connection failed !!!", err)
// // // // // // //     process.exit(1)
// // // // // // //   })

// // // // // // // // ### What to Do Now

// // // // // // // // 1.  **Replace** the entire content of your existing `server.js` file with the code I've provided above.
// // // // // // // // 2.  **Restart** your backend Node.js server.
// // // // // // // // 3.  **Refresh** the registration page in your browser.

// // // // // // // // The "Loading kiosks..." message will now be replaced by the kiosk selection dropdown, as the server will trust and respond to the request from your frontend.
// // // // // // import dotenv from "dotenv";
// // // // // // dotenv.config();

// // // // // // import express from "express";
// // // // // // import cors from "cors";
// // // // // // import cookieParser from "cookie-parser";
// // // // // // import { connectDB } from "./config/db.js";
// // // // // // import { errorMiddleware } from "./middleware/errorMiddleware.js";
// // // // // // import authMiddleware from "./middleware/authMiddleware.js";

// // // // // // // Import all route handlers
// // // // // // import authRoutes from "./routes/authRoutes.js";
// // // // // // import kioskRoutes from "./routes/kioskRoutes.js";
// // // // // // import aiRoutes from "./routes/ai.routes.js";
// // // // // // import adminRoutes from "./routes/adminRoutes.js";
// // // // // // import citizenRoutes from "./routes/citizenRoutes.js";
// // // // // // import documentRoutes from "./routes/documentRoutes.js";
// // // // // // import employeeRoutes from "./routes/employeeRoutes.js";
// // // // // // import legalIssueRoutes from "./routes/legalIssueRoutes.js";
// // // // // // import paralegalRoutes from "./routes/paralegalRoutes.js";
// // // // // // import subscriptionRoutes from "./routes/subscriptionRoutes.js";
// // // // // // import userRoutes from "./routes/userRoutes.js";
// // // // // // import voiceQueryRoutes from "./routes/voiceQueryRoutes.js";

// // // // // // const app = express();
// // // // // // const PORT = process.env.PORT || 5001;

// // // // // // // --- CORS Configuration ---
// // // // // // const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) || [];
// // // // // // // Automatically add the Vite dev server URL if in development
// // // // // // if (process.env.NODE_ENV === "development" && !allowedOrigins.includes("http://localhost:5173")) {
// // // // // //     allowedOrigins.push("http://localhost:5173");
// // // // // // }

// // // // // // if (allowedOrigins.length === 0) {
// // // // // //     console.error("FATAL ERROR: CORS_ORIGIN is not defined properly.");
// // // // // //     process.exit(1);
// // // // // // }

// // // // // // const corsOptions = {
// // // // // //     origin: (origin, callback) => {
// // // // // //         if (!origin || allowedOrigins.includes(origin)) {
// // // // // //             callback(null, true);
// // // // // //         } else {
// // // // // //             callback(new Error(`Not allowed by CORS: ${origin}`));
// // // // // //         }
// // // // // //     },
// // // // // //     credentials: true,
// // // // // // };

// // // // // // app.use(cors(corsOptions));
// // // // // // app.set("trust proxy", 1);
// // // // // // app.use(express.json({ limit: "10mb" }));
// // // // // // app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// // // // // // app.use(cookieParser());

// // // // // // // --- API ROUTING ---
// // // // // // // Create two separate routers for a clear distinction between public and protected endpoints.
// // // // // // const publicApiRouter = express.Router();
// // // // // // const protectedApiRouter = express.Router();

// // // // // // // --- Define PUBLIC routes (No token required) ---
// // // // // // publicApiRouter.use("/auth", authRoutes);
// // // // // // publicApiRouter.use("/kiosks", kioskRoutes); // Kiosk GET is now fully public.

// // // // // // // --- Define PROTECTED routes (Valid JWT required) ---
// // // // // // // The authentication middleware is applied ONLY to this router.
// // // // // // protectedApiRouter.use(authMiddleware);
// // // // // // protectedApiRouter.use("/ai", aiRoutes);
// // // // // // protectedApiRouter.use("/admins", adminRoutes);
// // // // // // protectedApiRouter.use("/citizens", citizenRoutes);
// // // // // // protectedApiRouter.use("/documents", documentRoutes);
// // // // // // protectedApiRouter.use("/employees", employeeRoutes);
// // // // // // protectedApiRouter.use("/issues", legalIssueRoutes);
// // // // // // protectedApiRouter.use("/paralegals", paralegalRoutes);
// // // // // // protectedApiRouter.use("/subscriptions", subscriptionRoutes);
// // // // // // protectedApiRouter.use("/users", userRoutes);
// // // // // // protectedApiRouter.use("/voicequeries", voiceQueryRoutes);

// // // // // // // Mount both routers under the main /api path.
// // // // // // app.use("/api", publicApiRouter);
// // // // // // app.use("/api", protectedApiRouter);

// // // // // // // --- Final Application Setup ---
// // // // // // app.get("/", (req, res) => res.send("NyayaSaathi Backend is running."));
// // // // // // app.use(errorMiddleware);

// // // // // // connectDB()
// // // // // //     .then(() => {
// // // // // //         app.listen(PORT, () => console.log(`🚀 Server is running at port ${PORT}`));
// // // // // //     })
// // // // // //     .catch((err) => {
// // // // // //         console.error("MONGO DB connection failed !!!", err);
// // // // // //         process.exit(1);
// // // // // //     });
// // // // // import dotenv from "dotenv";
// // // // // dotenv.config();

// // // // // import express from "express";
// // // // // import cors from "cors";
// // // // // import cookieParser from "cookie-parser";
// // // // // import { connectDB } from "./config/db.js";
// // // // // import { errorMiddleware } from "./middleware/errorMiddleware.js";
// // // // // import authMiddleware from "./middleware/authMiddleware.js";

// // // // // // Import all route handlers
// // // // // import authRoutes from "./routes/authRoutes.js";
// // // // // import kioskRoutes from "./routes/kioskRoutes.js";
// // // // // import aiRoutes from "./routes/ai.routes.js";
// // // // // import adminRoutes from "./routes/adminRoutes.js";
// // // // // import citizenRoutes from "./routes/citizenRoutes.js";
// // // // // import documentRoutes from "./routes/documentRoutes.js";
// // // // // import employeeRoutes from "./routes/employeeRoutes.js";
// // // // // import legalIssueRoutes from "./routes/legalIssueRoutes.js";
// // // // // import paralegalRoutes from "./routes/paralegalRoutes.js";
// // // // // import subscriptionRoutes from "./routes/subscriptionRoutes.js";
// // // // // import userRoutes from "./routes/userRoutes.js";
// // // // // import voiceQueryRoutes from "./routes/voiceQueryRoutes.js";

// // // // // const app = express();
// // // // // const PORT = process.env.PORT || 5001;

// // // // // // --- CORS Configuration ---
// // // // // const allowedOrigins = [
// // // // //     "http://localhost:5173", // Vite/React dev server
// // // // //     ...(process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) || [])
// // // // // ];

// // // // // const corsOptions = {
// // // // //     origin: (origin, callback) => {
// // // // //         if (!origin || allowedOrigins.includes(origin)) {
// // // // //             callback(null, true);
// // // // //         } else {
// // // // //             callback(new Error(`Not allowed by CORS: ${origin}`));
// // // // //         }
// // // // //     },
// // // // //     credentials: true,
// // // // // };

// // // // // app.use(cors(corsOptions));
// // // // // app.set("trust proxy", 1);
// // // // // app.use(express.json({ limit: "10mb" }));
// // // // // app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// // // // // app.use(cookieParser());

// // // // // // --- THE DEFINITIVE ROUTING FIX ---
// // // // // // We use a single router and a clear, sequential flow.
// // // // // const apiRouter = express.Router();

// // // // // // 1. Define all PUBLIC routes first. These can be accessed without a token.
// // // // // apiRouter.use("/auth", authRoutes);
// // // // // apiRouter.use("/kiosks", kioskRoutes); // The GET /kiosks route is now fully public and accessible.

// // // // // // 2. Insert the authentication middleware. 
// // // // // // This acts as a gate. Any route defined BELOW this line is now protected.
// // // // // apiRouter.use(authMiddleware);

// // // // // // 3. Define all PROTECTED routes. These now require a valid JWT.
// // // // // apiRouter.use("/ai", aiRoutes);
// // // // // apiRouter.use("/admins", adminRoutes);
// // // // // apiRouter.use("/citizens", citizenRoutes);
// // // // // apiRouter.use("/documents", documentRoutes);
// // // // // apiRouter.use("/employees", employeeRoutes);
// // // // // apiRouter.use("/issues", legalIssueRoutes);
// // // // // apiRouter.use("/paralegals", paralegalRoutes);
// // // // // apiRouter.use("/subscriptions", subscriptionRoutes);
// // // // // apiRouter.use("/users", userRoutes);
// // // // // apiRouter.use("/voicequeries", voiceQueryRoutes);

// // // // // // Mount the master API router under the /api path.
// // // // // app.use("/api", apiRouter);

// // // // // // --- Final Application Setup ---
// // // // // app.get("/", (req, res) => res.send("NyayaSaathi Backend is running."));
// // // // // app.use(errorMiddleware);

// // // // // connectDB()
// // // // //     .then(() => {
// // // // //         app.listen(PORT, () => console.log(`🚀 Server is running at port ${PORT}`));
// // // // //     })
// // // // //     .catch((err) => {
// // // // //         console.error("MONGO DB connection failed !!!", err);
// // // // //         process.exit(1);
// // // // //     });

// // // // import dotenv from "dotenv";
// // // // dotenv.config();

// // // // import express from "express";
// // // // import cors from "cors";
// // // // import cookieParser from "cookie-parser";
// // // // import { connectDB } from "./config/db.js";
// // // // import { errorMiddleware } from "./middleware/errorMiddleware.js";
// // // // import authMiddleware from "./middleware/authMiddleware.js";

// // // // // Import all route handlers
// // // // import authRoutes from "./routes/authRoutes.js";
// // // // import kioskRoutes from "./routes/kioskRoutes.js";
// // // // import aiRoutes from "./routes/ai.routes.js";
// // // // import adminRoutes from "./routes/adminRoutes.js";
// // // // import citizenRoutes from "./routes/citizenRoutes.js";
// // // // import documentRoutes from "./routes/documentRoutes.js";
// // // // import employeeRoutes from "./routes/employeeRoutes.js";
// // // // import legalIssueRoutes from "./routes/legalIssueRoutes.js";
// // // // import paralegalRoutes from "./routes/paralegalRoutes.js";
// // // // import subscriptionRoutes from "./routes/subscriptionRoutes.js";
// // // // import userRoutes from "./routes/userRoutes.js";
// // // // import voiceQueryRoutes from "./routes/voiceQueryRoutes.js";

// // // // const app = express();
// // // // const PORT = process.env.PORT || 5001;

// // // // // --- CORS Configuration ---
// // // // const allowedOrigins = [
// // // //     "http://localhost:5173", // Vite/React dev server
// // // //     "http://localhost:3000", // Create React App dev server
// // // //     ...(process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) || [])
// // // // ];

// // // // // Remove any empty strings from allowed origins
// // // // const validOrigins = allowedOrigins.filter(origin => origin && origin.trim() !== "");

// // // // if (validOrigins.length === 0) {
// // // //     console.warn("WARNING: No CORS origins configured. This may cause frontend connection issues.");
// // // // }

// // // // const corsOptions = {
// // // //     origin: (origin, callback) => {
// // // //         // Allow requests with no origin (like mobile apps, Postman, curl)
// // // //         if (!origin || validOrigins.includes(origin)) {
// // // //             callback(null, true);
// // // //         } else {
// // // //             console.warn(`CORS blocked request from origin: ${origin}`);
// // // //             callback(new Error(`Not allowed by CORS: ${origin}`));
// // // //         }
// // // //     },
// // // //     credentials: true,
// // // //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
// // // //     allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
// // // // };

// // // // // --- Express Middleware Setup ---
// // // // app.use(cors(corsOptions));
// // // // app.set("trust proxy", 1);
// // // // app.use(express.json({ limit: "10mb" }));
// // // // app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// // // // app.use(cookieParser());

// // // // // --- Request Logging Middleware (Development) ---
// // // // if (process.env.NODE_ENV === "development") {
// // // //     app.use((req, res, next) => {
// // // //         console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
// // // //         next();
// // // //     });
// // // // }

// // // // // --- API Routing ---
// // // // const apiRouter = express.Router();

// // // // // Health check endpoint
// // // // apiRouter.get("/", (req, res) => {
// // // //     res.json({ 
// // // //         message: "NyayaSaathi API is Live",
// // // //         timestamp: new Date().toISOString(),
// // // //         version: "1.0.0"
// // // //     });
// // // // });

// // // // // --- PUBLIC ROUTES (No authentication required) ---
// // // // apiRouter.use("/auth", authRoutes);
// // // // apiRouter.use("/kiosks", kioskRoutes); // Public access for registration page

// // // // // --- AUTHENTICATION MIDDLEWARE ---
// // // // // All routes defined below this point require a valid JWT token
// // // // apiRouter.use(authMiddleware);

// // // // // --- PROTECTED ROUTES (Authentication required) ---
// // // // apiRouter.use("/ai", aiRoutes);
// // // // apiRouter.use("/admins", adminRoutes);
// // // // apiRouter.use("/citizens", citizenRoutes);
// // // // apiRouter.use("/documents", documentRoutes);
// // // // apiRouter.use("/employees", employeeRoutes);
// // // // apiRouter.use("/issues", legalIssueRoutes);
// // // // apiRouter.use("/paralegals", paralegalRoutes);
// // // // apiRouter.use("/subscriptions", subscriptionRoutes);
// // // // apiRouter.use("/users", userRoutes);
// // // // apiRouter.use("/voicequeries", voiceQueryRoutes);

// // // // // Mount the API router
// // // // app.use("/api", apiRouter);

// // // // // --- Root endpoint ---
// // // // app.get("/", (req, res) => {
// // // //     res.send(`
// // // //         <h1>NyayaSaathi Backend Server</h1>
// // // //         <p>Server is running on port ${PORT}</p>
// // // //         <p>API endpoints available at <a href="/api">/api</a></p>
// // // //         <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
// // // //     `);
// // // // });

// // // // // --- 404 Handler ---
// // // // app.use("*", (req, res) => {
// // // //     res.status(404).json({
// // // //         message: "Route not found",
// // // //         path: req.originalUrl,
// // // //         method: req.method
// // // //     });
// // // // });

// // // // // --- Error Handling Middleware ---
// // // // app.use(errorMiddleware);

// // // // // --- Server Startup ---
// // // // const startServer = async () => {
// // // //     try {
// // // //         await connectDB();
// // // //         console.log("✅ MongoDB connected successfully");
        
// // // //         app.listen(PORT, () => {
// // // //             console.log(`🚀 NyayaSaathi Server is running on port ${PORT}`);
// // // //             console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
// // // //             console.log(`🌐 CORS enabled for origins: ${validOrigins.join(', ')}`);
// // // //             console.log(`🔗 API available at: http://localhost:${PORT}/api`);
// // // //         });
// // // //     } catch (error) {
// // // //         console.error("❌ Failed to start server:", error);
// // // //         process.exit(1);
// // // //     }
// // // // };

// // // // // Graceful shutdown handling
// // // // process.on('SIGTERM', () => {
// // // //     console.log('SIGTERM received. Shutting down gracefully...');
// // // //     process.exit(0);
// // // // });

// // // // process.on('SIGINT', () => {
// // // //     console.log('SIGINT received. Shutting down gracefully...');
// // // //     process.exit(0);
// // // // });

// // // // startServer();
// // // // ./server.js

// // // // --- 1. Environment Variable Configuration ---
// // // // Load environment variables from a .env file into process.env
// // // // Must be at the very top.
// // // import dotenv from "dotenv";
// // // dotenv.config({
// // //   path: './.env' // Explicitly specify the path to your .env file
// // // });


// // // // --- 2. Module Imports ---
// // // import express from "express";
// // // import cors from "cors";
// // // import cookieParser from "cookie-parser";
// // // import { connectDB } from "./config/db.js"; // Your database connection logic
// // // import { errorMiddleware } from "./middleware/errorMiddleware.js"; // Your custom error handler
// // // import authMiddleware from "./middleware/authMiddleware.js"; // Your authentication middleware


// // // // --- 3. Route Handler Imports ---
// // // // Import all the different route modules for your application's features.
// // // import authRoutes from "./routes/authRoutes.js";
// // // import kioskRoutes from "./routes/kioskRoutes.js";
// // // import aiRoutes from "./routes/ai.routes.js";
// // // import adminRoutes from "./routes/adminRoutes.js";
// // // import citizenRoutes from "./routes/citizenRoutes.js";
// // // import documentRoutes from "./routes/documentRoutes.js";
// // // import employeeRoutes from "./routes/employeeRoutes.js";
// // // import legalIssueRoutes from "./routes/legalIssueRoutes.js";
// // // import paralegalRoutes from "./routes/paralegalRoutes.js";
// // // import subscriptionRoutes from "./routes/subscriptionRoutes.js";
// // // import userRoutes from "./routes/userRoutes.js";
// // // import voiceQueryRoutes from "./routes/voiceQueryRoutes.js";


// // // // --- 4. Express App Initialization ---
// // // const app = express();
// // // const PORT = process.env.PORT || 8000; // Use port from .env or default to 8000


// // // // --- 5. CORS Configuration ---
// // // // Configure Cross-Origin Resource Sharing to allow your frontend to communicate with this backend.
// // // const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

// // // if (process.env.NODE_ENV === "development") {
// // //     // Add common development URLs in dev mode for convenience
// // //     allowedOrigins.push("http://localhost:5173", "http://localhost:3000");
// // // }

// // // const corsOptions = {
// // //     origin: (origin, callback) => {
// // //         // Allow requests with no origin (like Postman, mobile apps, or server-to-server)
// // //         // or from an origin in our allowed list.
// // //         if (!origin || allowedOrigins.includes(origin)) {
// // //             callback(null, true);
// // //         } else {
// // //             callback(new Error(`Not allowed by CORS: ${origin}`));
// // //         }
// // //     },
// // //     credentials: true, // Important for handling cookies with authentication
// // // };

// // // app.use(cors(corsOptions));


// // // // --- 6. Core Express Middleware ---
// // // // Set up essential middleware for parsing data, handling cookies, and security.
// // // app.set("trust proxy", 1); // Trust the first proxy, necessary for deployment
// // // app.use(express.json({ limit: "16kb" })); // Parse JSON bodies, with a reasonable size limit
// // // app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded bodies
// // // app.use(cookieParser()); // Parse cookies to read auth tokens


// // // // --- 7. API Routing ---
// // // // This is the heart of your server's routing logic.
// // // const apiRouter = express.Router();

// // // // --- PUBLIC ROUTES (No authentication required) ---
// // // // These routes are placed BEFORE the authentication middleware.
// // // apiRouter.use("/auth", authRoutes);
// // // apiRouter.use("/kiosks", kioskRoutes); // Kiosks list needs to be public for user registration

// // // // --- AUTHENTICATION GATE ---
// // // // Any route defined BELOW this line is now protected and will require a valid JWT token.
// // // apiRouter.use(authMiddleware);

// // // // --- PROTECTED ROUTES (Authentication required) ---
// // // apiRouter.use("/ai", aiRoutes);
// // // apiRouter.use("/admins", adminRoutes);
// // // apiRouter.use("/citizens", citizenRoutes);
// // // apiRouter.use("/documents", documentRoutes);
// // // apiRouter.use("/employees", employeeRoutes);
// // // apiRouter.use("/issues", legalIssueRoutes);
// // // apiRouter.use("/paralegals", paralegalRoutes);
// // // apiRouter.use("/subscriptions", subscriptionRoutes);
// // // apiRouter.use("/users", userRoutes);
// // // apiRouter.use("/voicequeries", voiceQueryRoutes);

// // // // Mount the master API router under the "/api" path.
// // // app.use("/api", apiRouter);


// // // // --- 8. Health Check and Root Endpoint ---
// // // // A simple endpoint to quickly check if the server is alive.
// // // app.get("/", (req, res) => {
// // //     res.send(`<h1>NyayaSaathi Backend is Running</h1><p>API is available at /api</p>`);
// // // });


// // // // --- 9. Global Error Handling ---
// // // // This middleware must be the LAST one added with `app.use()`.
// // // // It will catch any errors passed by `next(error)` from any route handler.
// // // app.use(errorMiddleware);


// // // // --- 10. Server Startup ---
// // // // Connect to the database and then start the Express server.
// // // const startServer = async () => {
// // //     try {
// // //         await connectDB();
        
// // //         app.listen(PORT, () => {
// // //             console.log(`✅ NyayaSaathi Server is running successfully on port ${PORT}`);
// // //             console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
// // //         });
// // //     } catch (error) {
// // //         console.error("❌ MONGO DB connection failed !!!", error);
// // //         process.exit(1); // Exit the process with a failure code
// // //     }
// // // };

// // // startServer();
// // // ./server.js

// // // --- 1. Environment Variable Configuration ---
// // // --- 1. Environment Variable Configuration ---
// // // --- 1. Environment Variable Configuration ---
// // import dotenv from "dotenv";
// // dotenv.config({
// //   path: '../.env'  // Go up one level to find .env in Backend folder
// // });

// // // --- 2. Setup Required Directories ---
// // import { setupDirectories } from "./utils/setupDirectories.js";
// // setupDirectories();

// // // --- 3. Module Imports ---
// // import express from "express";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";
// // import { connectDB } from "./config/db.js";           // Remove src/
// // import { errorMiddleware } from "./middleware/errorMiddleware.js";  // Remove src/
// // import authMiddleware from "./middleware/authMiddleware.js";        // Remove src/

// // // --- 4. Route Handler Imports ---
// // import authRoutes from "./routes/authRoutes.js";                   // Remove src/
// // import kioskRoutes from "./routes/kioskRoutes.js";                 // Remove src/
// // import aiRoutes from "./routes/ai.routes.js";                      // Remove src/
// // import adminRoutes from "./routes/adminRoutes.js";                 // Remove src/
// // import citizenRoutes from "./routes/citizenRoutes.js";             // Remove src/
// // import documentRoutes from "./routes/documentRoutes.js";           // Remove src/
// // import employeeRoutes from "./routes/employeeRoutes.js";           // Remove src/
// // import legalIssueRoutes from "./routes/legalIssueRoutes.js";       // Remove src/
// // import paralegalRoutes from "./routes/paralegalRoutes.js";         // Remove src/
// // import subscriptionRoutes from "./routes/subscriptionRoutes.js";   // Remove src/
// // import userRoutes from "./routes/userRoutes.js";                   // Remove src/
// // import voiceQueryRoutes from "./routes/voiceQueryRoutes.js";       // Remove src/
// // // --- 5. Express App Initialization ---
// // const app = express();
// // const PORT = process.env.PORT || 5001;

// // // --- 6. CORS Configuration ---
// // const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

// // if (process.env.NODE_ENV === "development") {
// //     allowedOrigins.push("http://localhost:5173", "http://localhost:3000");
// // }

// // const corsOptions = {
// //     origin: (origin, callback) => {
// //         if (!origin || allowedOrigins.includes(origin)) {
// //             callback(null, true);
// //         } else {
// //             console.warn(`❌ CORS blocked request from origin: ${origin}`);
// //             callback(new Error(`Not allowed by CORS: ${origin}`));
// //         }
// //     },
// //     credentials: true,
// //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
// //     allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
// // };

// // app.use(cors(corsOptions));

// // // --- 7. Core Express Middleware ---
// // app.set("trust proxy", 1);
// // app.use(express.json({ limit: "16mb" }));
// // app.use(express.urlencoded({ extended: true, limit: "16mb" }));
// // app.use(cookieParser());

// // // --- 8. Request Logging Middleware (Development) ---
// // if (process.env.NODE_ENV === "development") {
// //     app.use((req, res, next) => {
// //         console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
// //         next();
// //     });
// // }

// // // --- 9. API Routing ---
// // const apiRouter = express.Router();

// // // Health check endpoint
// // apiRouter.get("/", (req, res) => {
// //     res.json({ 
// //         message: "NyayaSaathi API is Live",
// //         timestamp: new Date().toISOString(),
// //         version: "1.0.0",
// //         environment: process.env.NODE_ENV || 'development'
// //     });
// // });

// // // --- PUBLIC ROUTES (No authentication required) ---
// // apiRouter.use("/auth", authRoutes);
// // apiRouter.use("/kiosks", kioskRoutes);

// // // --- AUTHENTICATION GATE ---
// // apiRouter.use(authMiddleware);

// // // --- PROTECTED ROUTES (Authentication required) ---
// // apiRouter.use("/ai", aiRoutes);
// // apiRouter.use("/admins", adminRoutes);
// // apiRouter.use("/citizens", citizenRoutes);
// // apiRouter.use("/documents", documentRoutes);
// // apiRouter.use("/employees", employeeRoutes);
// // apiRouter.use("/issues", legalIssueRoutes);
// // apiRouter.use("/paralegals", paralegalRoutes);
// // apiRouter.use("/subscriptions", subscriptionRoutes);
// // apiRouter.use("/users", userRoutes);
// // apiRouter.use("/voicequeries", voiceQueryRoutes);

// // // Mount the API router
// // app.use("/api", apiRouter);

// // // --- 10. Root Endpoint ---
// // app.get("/", (req, res) => {
// //     res.send(`
// //         <h1>NyayaSaathi Backend Server</h1>
// //         <p>🚀 Server is running on port ${PORT}</p>
// //         <p>📊 API is available at <a href="/api">/api</a></p>
// //         <p>🌍 Environment: ${process.env.NODE_ENV || 'development'}</p>
// //         <p>⏰ Started at: ${new Date().toISOString()}</p>
// //     `);
// // });

// // // --- 11. 404 Handler ---
// // app.use("*", (req, res) => {
// //     res.status(404).json({
// //         success: false,
// //         message: "Route not found",
// //         path: req.originalUrl,
// //         method: req.method
// //     });
// // });

// // // --- 12. Global Error Handling ---
// // app.use(errorMiddleware);

// // // --- 13. Server Startup ---
// // const startServer = async () => {
// //     try {
// //         console.log('🔌 Connecting to MongoDB...');
// //         await connectDB();
// //         console.log("✅ MongoDB connected successfully");
        
// //         app.listen(PORT, () => {
// //             console.log(`\n🎉 NyayaSaathi Server Started Successfully!`);
// //             console.log(`📍 Port: ${PORT}`);
// //             console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
// //             console.log(`🔗 API: http://localhost:${PORT}/api`);
// //             console.log(`🌐 CORS Origins: ${allowedOrigins.join(', ')}`);
// //             console.log('─'.repeat(50));
// //         });
// //     } catch (error) {
// //         console.error("❌ Failed to start server:", error);
// //         process.exit(1);
// //     }
// // };

// // // --- 14. Graceful Shutdown Handling ---
// // process.on('SIGTERM', () => {
// //     console.log('\n🛑 SIGTERM received. Shutting down gracefully...');
// //     process.exit(0);
// // });

// // process.on('SIGINT', () => {
// //     console.log('\n🛑 SIGINT received. Shutting down gracefully...');
// //     process.exit(0);
// // });

// // process.on('unhandledRejection', (err) => {
// //     console.error('❌ Unhandled Promise Rejection:', err);
// //     process.exit(1);
// // });

// // process.on('uncaughtException', (err) => {
// //     console.error('❌ Uncaught Exception:', err);
// //     process.exit(1);
// // });

// // startServer();
// // Complete Fixed Server.js
// // File: Backend/src/server.js

// // --- 1. Environment Variable Configuration ---
// import dotenv from "dotenv";
// dotenv.config({
//   path: '../.env'
// });

// // --- 2. Setup Required Directories ---
// // import { setupDirectories } from "./utils/setupDirectories.js";
// // setupDirectories();

// import { setupDirectories, checkDirectoriesHealth, cleanupOldTempFiles } from './utils/setupDirectories.js';

// setupDirectories();
// checkDirectoriesHealth();
// cleanupOldTempFiles(24); // Optional: clean temp files older than 24 hours


// // --- 3. Module Imports ---
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { connectDB } from "./config/db.js";
// import { errorMiddleware } from "./middleware/errorMiddleware.js";
// import authMiddleware from "./middleware/authMiddleware.js";

// // --- 4. Route Handler Imports ---
// // import authRoutes from "./routes/authRoutes.js";
// // import kioskRoutes from "./routes/kioskRoutes.js";
// // import aiRoutes from "./routes/ai.routes.js";
// // import adminRoutes from "./routes/adminRoutes.js";
// // import citizenRoutes from "./routes/citizenRoutes.js";
// // import documentRoutes from "./routes/documentRoutes.js";
// // import employeeRoutes from "./routes/employeeRoutes.js";
// // import legalIssueRoutes from "./routes/legalIssueRoutes.js";
// // import paralegalRoutes from "./routes/paralegalRoutes.js";
// // import subscriptionRoutes from "./routes/subscriptionRoutes.js";
// // import userRoutes from "./routes/userRoutes.js";
// // import voiceQueryRoutes from "./routes/voiceQueryRoutes.js";

// // --- 5. Express App Initialization ---
// const app = express();
// const PORT = process.env.PORT || 5001;

// // --- 6. CORS Configuration ---
// const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

// if (process.env.NODE_ENV === "development") {
//     allowedOrigins.push("http://localhost:5173", "http://localhost:3000");
// }

// // Remove any empty strings from allowed origins
// const validOrigins = allowedOrigins.filter(origin => origin && origin.trim() !== "");

// const corsOptions = {
//     origin: (origin, callback) => {
//         // Allow requests with no origin (like mobile apps, Postman, curl)
//         if (!origin || validOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             console.warn(`❌ CORS blocked request from origin: ${origin}`);
//             callback(new Error(`Not allowed by CORS: ${origin}`));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
// };

// app.use(cors(corsOptions));

// // --- 7. Core Express Middleware ---
// app.set("trust proxy", 1);
// app.use(express.json({ limit: "16mb" }));
// app.use(express.urlencoded({ extended: true, limit: "16mb" }));
// app.use(cookieParser());

// // --- 8. Request Logging Middleware (Development) ---
// if (process.env.NODE_ENV === "development") {
//     app.use((req, res, next) => {
//         console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//         next();
//     });
// }

// // --- 9. API Routing ---
// const apiRouter = express.Router();

// // Health check endpoint
// apiRouter.get("/", (req, res) => {
//     res.json({ 
//         message: "NyayaSaathi API is Live",
//         timestamp: new Date().toISOString(),
//         version: "1.0.0",
//         environment: process.env.NODE_ENV || 'development'
//     });
// });

// // --- PUBLIC ROUTES (No authentication required) ---
// console.log("🔧 Setting up public routes...");
// apiRouter.use("/auth", authRoutes);
// apiRouter.use("/kiosks", kioskRoutes);

// // --- AUTHENTICATION GATE ---
// console.log("🔒 Setting up authentication middleware...");
// apiRouter.use(authMiddleware);

// // --- PROTECTED ROUTES (Authentication required) ---
// console.log("🛡️ Setting up protected routes...");
// apiRouter.use("/ai", aiRoutes);
// apiRouter.use("/admins", adminRoutes);
// apiRouter.use("/citizens", citizenRoutes);
// apiRouter.use("/documents", documentRoutes);
// apiRouter.use("/employees", employeeRoutes);
// apiRouter.use("/issues", legalIssueRoutes);
// apiRouter.use("/paralegals", paralegalRoutes);
// apiRouter.use("/subscriptions", subscriptionRoutes);
// apiRouter.use("/users", userRoutes);
// apiRouter.use("/voicequeries", voiceQueryRoutes);

// // Mount the API router
// app.use("/api", apiRouter);

// // --- 10. Root Endpoint ---
// app.get("/", (req, res) => {
//     res.send(`
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <title>NyayaSaathi Backend</title>
//             <style>
//                 body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
//                 .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
//                 h1 { color: #2c3e50; }
//                 .status { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 10px 0; }
//                 .info { background: #e3f2fd; padding: 10px; border-radius: 5px; margin: 5px 0; }
//                 a { color: #3498db; text-decoration: none; }
//                 a:hover { text-decoration: underline; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <h1>🚀 NyayaSaathi Backend Server</h1>
//                 <div class="status">
//                     <strong>✅ Server Status:</strong> Running on port ${PORT}
//                 </div>
//                 <div class="info">
//                     <strong>📊 API Endpoint:</strong> <a href="/api">/api</a>
//                 </div>
//                 <div class="info">
//                     <strong>🌍 Environment:</strong> ${process.env.NODE_ENV || 'development'}
//                 </div>
//                 <div class="info">
//                     <strong>⏰ Started:</strong> ${new Date().toISOString()}
//                 </div>
//                 <div class="info">
//                     <strong>🔗 CORS Origins:</strong> ${validOrigins.join(', ') || 'None configured'}
//                 </div>
//                 <h2>Available Endpoints:</h2>
//                 <ul>
//                     <li><strong>Public:</strong> /api/auth, /api/kiosks</li>
//                     <li><strong>Protected:</strong> /api/ai, /api/documents, /api/issues, etc.</li>
//                 </ul>
//             </div>
//         </body>
//         </html>
//     `);
// });

// // --- 11. 404 Handler ---
// app.use("*", (req, res) => {
//     res.status(404).json({
//         success: false,
//         message: "Route not found",
//         path: req.originalUrl,
//         method: req.method,
//         timestamp: new Date().toISOString()
//     });
// });

// // --- 12. Global Error Handling ---
// app.use((err, req, res, next) => {
//     console.error("❌ Global Error Handler:", err);
    
//     // Handle specific error types
//     if (err.name === 'ValidationError') {
//         return res.status(400).json({
//             success: false,
//             message: "Validation Error",
//             errors: Object.values(err.errors).map(e => e.message)
//         });
//     }
    
//     if (err.name === 'CastError') {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid ID format"
//         });
//     }
    
//     if (err.code === 11000) {
//         return res.status(400).json({
//             success: false,
//             message: "Duplicate field value entered"
//         });
//     }
    
//     // Default error
//     res.status(err.statusCode || 500).json({
//         success: false,
//         message: err.message || "Internal Server Error",
//         ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//     });
// });

// // --- 13. Server Startup ---
// const startServer = async () => {
//     try {
//         console.log('🔧 Initializing NyayaSaathi Backend...');
//         console.log('🔌 Connecting to MongoDB...');
//         await connectDB();
//         console.log("✅ MongoDB connected successfully");
        
//         app.listen(PORT, () => {
//             console.log('\n' + '='.repeat(60));
//             console.log('🎉 NYAYASAATHI SERVER STARTED SUCCESSFULLY!');
//             console.log('='.repeat(60));
//             console.log(`📍 Port: ${PORT}`);
//             console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
//             console.log(`🔗 Local URL: http://localhost:${PORT}`);
//             console.log(`📊 API URL: http://localhost:${PORT}/api`);
//             console.log(`🌐 CORS Origins: ${validOrigins.join(', ') || 'Development defaults'}`);
//             console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
//             console.log('='.repeat(60));
//             console.log('🔍 Available endpoints:');
//             console.log('  Public:    /api/auth, /api/kiosks');
//             console.log('  Protected: /api/ai, /api/documents, /api/issues, etc.');
//             console.log('='.repeat(60));
//         });
//     } catch (error) {
//         console.error('\n' + '❌'.repeat(20));
//         console.error('❌ FAILED TO START SERVER');
//         console.error('❌'.repeat(20));
//         console.error('Error:', error.message);
//         console.error('Stack:', error.stack);
//         console.error('❌'.repeat(20));
//         process.exit(1);
//     }
// };

// // --- 14. Graceful Shutdown Handling ---
// process.on('SIGTERM', () => {
//     console.log('\n🛑 SIGTERM received. Shutting down gracefully...');
//     process.exit(0);
// });

// process.on('SIGINT', () => {
//     console.log('\n🛑 SIGINT received. Shutting down gracefully...');
//     process.exit(0);
// });

// process.on('unhandledRejection', (err) => {
//     console.error('\n❌ Unhandled Promise Rejection:', err);
//     console.error('Shutting down server...');
//     process.exit(1);
// });

// process.on('uncaughtException', (err) => {
//     console.error('\n❌ Uncaught Exception:', err);
//     console.error('Shutting down server...');
//     process.exit(1);
// });

// // Start the server
// startServer();
// File: Backend/src/server.js

// --- 1. Environment and Directory Setup ---
import dotenv from "dotenv";
dotenv.config();

// import { setupDirectories } from "./utils/setupDirectories.js";
// setupDirectories();


// --- 2. Core Module Imports ---
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import authMiddleware from "./middleware/authMiddleware.js";


// --- 3. ALL Route Handler Imports ---
// We import everything here so there are no ReferenceErrors.
import authRoutes from "./routes/authRoutes.js";
import kioskRoutes from "./routes/kioskRoutes.js";
import aiRoutes from "./routes/ai.routes.js";
import adminRoutes from "./routes/adminRoutes.js";
import citizenRoutes from "./routes/citizenRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import legalIssueRoutes from "./routes/legalIssueRoutes.js";
import paralegalRoutes from "./routes/paralegalRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import voiceQueryRoutes from "./routes/voiceQueryRoutes.js";


// --- 4. Express App Initialization & Middleware ---
const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ["http://localhost:5173"];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS: ${origin}`));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(cookieParser());


// --- 5. API Routing ---
const apiRouter = express.Router();

// --- PUBLIC ROUTES (No token required) ---
apiRouter.use("/auth", authRoutes);
apiRouter.use("/kiosks", kioskRoutes);

// --- AUTHENTICATION GATE ---
apiRouter.use(authMiddleware);

// --- PROTECTED ROUTES (Ready for the Bug Hunt) ---
// The TypeError is in one of these files. We will test them one-by-one.
apiRouter.use("/ai", aiRoutes);
apiRouter.use("/admins", adminRoutes);
apiRouter.use("/citizens", citizenRoutes);
apiRouter.use("/documents", documentRoutes);
apiRouter.use("/employees", employeeRoutes);
apiRouter.use("/issues", legalIssueRoutes);
apiRouter.use("/paralegals", paralegalRoutes);
apiRouter.use("/subscriptions", subscriptionRoutes);
apiRouter.use("/users", userRoutes);
apiRouter.use("/voicequeries", voiceQueryRoutes);

// Mount the master API router
app.use("/api", apiRouter);


// --- 6. Final Middleware and Server Startup ---
app.use(errorMiddleware);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`\n🎉 NyayaSaathi Server Started Successfully on Port ${PORT}`);
            console.log(`🔗 Local URL: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ FAILED TO START SERVER:", error);
        process.exit(1);
    }
};

startServer();