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