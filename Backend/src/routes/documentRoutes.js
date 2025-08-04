// // // // import { Router } from "express"
// // // // import Document from "../models/Document.js"
// // // // import { softDeleteById } from "../utils/helpers.js"
// // // // import { upload } from "../middleware/multer.middleware.js"
// // // // import { uploadOnCloudinary } from "../utils/cloudinary.js"

// // // // const router = Router()

// // // // // Create document with file upload
// // // // router.post("/upload", upload.single("documentFile"), async (req, res, next) => {  try {
// // // //     const { issueId, documentType } = req.body

// // // //     if (!req.file) {
// // // //       return res.status(400).json({ success: false, message: "Document file is required." })
// // // //     }

// // // //     const documentLocalPath = req.file.path
// // // //     const documentUploadResponse = await uploadOnCloudinary(documentLocalPath)

// // // //     if (!documentUploadResponse) {
// // // //       return res.status(500).json({ success: false, message: "Failed to upload document to cloud storage." })
// // // //     }

// // // //     const newDoc = await Document.create({
// // // //       userId: req.user._id,
// // // //       issueId: issueId || undefined,
// // // //       documentType,
// // // //       fileUrl: documentUploadResponse.url,
// // // //       submissionStatus: "submitted",
// // // //       uploadedBy: "User",
// // // //       isDeleted: false,
// // // //     })

// // // //     const populatedDoc = await Document.findById(newDoc._id)
// // // //       .populate("userId", "fullName email")
// // // //       .populate("issueId", "issueType description status")

// // // //     res.status(201).json({ success: true, data: populatedDoc })
// // // //   } catch (err) {
// // // //     next(err)
// // // //   }
// // // // })

// // // // // Get all documents for logged-in user
// // // // router.get("/", async (req, res, next) => {
// // // //   try {
// // // //     const docs = await Document.find({ userId: req.user._id, isDeleted: false })
// // // //       .populate("issueId", "issueType description status")
// // // //       .sort({ createdAt: -1 })

// // // //     res.json({ success: true, data: docs })
// // // //   } catch (err) {
// // // //     next(err)
// // // //   }
// // // // })

// // // // // Get single document with full details
// // // // router.get("/:id", async (req, res, next) => {
// // // //   try {
// // // //     const doc = await Document.findOne({
// // // //       _id: req.params.id,
// // // //       userId: req.user._id,
// // // //       isDeleted: false,
// // // //     })
// // // //       .populate("userId", "fullName email phoneNumber")
// // // //       .populate("issueId", "issueType description status createdAt")

// // // //     if (!doc) {
// // // //       return res.status(404).json({ success: false, message: "Document not found" })
// // // //     }

// // // //     res.json({ success: true, data: doc })
// // // //   } catch (err) {
// // // //     next(err)
// // // //   }
// // // // })

// // // // // Update document
// // // // router.put("/:id", async (req, res, next) => {
// // // //   try {
// // // //     const updatedDoc = await Document.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, {
// // // //       new: true,
// // // //     }).populate("issueId", "issueType description status")

// // // //     if (!updatedDoc) {
// // // //       return res.status(404).json({ success: false, message: "Document not found" })
// // // //     }

// // // //     res.json({ success: true, data: updatedDoc })
// // // //   } catch (err) {
// // // //     next(err)
// // // //   }
// // // // })

// // // // // Soft delete document
// // // // router.delete("/:id", async (req, res, next) => {
// // // //   try {
// // // //     const doc = await softDeleteById(Document, req.params.id)
// // // //     res.json({ success: true, message: "Document deleted successfully", data: doc })
// // // //   } catch (err) {
// // // //     next(err)
// // // //   }
// // // // })

// // // // export default router
// // // // File: Backend/src/routes/documentRoutes.js

// // // import { Router } from "express";
// // // import Document from "../models/Document.js";
// // // import { softDeleteById } from "../utils/helpers.js";
// // // import { upload, cleanupTempFile } from "../middleware/multer.middleware.js";
// // // import { uploadOnCloudinary } from "../utils/cloudinary.js";

// // // const router = Router();

// // // // Create document with file upload
// // // router.post("/upload", upload.single("documentFile"), async (req, res, next) => {
// // //   let tempFilePath = null;
  
// // //   try {
// // //     const { issueId, documentType } = req.body;

// // //     // Validate required fields
// // //     if (!documentType) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: "Document type is required." 
// // //       });
// // //     }

// // //     if (!req.file) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: "Document file is required." 
// // //       });
// // //     }

// // //     tempFilePath = req.file.path;
// // //     console.log(`📁 Temporary file saved at: ${tempFilePath}`);

// // //     // Upload to Cloudinary
// // //     console.log("☁️ Uploading to Cloudinary...");
// // //     const documentUploadResponse = await uploadOnCloudinary(tempFilePath);

// // //     if (!documentUploadResponse || !documentUploadResponse.url) {
// // //       throw new Error("Failed to upload document to cloud storage");
// // //     }

// // //     console.log("✅ Successfully uploaded to Cloudinary:", documentUploadResponse.url);

// // //     // Create document record in database
// // //     const newDoc = await Document.create({
// // //       userId: req.user._id,
// // //       issueId: issueId || undefined,
// // //       documentType,
// // //       fileUrl: documentUploadResponse.url,
// // //       submissionStatus: "submitted",
// // //       uploadedBy: "User",
// // //       isDeleted: false,
// // //     });

// // //     // Populate the response with related data
// // //     const populatedDoc = await Document.findById(newDoc._id)
// // //       .populate("userId", "fullName email")
// // //       .populate("issueId", "issueType description status");

// // //     // Clean up temporary file
// // //     cleanupTempFile(tempFilePath);

// // //     res.status(201).json({ 
// // //       success: true, 
// // //       message: "Document uploaded successfully",
// // //       data: populatedDoc 
// // //     });

// // //   } catch (error) {
// // //     console.error("❌ Document upload error:", error);
    
// // //     // Clean up temporary file on error
// // //     if (tempFilePath) {
// // //       cleanupTempFile(tempFilePath);
// // //     }

// // //     // Handle specific errors
// // //     if (error.message.includes("cloud storage")) {
// // //       return res.status(500).json({
// // //         success: false,
// // //         message: "Failed to upload document to cloud storage. Please try again."
// // //       });
// // //     }

// // //     if (error.message.includes("Only images, PDFs")) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: error.message
// // //       });
// // //     }

// // //     // Generic error handling
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Internal server error during document upload",
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get all documents for logged-in user
// // // router.get("/", async (req, res, next) => {
// // //   try {
// // //     const docs = await Document.find({ 
// // //       userId: req.user._id, 
// // //       isDeleted: false 
// // //     })
// // //       .populate("issueId", "issueType description status")
// // //       .sort({ createdAt: -1 });

// // //     res.json({ 
// // //       success: true, 
// // //       count: docs.length,
// // //       data: docs 
// // //     });
// // //   } catch (error) {
// // //     console.error("❌ Error fetching documents:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch documents"
// // //     });
// // //   }
// // // });

// // // // Get single document with full details
// // // router.get("/:id", async (req, res, next) => {
// // //   try {
// // //     const doc = await Document.findOne({
// // //       _id: req.params.id,
// // //       userId: req.user._id,
// // //       isDeleted: false,
// // //     })
// // //       .populate("userId", "fullName email phoneNumber")
// // //       .populate("issueId", "issueType description status createdAt");

// // //     if (!doc) {
// // //       return res.status(404).json({ 
// // //         success: false, 
// // //         message: "Document not found" 
// // //       });
// // //     }

// // //     res.json({ 
// // //       success: true, 
// // //       data: doc 
// // //     });
// // //   } catch (error) {
// // //     console.error("❌ Error fetching document:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch document"
// // //     });
// // //   }
// // // });

// // // // Update document
// // // router.put("/:id", async (req, res, next) => {
// // //   try {
// // //     const updatedDoc = await Document.findOneAndUpdate(
// // //       { _id: req.params.id, userId: req.user._id },
// // //       req.body,
// // //       { new: true }
// // //     ).populate("issueId", "issueType description status");

// // //     if (!updatedDoc) {
// // //       return res.status(404).json({ 
// // //         success: false, 
// // //         message: "Document not found" 
// // //       });
// // //     }

// // //     res.json({ 
// // //       success: true, 
// // //       message: "Document updated successfully",
// // //       data: updatedDoc 
// // //     });
// // //   } catch (error) {
// // //     console.error("❌ Error updating document:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to update document"
// // //     });
// // //   }
// // // });

// // // // Soft delete document
// // // router.delete("/:id", async (req, res, next) => {
// // //   try {
// // //     const doc = await softDeleteById(Document, req.params.id);
    
// // //     if (!doc) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Document not found"
// // //       });
// // //     }

// // //     res.json({ 
// // //       success: true, 
// // //       message: "Document deleted successfully", 
// // //       data: doc 
// // //     });
// // //   } catch (error) {
// // //     console.error("❌ Error deleting document:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to delete document"
// // //     });
// // //   }
// // // });


// // // export default router;
// // // Complete Document Routes
// // // File: Backend/src/routes/documentRoutes.js

// // import { Router } from "express";
// // import Document from "../models/Document.js";
// // import { softDeleteById } from "../utils/helpers.js";
// // import { upload, cleanupTempFile } from "../middleware/multer.middleware.js";
// // import { uploadOnCloudinary } from "../utils/cloudinary.js";

// // const router = Router();

// // // Create document with file upload
// // router.post("/upload", upload.single("documentFile"), async (req, res, next) => {
// //   let tempFilePath = null;
  
// //   try {
// //     console.log("📤 Document upload request received");
// //     console.log("Request body:", req.body);
// //     console.log("File info:", req.file ? `${req.file.filename} (${req.file.size} bytes)` : "No file");
    
// //     const { issueId, documentType } = req.body;

// //     // Validate required fields
// //     if (!documentType) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: "Document type is required." 
// //       });
// //     }

// //     if (!req.file) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: "Document file is required." 
// //       });
// //     }

// //     tempFilePath = req.file.path;
// //     console.log(`📁 Temporary file saved at: ${tempFilePath}`);

// //     // Upload to Cloudinary
// //     console.log("☁️ Uploading to Cloudinary...");
// //     const documentUploadResponse = await uploadOnCloudinary(tempFilePath);

// //     if (!documentUploadResponse || !documentUploadResponse.url) {
// //       throw new Error("Failed to upload document to cloud storage");
// //     }

// //     console.log("✅ Successfully uploaded to Cloudinary:", documentUploadResponse.url);

// //     // Create document record in database
// //     const newDoc = await Document.create({
// //       userId: req.user._id,
// //       issueId: issueId || undefined,
// //       documentType,
// //       fileUrl: documentUploadResponse.url,
// //       submissionStatus: "submitted",
// //       uploadedBy: "User",
// //       isDeleted: false,
// //     });

// //     console.log("📄 Document record created in database:", newDoc._id);

// //     // Populate the response with related data
// //     const populatedDoc = await Document.findById(newDoc._id)
// //       .populate("userId", "fullName email")
// //       .populate("issueId", "issueType description status");

// //     // Clean up temporary file
// //     cleanupTempFile(tempFilePath);

// //     console.log("✅ Document upload completed successfully");
// //     res.status(201).json({ 
// //       success: true, 
// //       message: "Document uploaded successfully",
// //       data: populatedDoc 
// //     });

// //   } catch (error) {
// //     console.error("❌ Document upload error:", error);
    
// //     // Clean up temporary file on error
// //     if (tempFilePath) {
// //       cleanupTempFile(tempFilePath);
// //     }

// //     // Handle specific errors
// //     if (error.code === 'INVALID_FILE_TYPE') {
// //       return res.status(400).json({
// //         success: false,
// //         message: error.message
// //       });
// //     }

// //     if (error.code === 'LIMIT_FILE_SIZE') {
// //       return res.status(400).json({
// //         success: false,
// //         message: "File size too large. Maximum size is 10MB."
// //       });
// //     }

// //     if (error.message.includes("cloud storage")) {
// //       return res.status(500).json({
// //         success: false,
// //         message: "Failed to upload document to cloud storage. Please try again."
// //       });
// //     }

// //     // Generic error handling
// //     res.status(500).json({
// //       success: false,
// //       message: "Internal server error during document upload",
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // Get all documents for logged-in user
// // router.get("/", async (req, res, next) => {
// //   try {
// //     console.log(`📋 Fetching documents for user: ${req.user._id}`);
    
// //     const docs = await Document.find({ 
// //       userId: req.user._id, 
// //       isDeleted: false 
// //     })
// //       .populate("issueId", "issueType description status")
// //       .sort({ createdAt: -1 });

// //     console.log(`✅ Found ${docs.length} documents`);
    
// //     res.json({ 
// //       success: true, 
// //       count: docs.length,
// //       data: docs 
// //     });
// //   } catch (error) {
// //     console.error("❌ Error fetching documents:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch documents",
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // Get single document with full details
// // router.get("/:id", async (req, res, next) => {
// //   try {
// //     console.log(`📄 Fetching document: ${req.params.id} for user: ${req.user._id}`);
    
// //     const doc = await Document.findOne({
// //       _id: req.params.id,
// //       userId: req.user._id,
// //       isDeleted: false,
// //     })
// //       .populate("userId", "fullName email phoneNumber")
// //       .populate("issueId", "issueType description status createdAt");

// //     if (!doc) {
// //       console.log("❌ Document not found");
// //       return res.status(404).json({ 
// //         success: false, 
// //         message: "Document not found" 
// //       });
// //     }

// //     console.log("✅ Document found and returned");
// //     res.json({ 
// //       success: true, 
// //       data: doc 
// //     });
// //   } catch (error) {
// //     console.error("❌ Error fetching document:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch document",
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // Update document
// // router.put("/:id", async (req, res, next) => {
// //   try {
// //     console.log(`📝 Updating document: ${req.params.id}`);
// //     console.log("Update data:", req.body);
    
// //     const updatedDoc = await Document.findOneAndUpdate(
// //       { _id: req.params.id, userId: req.user._id },
// //       req.body,
// //       { new: true, runValidators: true }
// //     ).populate("issueId", "issueType description status");

// //     if (!updatedDoc) {
// //       console.log("❌ Document not found for update");
// //       return res.status(404).json({ 
// //         success: false, 
// //         message: "Document not found" 
// //       });
// //     }

// //     console.log("✅ Document updated successfully");
// //     res.json({ 
// //       success: true, 
// //       message: "Document updated successfully",
// //       data: updatedDoc 
// //     });
// //   } catch (error) {
// //     console.error("❌ Error updating document:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to update document",
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // Soft delete document
// // router.delete("/:id", async (req, res, next) => {
// //   try {
// //     console.log(`🗑️ Deleting document: ${req.params.id}`);
    
// //     const doc = await Document.findOneAndUpdate(
// //       { _id: req.params.id, userId: req.user._id },
// //       { isDeleted: true },
// //       { new: true }
// //     );
    
// //     if (!doc) {
// //       console.log("❌ Document not found for deletion");
// //       return res.status(404).json({
// //         success: false,
// //         message: "Document not found"
// //       });
// //     }

// //     console.log("✅ Document deleted successfully");
// //     res.json({ 
// //       success: true, 
// //       message: "Document deleted successfully", 
// //       data: { id: doc._id, deletedAt: new Date() }
// //     });
// //   } catch (error) {
// //     console.error("❌ Error deleting document:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to delete document",
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // Get document statistics for user
// // router.get("/stats/overview", async (req, res, next) => {
// //   try {
// //     console.log(`📊 Fetching document statistics for user: ${req.user._id}`);
    
// //     const stats = await Document.aggregate([
// //       { $match: { userId: req.user._id, isDeleted: false } },
// //       {
// //         $group: {
// //           _id: "$submissionStatus",
// //           count: { $sum: 1 }
// //         }
// //       }
// //     ]);

// //     const totalCount = await Document.countDocuments({ 
// //       userId: req.user._id, 
// //       isDeleted: false 
// //     });

// //     const typeStats = await Document.aggregate([
// //       { $match: { userId: req.user._id, isDeleted: false } },
// //       {
// //         $group: {
// //           _id: "$documentType",
// //           count: { $sum: 1 }
// //         }
// //       }
// //     ]);

// //     console.log("✅ Document statistics calculated");
// //     res.json({
// //       success: true,
// //       data: {
// //         total: totalCount,
// //         byStatus: stats,
// //         byType: typeStats
// //       }
// //     });
// //   } catch (error) {
// //     console.error("❌ Error fetching document statistics:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch document statistics",
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // export default router;
// // File: Backend/src/routes/documentRoutes.js

import { Router } from "express";
import Document from "../models/Document.js";
import { upload, cleanupTempFile } from "../middleware/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
//import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

// === CREATE: Upload a new document ===
router.post("/upload", upload.single("documentFile"), async (req, res, next) => {
  let tempFilePath = req.file ? req.file.path : null;
  
  try {
    const { issueId, documentType } = req.body;

    if (!documentType || !documentType.trim()) {
      throw new ApiError(400, "Document type is required.");
    }

    if (!req.file) {
      throw new ApiError(400, "A document file is required for upload.");
    }
    
    const cloudinaryResponse = await uploadOnCloudinary(tempFilePath);

    if (!cloudinaryResponse || !cloudinaryResponse.url) {
      throw new ApiError(500, "Failed to upload document to cloud storage.");
    }

    const newDocument = await Document.create({
      userId: req.user._id,
      issueId: issueId || undefined,
      documentType,
      fileUrl: cloudinaryResponse.url,
      submissionStatus: "Submitted",
    });

    const populatedDoc = await Document.findById(newDocument._id).populate("userId", "fullName email");

    return res.status(201).json(
        new ApiResponse(201, populatedDoc, "Document uploaded successfully.")
    );

  } catch (error) {
    return next(error); // Pass error to the global error middleware
  } finally {
    if (tempFilePath) {
      cleanupTempFile(tempFilePath); // Always clean up the temp file
    }
  }
});

// === READ: Get all documents for the logged-in user ===
router.get("/", async (req, res, next) => {
  try {
    const documents = await Document.find({ userId: req.user._id, isDeleted: false })
      .populate("issueId", "issueType status")
      .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, documents, "Documents retrieved successfully.")
    );
  } catch (error) {
    return next(error);
  }
});

// === READ: Get a single document by its ID ===
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await Document.findOne({ _id: id, userId: req.user._id, isDeleted: false })
      .populate("userId", "fullName email");

    if (!document) {
      throw new ApiError(404, "Document not found or access denied.");
    }

    return res.status(200).json(
        new ApiResponse(200, document, "Document retrieved successfully.")
    );
  } catch (error) {
    return next(error);
  }
});


// === DELETE: Soft delete a document ===
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const document = await Document.findOneAndUpdate(
            { _id: id, userId: req.user._id, isDeleted: false },
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        );

        if (!document) {
            throw new ApiError(404, "Document not found or access denied.");
        }

        return res.status(200).json(
            new ApiResponse(200, { id: document._id }, "Document deleted successfully.")
        );
    } catch (error) {
        return next(error);
    }
});


export default router;
// File: Backend/src/routes/documentRoutes.js

// import { Router } from "express";
// import { upload, cleanupTempFile } from "../middleware/multer.middleware.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import Document from "../models/Document.js";

// const router = Router();

// // PATH: POST /api/documents/upload
// router.post("/upload", upload.single("documentFile"), async (req, res, next) => {
//   let tempFilePath = req.file ? req.file.path : null;
//   try {
//     const { issueId, documentType } = req.body;
//     if (!documentType) throw new ApiError(400, "Document type is required.");
//     if (!req.file) throw new ApiError(400, "Document file is required.");
    
//     const cloudinaryResponse = await uploadOnCloudinary(tempFilePath);
//     if (!cloudinaryResponse) throw new ApiError(500, "Failed to upload file to cloud.");

//     const doc = await Document.create({
//       userId: req.user._id,
//       issueId,
//       documentType,
//       fileUrl: cloudinaryResponse.url,
//     });
//     return res.status(201).json(new ApiResponse(201, doc, "Document uploaded successfully."));
//   } catch (error) {
//     return next(error);
//   } finally {
//     if (tempFilePath) cleanupTempFile(tempFilePath);
//   }
// });

// // PATH: GET /api/documents/
// router.get("/", async (req, res, next) => {
//   try {
//     const docs = await Document.find({ userId: req.user._id, isDeleted: false });
//     return res.status(200).json(new ApiResponse(200, docs, "Documents retrieved."));
//   } catch (error) {
//     return next(error);
//   }
// });

// // PATH: GET /api/documents/:id
// router.get("/:id", async (req, res, next) => {
//   try {
//     const doc = await Document.findOne({ _id: req.params.id, userId: req.user._id });
//     if (!doc) throw new ApiError(404, "Document not found.");
//     return res.status(200).json(new ApiResponse(200, doc, "Document retrieved."));
//   } catch (error) {
//     return next(error);
//   }
// });

// // PATH: DELETE /api/documents/:id
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const doc = await Document.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
//     if (!doc) throw new ApiError(404, "Document not found.");
//     return res.status(200).json(new ApiResponse(200, { id: req.params.id }, "Document deleted."));
//   } catch (error) {
//     return next(error);
//   }
// });

// export default router;