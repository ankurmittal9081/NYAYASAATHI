import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { registerUser } from '../controllers/auth.controllers.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import User from '../models/User.js';
import verifyJWT from '../middleware/authMiddleware.js';

// Utils for token generation
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while generating tokens");
    }
};

// Cookie Options
const COOKIE_OPTS = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
};

const router = Router();

// =========================================================
//                     PUBLIC ROUTES
// =========================================================

// --- Register (Controller-based) ---
router.post('/register', registerUser);

// --- Login ---
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
        return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, COOKIE_OPTS)
        .cookie("refreshToken", refreshToken, COOKIE_OPTS)
        .json(new ApiResponse(200, { user: loggedInUser }, "Login successful"));
}));

// --- Refresh Token ---
router.post('/refresh-token', asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;
    if (!incomingRefreshToken) {
        return res.status(401).json({ success: false, message: "Unauthorized: No refresh token provided" });
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);
    if (!user || incomingRefreshToken !== user?.refreshToken) {
        return res.status(401).json({ success: false, message: "Refresh token is invalid or has been used" });
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, COOKIE_OPTS)
        .cookie("refreshToken", newRefreshToken, COOKIE_OPTS)
        .json(new ApiResponse(200, {}, "Access token refreshed successfully"));
}));

// =========================================================
//                  PROTECTED ROUTES (JWT REQUIRED)
// =========================================================
router.use(verifyJWT);

// --- Logout ---
router.post('/logout', asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } }, { new: true });

    return res
        .status(200)
        .clearCookie("accessToken", COOKIE_OPTS)
        .clearCookie("refreshToken", COOKIE_OPTS)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
}));

// --- Get Current User ---
router.get('/current-user', asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "Current user fetched successfully"));
}));

export default router;
