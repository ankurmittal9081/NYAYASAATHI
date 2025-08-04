// // Example for: src/controllers/auth.controller.js

// import  User  from "../models/User.js";
// import  Employee  from "../models/Employee.js";
// import Paralegal  from "../models/Paralegal.js";
// import  Admin  from "../models/Admin.js"; // Assuming you have an Admin model
// import {ApiResponse}  from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";

// const registerUser = asyncHandler(async (req, res) => {
//     const { 
//         fullName, email, password, aadhaarNumber, role,
//         // Optional fields based on role
//         phoneNumber, department, designation, roleLevel, kioskId, 
//         areasOfExpertise, assignedDistricts, status, adminRole 
//     } = req.body;

//     // 1. Basic Validation (add more as needed)
//     if ([fullName, email, password, aadhaarNumber, role].some((field) => !field || field.trim() === "")) {
//         throw new ApiError(400, "All required fields must be filled.");
//     }

//     // 2. Check if user already exists
//     const existedUser = await User.findOne({ $or: [{ email }, { aadhaarNumber }] });
//     if (existedUser) {
// // This is the correct line
//         throw new ApiError(409, "User with this email or Aadhaar number already exists.");    }

//     // 3. Create the base User
//     const user = await User.create({
//         fullName,
//         email,
//         password,
//         aadhaarNumber,
//         role,
//         phoneNumber // Store phone number at the User level if common
//     });

//     // 4. Create role-specific documents if applicable
//     try {
//         if (role === 'employee') {
//             if (!kioskId || !department || !designation) {
//                 throw new ApiError(400, "Kiosk ID, department, and designation are required for employees.");
//             }
//             await Employee.create({
//                 user: user._id,
//                 kioskId,
//                 department,
//                 designation,
//                 roleLevel
//             });
//         } else if (role === 'paralegal') {
//             if (!phoneNumber || !areasOfExpertise) {
//                 throw new ApiError(400, "Phone number and areas of expertise are required for paralegals.");
//             }
//             await Paralegal.create({
//                 user: user._id,
//                 phoneNumber,
//                 areasOfExpertise
//             });
//         } else if (role === 'admin') {
//             // Add extra security here to prevent unauthorized admin creation
//             await Admin.create({
//                 user: user._id,
//                 adminRole,
//                 status,
//                 assignedDistricts
//             });
//         }
//     } catch (error) {
//         // If role-specific creation fails, delete the created user to avoid orphaned users
//         await User.findByIdAndDelete(user._id);
//         throw new ApiError(500, `Failed to create role-specific profile: ${error.message}`);
//     }


//     // 5. Respond with success
//     // Omit password and refresh token from the final response
//     const createdUser = await User.findById(user._id).select("-password -refreshToken");

//     return res.status(201).json(
//         new ApiResponse(201, { user: createdUser }, "User registered successfully.")
//     );
// });
// export { registerUser };
// // Make sure this controller is used in your authRoutes.js
// File: Backend/src/controllers/auth.controllers.js

import jwt from 'jsonwebtoken';
import User from "../models/User.js";
// import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// --- Helper Function for Token Generation ---
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found while generating tokens");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        // This will be caught by asyncHandler
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

// --- Secure Cookie Options ---
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
    sameSite: 'lax',
};


// === CONTROLLERS ===

// 1. Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, aadhaarNumber, role } = req.body;

    if ([fullName, email, password, aadhaarNumber, role].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All required fields must be filled.");
    }

    const existedUser = await User.findOne({ $or: [{ email }, { aadhaarNumber }] });
    if (existedUser) {
        throw new ApiError(409, "User with this email or Aadhaar number already exists.");
    }

    const user = await User.create({ fullName, email, password, aadhaarNumber, role });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user.");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully.")
    );
});


// 2. Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
        throw new ApiError(404, "User does not exist.");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid user credentials.');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken }, "User logged in successfully."));
});


// 3. Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully."));
});


// 4. Refresh Access Token
export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized: No refresh token provided.");
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);

    if (!user || incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh token is invalid or has expired.");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", newRefreshToken, cookieOptions)
        .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed successfully."));
});


// 5. Get Current Logged-In User
export const getCurrentUser = asyncHandler(async (req, res) => {
    // The user object is attached to the request by the authMiddleware
    return res.status(200).json(
        new ApiResponse(200, req.user, "Current user fetched successfully.")
   
    );
});