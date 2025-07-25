// Example for: src/controllers/auth.controller.js

import  User  from "../models/User.js";
import  Employee  from "../models/Employee.js";
import Paralegal  from "../models/Paralegal.js";
import  Admin  from "../models/Admin.js"; // Assuming you have an Admin model
import {ApiResponse}  from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    const { 
        fullName, email, password, aadhaarNumber, role,
        // Optional fields based on role
        phoneNumber, department, designation, roleLevel, kioskId, 
        areasOfExpertise, assignedDistricts, status, adminRole 
    } = req.body;

    // 1. Basic Validation (add more as needed)
    if ([fullName, email, password, aadhaarNumber, role].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All required fields must be filled.");
    }

    // 2. Check if user already exists
    const existedUser = await User.findOne({ $or: [{ email }, { aadhaarNumber }] });
    if (existedUser) {
        throw new ApiError(409, "User with this email or Aadhaar number already exists.");
    }

    // 3. Create the base User
    const user = await User.create({
        fullName,
        email,
        password,
        aadhaarNumber,
        role,
        phoneNumber // Store phone number at the User level if common
    });

    // 4. Create role-specific documents if applicable
    try {
        if (role === 'employee') {
            if (!kioskId || !department || !designation) {
                throw new ApiError(400, "Kiosk ID, department, and designation are required for employees.");
            }
            await Employee.create({
                user: user._id,
                kioskId,
                department,
                designation,
                roleLevel
            });
        } else if (role === 'paralegal') {
            if (!phoneNumber || !areasOfExpertise) {
                throw new ApiError(400, "Phone number and areas of expertise are required for paralegals.");
            }
            await Paralegal.create({
                user: user._id,
                phoneNumber,
                areasOfExpertise
            });
        } else if (role === 'admin') {
            // Add extra security here to prevent unauthorized admin creation
            await Admin.create({
                user: user._id,
                adminRole,
                status,
                assignedDistricts
            });
        }
    } catch (error) {
        // If role-specific creation fails, delete the created user to avoid orphaned users
        await User.findByIdAndDelete(user._id);
        throw new ApiError(500, `Failed to create role-specific profile: ${error.message}`);
    }


    // 5. Respond with success
    // Omit password and refresh token from the final response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(201).json(
        new ApiResponse(201, { user: createdUser }, "User registered successfully.")
    );
});
export { registerUser };
// Make sure this controller is used in your authRoutes.js