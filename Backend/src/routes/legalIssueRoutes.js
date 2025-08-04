// // // // // // // import { Router } from "express"
// // // // // // // import LegalIssue from "../models/LegalIssue.js"
// // // // // // // import Document from "../models/Document.js"
// // // // // // // import { softDeleteById } from "../utils/helpers.js"

// // // // // // // const router = Router()import { Router } from 'express';
// // // // // // // import LegalIssue from '../models/LegalIssue.js'; // Make sure this path is correct
// // // // // // // import { softDeleteById } from '../utils/helpers.js';

// // // // // // // const router = Router();

// // // // // // // // --- GET /api/issues ---
// // // // // // // // Fetches all legal issues to display in the admin panel's data table.
// // // // // // // router.get('/', async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     // We populate the 'userId' field to get user details like name and email.
// // // // // // //     // This is useful if you want to add user columns to your table later.
// // // // // // //     const issues = await LegalIssue.find({ isDeleted: false }).populate('userId', 'fullName email').sort({ createdAt: -1 });
// // // // // // //     res.json(issues);
// // // // // // //   } catch (err) {
// // // // // // //     next(err);
// // // // // // //   }
// // // // // // // });

// // // // // // // // --- GET /api/issues/:id ---
// // // // // // // // Fetches a single issue by its ID (useful for detail pages).
// // // // // // // router.get('/:id', async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const issue = await LegalIssue.findById(req.params.id).populate('userId', 'fullName email');
// // // // // // //     if (!issue) {
// // // // // // //       return res.status(404).json({ message: 'Legal issue not found' });
// // // // // // //     }
// // // // // // //     res.json(issue);
// // // // // // //   } catch (err) {
// // // // // // //     next(err);
// // // // // // //   }
// // // // // // // });

// // // // // // // // --- PUT /api/issues/:id ---
// // // // // // // // Updates an issue, used by your GenericEditModal component.
// // // // // // // router.put('/:id', async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const updatedIssue = await LegalIssue.findByIdAndUpdate(
// // // // // // //       req.params.id,
// // // // // // //       req.body,
// // // // // // //       { new: true, runValidators: true }
// // // // // // //     );
// // // // // // //     if (!updatedIssue) {
// // // // // // //       return res.status(404).json({ message: 'Legal issue not found' });
// // // // // // //     }
// // // // // // //     res.json({ message: 'Issue updated successfully', issue: updatedIssue });
// // // // // // //   } catch (err) {
// // // // // // //     next(err);
// // // // // // //   }
// // // // // // // });

// // // // // // // // --- DELETE /api/issues/:id ---
// // // // // // // // Deletes an issue, used by the "Delete" button in your data table.
// // // // // // // // This uses a soft delete for data integrity.
// // // // // // // router.delete('/:id', async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const issue = await softDeleteById(LegalIssue, req.params.id);
// // // // // // //     if (!issue) {
// // // // // // //       return res.status(404).json({ message: 'Issue not found' });
// // // // // // //     }
// // // // // // //     res.json({ message: 'Issue soft-deleted successfully' });
// // // // // // //   } catch (err) {
// // // // // // //     next(err);
// // // // // // //   }
// // // // // // // });

// // // // // // // export default router;

// // // // // // // // Create new legal issue
// // // // // // // router.post("/", async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const issue = await LegalIssue.create({
// // // // // // //       ...req.body,
// // // // // // //       userId: req.user._id,
// // // // // // //       isDeleted: false,
// // // // // // //     })

// // // // // // //     const populatedIssue = await LegalIssue.findById(issue._id)
// // // // // // //       .populate("userId", "fullName email")
// // // // // // //       .populate("kiosk", "location village district")
// // // // // // //       .populate("assignedParalegal", "user phoneNumber areasOfExpertise")

// // // // // // //     res.status(201).json({ success: true, data: populatedIssue })
// // // // // // //   } catch (err) {
// // // // // // //     next(err)
// // // // // // //   }
// // // // // // // })

// // // // // // // // Get all issues (admin) or user-specific issues
// // // // // // // router.get("/", async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const query = { isDeleted: false }

// // // // // // //     // If not admin, only show user's issues
// // // // // // //     if (req.user.role !== "admin") {
// // // // // // //       query.userId = req.user._id
// // // // // // //     }

// // // // // // //     const issues = await LegalIssue.find(query)
// // // // // // //       .populate("userId", "fullName email phoneNumber")
// // // // // // //       .populate("kiosk", "location village district operatorName")
// // // // // // //       .populate("assignedParalegal", "user phoneNumber areasOfExpertise")
// // // // // // //       .sort({ createdAt: -1 })

// // // // // // //     res.json({ success: true, data: issues })
// // // // // // //   } catch (err) {
// // // // // // //     next(err)
// // // // // // //   }
// // // // // // // })

// // // // // // // // Get single issue with full details - FIXED
// // // // // // // router.get("/:id", async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const query = { _id: req.params.id, isDeleted: false }

// // // // // // //     // If not admin, ensure user can only see their own issues
// // // // // // //     if (req.user.role !== "admin") {
// // // // // // //       query.userId = req.user._id
// // // // // // //     }

// // // // // // //     const issue = await LegalIssue.findOne(query)
// // // // // // //       .populate("userId", "fullName email phoneNumber aadhaarNumber")
// // // // // // //       .populate("kiosk", "location village district operatorName organizationType organizationName")
// // // // // // //       .populate({
// // // // // // //         path: "assignedParalegal",
// // // // // // //         populate: {
// // // // // // //           path: "user",
// // // // // // //           select: "fullName email",
// // // // // // //         },
// // // // // // //       })

// // // // // // //     if (!issue) {
// // // // // // //       return res.status(404).json({ success: false, message: "Issue not found" })
// // // // // // //     }

// // // // // // //     // Get related documents
// // // // // // //     const documents = await Document.find({ issueId: issue._id, isDeleted: false }).select(
// // // // // // //       "documentType fileUrl submissionStatus createdAt",
// // // // // // //     )

// // // // // // //     const issueWithDocs = {
// // // // // // //       ...issue.toObject(),
// // // // // // //       documents: documents,
// // // // // // //     }

// // // // // // //     res.json({ success: true, data: issueWithDocs })
// // // // // // //   } catch (err) {
// // // // // // //     console.error("Error fetching issue details:", err)
// // // // // // //     next(err)
// // // // // // //   }
// // // // // // // })

// // // // // // // // Update issue
// // // // // // // router.put("/:id", async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const query = { _id: req.params.id }

// // // // // // //     // If not admin, ensure user can only update their own issues
// // // // // // //     if (req.user.role !== "admin") {
// // // // // // //       query.userId = req.user._id
// // // // // // //     }

// // // // // // //     const updatedIssue = await LegalIssue.findOneAndUpdate(query, req.body, { new: true })
// // // // // // //       .populate("kiosk", "location village district")
// // // // // // //       .populate("assignedParalegal", "user phoneNumber areasOfExpertise")

// // // // // // //     if (!updatedIssue) {
// // // // // // //       return res.status(404).json({ success: false, message: "Issue not found" })
// // // // // // //     }

// // // // // // //     res.json({ success: true, data: updatedIssue })
// // // // // // //   } catch (err) {
// // // // // // //     next(err)
// // // // // // //   }
// // // // // // // })

// // // // // // // // Soft delete issue
// // // // // // // router.delete("/:id", async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const issue = await softDeleteById(LegalIssue, req.params.id)
// // // // // // //     res.json({ success: true, message: "Legal Issue deleted successfully", data: issue })
// // // // // // //   } catch (err) {
// // // // // // //     next(err)
// // // // // // //   }
// // // // // // // })

// // // // // // // export default router
// // // // // // import { Router } from 'express';
// // // // // // import LegalIssue from '../models/LegalIssue.js';
// // // // // // import Document from '../models/Document.js';
// // // // // // import { softDeleteById } from '../utils/helpers.js';

// // // // // // const router = Router();

// // // // // // // --- POST /api/issues ---
// // // // // // // Create new legal issue
// // // // // // router.post('/', async (req, res, next) => {
// // // // // //   try {
// // // // // //     const issue = await LegalIssue.create({
// // // // // //       ...req.body,
// // // // // //       userId: req.user._id,
// // // // // //       isDeleted: false,
// // // // // //     });

// // // // // //     const populatedIssue = await LegalIssue.findById(issue._id)
// // // // // //       .populate('userId', 'fullName email')
// // // // // //       .populate('kiosk', 'location village district')
// // // // // //       .populate('assignedParalegal', 'user phoneNumber areasOfExpertise');

// // // // // //     res.status(201).json({ 
// // // // // //       success: true, 
// // // // // //       message: 'Legal issue created successfully',
// // // // // //       data: populatedIssue 
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     next(err);
// // // // // //   }
// // // // // // });

// // // // // // // --- GET /api/issues ---
// // // // // // // Get all issues (admin) or user-specific issues
// // // // // // router.get('/', async (req, res, next) => {
// // // // // //   try {
// // // // // //     const query = { isDeleted: false };

// // // // // //     // If not admin, only show user's issues
// // // // // //     if (req.user.role !== 'admin') {
// // // // // //       query.userId = req.user._id;
// // // // // //     }

// // // // // //     const issues = await LegalIssue.find(query)
// // // // // //       .populate('userId', 'fullName email phoneNumber')
// // // // // //       .populate('kiosk', 'location village district operatorName')
// // // // // //       .populate('assignedParalegal', 'user phoneNumber areasOfExpertise')
// // // // // //       .sort({ createdAt: -1 });

// // // // // //     res.json({ success: true, data: issues });
// // // // // //   } catch (err) {
// // // // // //     next(err);
// // // // // //   }
// // // // // // });

// // // // // // // --- GET /api/issues/:id ---
// // // // // // // Get single issue with full details
// // // // // // router.get('/:id', async (req, res, next) => {
// // // // // //   try {
// // // // // //     const query = { _id: req.params.id, isDeleted: false };

// // // // // //     // If not admin, ensure user can only see their own issues
// // // // // //     if (req.user.role !== 'admin') {
// // // // // //       query.userId = req.user._id;
// // // // // //     }

// // // // // //     const issue = await LegalIssue.findOne(query)
// // // // // //       .populate('userId', 'fullName email phoneNumber aadhaarNumber')
// // // // // //       .populate('kiosk', 'location village district operatorName organizationType organizationName')
// // // // // //       .populate({
// // // // // //         path: 'assignedParalegal',
// // // // // //         populate: {
// // // // // //           path: 'user',
// // // // // //           select: 'fullName email',
// // // // // //         },
// // // // // //       });

// // // // // //     if (!issue) {
// // // // // //       return res.status(404).json({ 
// // // // // //         success: false, 
// // // // // //         message: 'Issue not found or you do not have permission to view it' 
// // // // // //       });
// // // // // //     }

// // // // // //     // Get related documents
// // // // // //     const documents = await Document.find({ 
// // // // // //       issueId: issue._id, 
// // // // // //       isDeleted: false 
// // // // // //     }).select('documentType fileUrl submissionStatus createdAt');

// // // // // //     const issueWithDocs = {
// // // // // //       ...issue.toObject(),
// // // // // //       documents: documents,
// // // // // //     };

// // // // // //     res.json({ success: true, data: issueWithDocs });
// // // // // //   } catch (err) {
// // // // // //     console.error('Error fetching issue details:', err);
// // // // // //     next(err);
// // // // // //   }
// // // // // // });

// // // // // // // --- PUT /api/issues/:id ---
// // // // // // // Update issue
// // // // // // router.put('/:id', async (req, res, next) => {
// // // // // //   try {
// // // // // //     const query = { _id: req.params.id, isDeleted: false };

// // // // // //     // If not admin, ensure user can only update their own issues
// // // // // //     if (req.user.role !== 'admin') {
// // // // // //       query.userId = req.user._id;
// // // // // //     }

// // // // // //     const updatedIssue = await LegalIssue.findOneAndUpdate(
// // // // // //       query, 
// // // // // //       req.body, 
// // // // // //       { 
// // // // // //         new: true, 
// // // // // //         runValidators: true 
// // // // // //       }
// // // // // //     )
// // // // // //       .populate('userId', 'fullName email')
// // // // // //       .populate('kiosk', 'location village district')
// // // // // //       .populate('assignedParalegal', 'user phoneNumber areasOfExpertise');

// // // // // //     if (!updatedIssue) {
// // // // // //       return res.status(404).json({ 
// // // // // //         success: false, 
// // // // // //         message: 'Issue not found or you do not have permission to update it' 
// // // // // //       });
// // // // // //     }

// // // // // //     res.json({ 
// // // // // //       success: true, 
// // // // // //       message: 'Issue updated successfully', 
// // // // // //       data: updatedIssue 
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     next(err);
// // // // // //   }
// // // // // // });

// // // // // // // --- DELETE /api/issues/:id ---
// // // // // // // Soft delete issue
// // // // // // router.delete('/:id', async (req, res, next) => {
// // // // // //   try {
// // // // // //     const query = { _id: req.params.id, isDeleted: false };

// // // // // //     // If not admin, ensure user can only delete their own issues
// // // // // //     if (req.user.role !== 'admin') {
// // // // // //       query.userId = req.user._id;
// // // // // //     }

// // // // // //     // First check if the issue exists and user has permission
// // // // // //     const existingIssue = await LegalIssue.findOne(query);
    
// // // // // //     if (!existingIssue) {
// // // // // //       return res.status(404).json({ 
// // // // // //         success: false, 
// // // // // //         message: 'Issue not found or you do not have permission to delete it' 
// // // // // //       });
// // // // // //     }

// // // // // //     const deletedIssue = await softDeleteById(LegalIssue, req.params.id);
    
// // // // // //     res.json({ 
// // // // // //       success: true, 
// // // // // //       message: 'Legal issue deleted successfully', 
// // // // // //       data: deletedIssue 
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     next(err);
// // // // // //   }
// // // // // // });

// // // // // // export default router;
// // // // // import { Router } from "express";
// // // // // import LegalIssue from "../models/LegalIssue.js";
// // // // // import Document from "../models/Document.js";
// // // // // import { softDeleteById } from "../utils/helpers.js";

// // // // // const router = Router();

// // // // // // --- GET /api/issues ---
// // // // // // Handles fetching issues for both admins and regular users.
// // // // // router.get("/", async (req, res, next) => {
// // // // //   try {
// // // // //     const query = { isDeleted: false };
// // // // //     const isAdmin = req.user.role === "admin";

// // // // //     // If the user is not an admin, they can only see their own issues.
// // // // //     if (!isAdmin) {
// // // // //       query.userId = req.user._id;
// // // // //     }

// // // // //     const issues = await LegalIssue.find(query)
// // // // //       .populate("userId", "fullName email") // Populate user details for the table.
// // // // //       .populate("kiosk", "location village")
// // // // //       .populate({
// // // // //         path: "assignedParalegal",
// // // // //         populate: { path: "user", select: "fullName" },
// // // // //       })
// // // // //       .sort({ createdAt: -1 });

// // // // //     // --- CRITICAL FIX ---
// // // // //     // The Admin Panel's DataTable expects a direct array of data.
// // // // //     // We check if the request is coming from an admin and return the correct format.
// // // // //     // For other users, we can wrap it in a success object.
// // // // //     if (isAdmin) {
// // // // //       res.json(issues); // Send the array directly for the admin panel.
// // // // //     } else {
// // // // //       res.json({ success: true, data: issues });
// // // // //     }
// // // // //   } catch (err) {
// // // // //     next(err);
// // // // //   }
// // // // // });

// // // // // // --- POST /api/issues ---
// // // // // // Creates a new legal issue.
// // // // // router.post("/", async (req, res, next) => {
// // // // //   try {
// // // // //     const issue = await LegalIssue.create({
// // // // //       ...req.body,
// // // // //       userId: req.user._id,
// // // // //       isDeleted: false,
// // // // //     });

// // // // //     const populatedIssue = await LegalIssue.findById(issue._id)
// // // // //       .populate("userId", "fullName email")
// // // // //       .populate("kiosk", "location village district");
      
// // // // //     res.status(201).json({ success: true, data: populatedIssue });
// // // // //   } catch (err) {
// // // // //     next(err);
// // // // //   }
// // // // // });

// // // // // // --- GET /api/issues/:id ---
// // // // // // Fetches a single issue with full details.
// // // // // router.get("/:id", async (req, res, next) => {
// // // // //   try {
// // // // //     const query = { _id: req.params.id, isDeleted: false };

// // // // //     // If not admin, ensure user can only see their own issue.
// // // // //     if (req.user.role !== "admin") {
// // // // //       query.userId = req.user._id;
// // // // //     }

// // // // //     const issue = await LegalIssue.findOne(query).populate("userId", "fullName email");

// // // // //     if (!issue) {
// // // // //       return res.status(404).json({ success: false, message: "Issue not found" });
// // // // //     }

// // // // //     // Attach related documents to the response.
// // // // //     const documents = await Document.find({ issueId: issue._id, isDeleted: false });
// // // // //     const issueWithDocs = { ...issue.toObject(), documents };

// // // // //     res.json({ success: true, data: issueWithDocs });
// // // // //   } catch (err) {
// // // // //     next(err);
// // // // //   }
// // // // // });

// // // // // // --- PUT /api/issues/:id ---
// // // // // // Updates an issue, used by the GenericEditModal.
// // // // // router.put("/:id", async (req, res, next) => {
// // // // //   try {
// // // // //     const query = { _id: req.params.id };

// // // // //     // If not an admin, a user can only update their own issues.
// // // // //     if (req.user.role !== "admin") {
// // // // //       query.userId = req.user._id;
// // // // //     }

// // // // //     const updatedIssue = await LegalIssue.findOneAndUpdate(query, req.body, { new: true });

// // // // //     if (!updatedIssue) {
// // // // //       return res.status(404).json({ success: false, message: "Issue not found or access denied" });
// // // // //     }

// // // // //     res.json({ message: "Issue updated successfully", issue: updatedIssue });
// // // // //   } catch (err) {
// // // // //     next(err);
// // // // //   }
// // // // // });

// // // // // // --- DELETE /api/issues/:id ---
// // // // // // Soft deletes an issue.
// // // // // router.delete("/:id", async (req, res, next) => {
// // // // //   try {
// // // // //     // Admins can delete any issue. We don't add a userId check here.
// // // // //     const issue = await softDeleteById(LegalIssue, req.params.id);
// // // // //     if (!issue) {
// // // // //         return res.status(404).json({ success: false, message: "Issue not found" });
// // // // //     }
// // // // //     res.json({ success: true, message: "Legal Issue deleted successfully" });
// // // // //   } catch (err) {
// // // // //     next(err);
// // // // //   }
// // // // // });

// // // // // export default router;
// // // // import { Router } from "express";
// // // // import LegalIssue from "../models/LegalIssue.js"; // Ensure path is correct for your LegalIssue model
// // // // import Document from "../models/Document.js";     // Ensure path is correct for your Document model
// // // // import { softDeleteById } from "../utils/helpers.js";

// // // // const router = Router();

// // // // // --- POST /api/issues ---
// // // // // Create a new legal issue.
// // // // // This route is intended for authenticated users (citizens/employees).
// // // // router.post("/", async (req, res, next) => {
// // // //   try {
// // // //     // Ensure req.user exists (from authMiddleware)
// // // //     if (!req.user || !req.user._id) {
// // // //       return res.status(401).json({ success: false, message: "Authentication required to create an issue." });
// // // //     }

// // // //     const issue = await LegalIssue.create({
// // // //       ...req.body,
// // // //       userId: req.user._id, // Assign the user creating the issue
// // // //       isDeleted: false,
// // // //     });

// // // //     const populatedIssue = await LegalIssue.findById(issue._id)
// // // //       .populate("userId", "fullName email")
// // // //       .populate("kiosk", "location village district")
// // // //       .populate("assignedParalegal", "user phoneNumber areasOfExpertise"); // Assuming `assignedParalegal` has a `user` field

// // // //     res.status(201).json({ success: true, data: populatedIssue });
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // });

// // // // // --- GET /api/issues ---
// // // // // Get all issues (for admin) or user-specific issues (for non-admin roles).
// // // // // This is used by the AdminPanelPage for the issues data table.
// // // // router.get("/", async (req, res, next) => {
// // // //   try {
// // // //     const query = { isDeleted: false };

// // // //     // If the authenticated user is NOT an admin, only show their own issues.
// // // //     if (req.user && req.user.role !== "admin") {
// // // //       query.userId = req.user._id;
// // // //     }

// // // //     const issues = await LegalIssue.find(query)
// // // //       .populate("userId", "fullName email phoneNumber") // Populate user details
// // // //       .populate("kiosk", "location village district operatorName") // Populate kiosk details
// // // //       .populate({
// // // //         path: "assignedParalegal",
// // // //         populate: {
// // // //           path: "user", // Populate the user object within assignedParalegal
// // // //           select: "fullName email",
// // // //         },
// // // //       })
// // // //       .sort({ createdAt: -1 }); // Sort by newest first

// // // //     res.json({ success: true, data: issues });
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // });

// // // // // --- GET /api/issues/:id ---
// // // // // Get a single issue with full details and related documents.
// // // // router.get("/:id", async (req, res, next) => {
// // // //   try {
// // // //     const query = { _id: req.params.id, isDeleted: false };

// // // //     // If not an admin, ensure user can only see their own issues.
// // // //     if (req.user && req.user.role !== "admin") {
// // // //       query.userId = req.user._id;
// // // //     }

// // // //     const issue = await LegalIssue.findOne(query)
// // // //       .populate("userId", "fullName email phoneNumber aadhaarNumber")
// // // //       .populate("kiosk", "location village district operatorName organizationType organizationName")
// // // //       .populate({
// // // //         path: "assignedParalegal",
// // // //         populate: {
// // // //           path: "user",
// // // //           select: "fullName email",
// // // //         },
// // // //       });

// // // //     if (!issue) {
// // // //       return res.status(404).json({ success: false, message: "Legal issue not found" });
// // // //     }

// // // //     // Get related documents for this issue.
// // // //     const documents = await Document.find({ issueId: issue._id, isDeleted: false }).select(
// // // //       "documentType fileUrl submissionStatus createdAt"
// // // //     );

// // // //     const issueWithDocs = {
// // // //       ...issue.toObject(), // Convert Mongoose document to a plain object
// // // //       documents: documents,
// // // //     };

// // // //     res.json({ success: true, data: issueWithDocs });
// // // //   } catch (err) {
// // // //     console.error("Error fetching issue details:", err); // Keep detailed error for debugging
// // // //     next(err);
// // // //   }
// // // // });

// // // // // --- PUT /api/issues/:id ---
// // // // // Update an existing issue.
// // // // router.put("/:id", async (req, res, next) => {
// // // //   try {
// // // //     const query = { _id: req.params.id };

// // // //     // If not an admin, ensure user can only update their own issues.
// // // //     // (Consider if employees/paralegals should also be able to update issues assigned to them).
// // // //     if (req.user && req.user.role !== "admin") {
// // // //       query.userId = req.user._id;
// // // //     }

// // // //     const updatedIssue = await LegalIssue.findOneAndUpdate(query, req.body, { new: true, runValidators: true })
// // // //       .populate("userId", "fullName email")
// // // //       .populate("kiosk", "location village district")
// // // //       .populate("assignedParalegal", "user phoneNumber areasOfExpertise");

// // // //     if (!updatedIssue) {
// // // //       return res.status(404).json({ success: false, message: "Legal issue not found or unauthorized to update" });
// // // //     }

// // // //     res.json({ success: true, message: "Issue updated successfully", data: updatedIssue });
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // });

// // // // // --- DELETE /api/issues/:id ---
// // // // // Soft delete a legal issue.
// // // // router.delete("/:id", async (req, res, next) => {
// // // //   try {
// // // //     const issue = await softDeleteById(LegalIssue, req.params.id);
// // // //     if (!issue) {
// // // //       return res.status(404).json({ success: false, message: "Legal issue not found" });
// // // //     }
// // // //     // Consistent response format with other delete operations
// // // //     res.json({ success: true, message: "Legal Issue soft-deleted successfully", data: issue });
// // // //   } catch (err) {
// // // //     next(err);
// // // //   }
// // // // });

// // // // export default router;
// // // import { Router } from 'express';
// // // import LegalIssue from '../models/LegalIssue.js';
// // // import { softDeleteById } from '../utils/helpers.js';

// // // const router = Router();

// // // // --- GET /api/issues ---
// // // // Fetches all issues for the admin panel. This is the primary route used by your DataTable.
// // // // It now returns a direct array of issues as the frontend expects.
// // // router.get('/', async (req, res, next) => {
// // //   try {
// // //     const issues = await LegalIssue.find({ isDeleted: false })
// // //       .populate('userId', 'fullName email') // Populate user details for the table
// // //       .sort({ createdAt: -1 }); // Show the newest issues first

// // //     // CRITICAL FIX: Send the array directly, not wrapped in an object.
// // //     res.json(issues);
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // });

// // // // --- PUT /api/issues/:id ---
// // // // Updates a single issue. This route is used by your GenericEditModal.
// // // router.put('/:id', async (req, res, next) => {
// // //   try {
// // //     const updatedIssue = await LegalIssue.findByIdAndUpdate(
// // //       req.params.id,
// // //       req.body,
// // //       { new: true, runValidators: true } // Standard options to return the updated doc
// // //     );

// // //     if (!updatedIssue) {
// // //       return res.status(404).json({ message: 'Issue not found' });
// // //     }
// // //     // The modal can handle this response format.
// // //     res.json({ message: 'Issue updated successfully', issue: updatedIssue });
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // });

// // // // --- DELETE /api/issues/:id ---
// // // // Soft-deletes a single issue. This is used by the "Delete" button.
// // // router.delete('/:id', async (req, res, next) => {
// // //   try {
// // //     const issue = await softDeleteById(LegalIssue, req.params.id);
    
// // //     if (!issue) {
// // //       return res.status(404).json({ message: 'Issue not found' });
// // //     }
// // //     res.json({ message: 'Issue soft-deleted successfully' });
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // });

// // // // NOTE: The POST and detailed GET /:id routes from your original file have been omitted here
// // // // as they are not required for the Admin Panel functionality and were part of the duplication.
// // // // They can be added back carefully if needed elsewhere in your application.

// // // export default router;
// // // File: ./routes/legalIssueRoutes.js

// // import { Router } from 'express';
// // import LegalIssue from '../models/LegalIssue.js'; // Ensure this path is correct
// // import { softDeleteById } from '../utils/helpers.js'; // Ensure this path is correct

// // const router = Router();

// // // --- GET /api/issues ---
// // // Fetches all issues for the admin panel data table.
// // // CRITICAL FIX: This now returns a direct array of issues.
// // router.get('/', async (req, res, next) => {
// //   try {
// //     const issues = await LegalIssue.find({ isDeleted: false })
// //       .populate('userId', 'fullName email') // Gets user details for the table
// //       .sort({ createdAt: -1 }); // Shows the newest issues first

// //     // Send the array directly, NOT wrapped in an object
// //     res.json(issues);

// //   } catch (err) {
// //     next(err); // Pass any errors to the global error handler
// //   }
// // });

// // // --- PUT /api/issues/:id ---
// // // Updates a single issue (used by the "Edit" modal in the admin panel).
// // router.put('/:id', async (req, res, next) => {
// //   try {
// //     const updatedIssue = await LegalIssue.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true, runValidators: true }
// //     );

// //     if (!updatedIssue) {
// //       return res.status(404).json({ message: 'Issue not found' });
// //     }
    
// //     res.json({ message: 'Issue updated successfully', issue: updatedIssue });
// //   } catch (err) {
// //     next(err);
// //   }
// // });

// // // --- DELETE /api/issues/:id ---
// // // Soft-deletes a single issue (used by the "Delete" button).
// // router.delete('/:id', async (req, res, next) => {
// //   try {
// //     const issue = await softDeleteById(LegalIssue, req.params.id);
    
// //     if (!issue) {
// //       return res.status(404).json({ message: 'Issue not found' });
// //     }

// //     res.json({ message: 'Issue soft-deleted successfully' });
// //   } catch (err) {
// //     next(err);
// //   }
// // });

// // export default router;
// // File: ./routes/legalIssueRoutes.js

// import { Router } from 'express';
// import LegalIssue from '../models/LegalIssue.js'; // Ensure this path is correct
// import { softDeleteById } from '../utils/helpers.js'; // Ensure this path is correct

// const router = Router();

// // --- GET /api/issues ---
// // Fetches all issues for the admin panel data table.
// router.get('/', async (req, res, next) => {
//   try {
//     const issues = await LegalIssue.find({ isDeleted: false })
//       .populate('userId', 'fullName email')
//       .sort({ createdAt: -1 });

//     res.json(issues);
//   } catch (err) {
//     next(err);
//   }
// });


// // --- POST /api/issues ---  <-- THIS IS THE NEWLY ADDED ROUTE
// // Creates a new legal issue from the "AddIssueModal".
// router.post('/', async (req, res, next) => {
//   try {
//     const issue = await LegalIssue.create({
//       ...req.body, // The data from your form
//       userId: req.user._id, // Assigns the currently logged-in user
//       isDeleted: false,
//     });

//     // We can populate the response to give the frontend full details if needed
//     const populatedIssue = await LegalIssue.findById(issue._id)
//       .populate('userId', 'fullName email');
      
//     res.status(201).json({ success: true, message: 'Issue created successfully', data: populatedIssue });
//   } catch (err) {
//     next(err);
//   }
// });


// // --- PUT /api/issues/:id ---
// // Updates a single issue (used by the "Edit" modal).
// router.put('/:id', async (req, res, next) => {
//   try {
//     const updatedIssue = await LegalIssue.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedIssue) {
//       return res.status(404).json({ message: 'Issue not found' });
//     }
    
//     res.json({ message: 'Issue updated successfully', issue: updatedIssue });
//   } catch (err) {
//     next(err);
//   }
// });

// // --- DELETE /api/issues/:id ---
// // Soft-deletes a single issue (used by the "Delete" button).
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const issue = await softDeleteById(LegalIssue, req.params.id);
    
//     if (!issue) {
//       return res.status(404).json({ message: 'Issue not found' });
//     }

//     res.json({ message: 'Issue soft-deleted successfully' });
//   } catch (err) {
//     next(err);
//   }
// });

// export default router;
// File: Backend/src/routes/legalIssueRoutes.js

import { Router } from 'express';
import LegalIssue from '../models/LegalIssue.js';
// import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const router = Router();

// === CREATE: Create a new legal issue ===
router.post('/', async (req, res, next) => {
  try {
    const { issueType, description, kioskId } = req.body;
    if (!issueType || !description) {
      throw new ApiError(400, "Issue Type and Description are required.");
    }

    const newIssue = await LegalIssue.create({
      userId: req.user._id,
      issueType,
      description,
      kiosk: kioskId,
      status: 'Pending',
    });

    return res.status(201).json(
      new ApiResponse(201, newIssue, "Legal issue created successfully.")
    );
  } catch (error) {
    return next(error);
  }
});


// === READ: Get all issues (for admin) or user-specific issues ===
router.get('/', async (req, res, next) => {
  try {
    const query = { isDeleted: false };
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }

    const issues = await LegalIssue.find(query)
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, issues, "Issues retrieved successfully."));
  } catch (error) {
    return next(error);
  }
});


// === READ: Get a single issue by ID ===
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = { _id: id, isDeleted: false };
        if (req.user.role !== 'admin') {
            query.userId = req.user._id;
        }

        const issue = await LegalIssue.findOne(query);

        if (!issue) {
            throw new ApiError(404, "Legal issue not found or access denied.");
        }

        return res.status(200).json(new ApiResponse(200, issue, "Issue retrieved successfully."));
    } catch(error) {
        return next(error);
    }
});


// === DELETE: Soft delete an issue ===
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = { _id: id, isDeleted: false };
        if (req.user.role !== 'admin') {
            query.userId = req.user._id;
        }

        const issue = await LegalIssue.findOneAndUpdate(query, { isDeleted: true, deletedAt: new Date() }, { new: true });

        if(!issue) {
            throw new ApiError(404, "Issue not found or access denied.");
        }

        return res.status(200).json(new ApiResponse(200, { id: issue._id }, "Issue deleted successfully."));
    } catch(error) {
        return next(error);
    }
});


export default router;