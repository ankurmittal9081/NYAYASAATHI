// src/routes/ai.routes.js

import { Router } from "express";
import { getAIChatResponseController } from "../controllers/ai.controller.js";
// Optional: import a middleware to protect this route if needed
// import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// This defines the endpoint: POST /api/v1/ai/chat
router.route("/chat").post(getAIChatResponseController);
// To protect the route so only logged-in users can use it, you would add verifyJWT:
// router.route("/chat").post(verifyJWT, getAIChatResponseController);

export default router;