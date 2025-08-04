// // // // // import multer from "multer";

// // // // // // Configure Multer to store files on disk in a temporary directory
// // // // // const storage = multer.diskStorage({
// // // // //     destination: function (req, file, cb) {
// // // // //       cb(null, "./public/temp")
// // // // //     },
// // // // //     filename: function (req, file, cb) {
// // // // //       // We don't need a unique name as it's temporary, but it's good practice
// // // // //       cb(null, file.originalname) 
// // // // //     }
// // // // // })

// // // // // export const upload = multer({ storage });
// // // // // File: Backend/src/middleware/multer.middleware.js

// // // // import multer from "multer";
// // // // import path from "path"; // <-- Step 1: Import the 'path' module

// // // // // --- THIS IS THE CRITICAL FIX ---
// // // // // We create a storage configuration that defines a robust, absolute destination path.
// // // // const storage = multer.diskStorage({
// // // //   destination: function (req, file, cb) {
// // // //     // Step 2: Use an absolute path to ensure the directory is always found correctly.
// // // //     // This resolves the path relative to the current file's directory.
// // // //     const uploadPath = path.join(path.resolve(), 'src', 'public', 'temp');
// // // //     cb(null, uploadPath);
// // // //   },
// // // //   filename: function (req, file, cb) {
// // // //     // Keep the original filename
// // // //     cb(null, file.originalname);
// // // //   }
// // // // });

// // // // export const upload = multer({ 
// // // //   storage: storage // Step 3: Use our new, robust storage configuration
// // // // });
// // // // File: Backend/src/middleware/multer.middleware.js

// // // import multer from "multer";
// // // import path from "path";
// // // import { fileURLToPath } from "url"; // <-- Step 1: Import a new helper

// // // // --- Step 2: Get the directory name of the CURRENT file ---
// // // // This is the modern way to get the '__dirname' in ES Modules
// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // const storage = multer.diskStorage({
// // //   destination: function (req, file, cb) {
// // //     // --- Step 3: Create the path relative to THIS file ---
// // //     // Go up one level from 'middleware' to 'src', then into 'public/temp'
// // //     const uploadPath = path.join(__dirname, "..", "public", "temp");
// // //     cb(null, uploadPath);
// // //   },
// // //   filename: function (req, file, cb) {
// // //     cb(null, file.originalname);
// // //   }
// // // });

// // // export const upload = multer({ 
// // //   storage: storage 
// // // });
// // // File: Backend/src/middleware/multer.middleware.js

// // import multer from "multer";
// // import path from "path";
// // import { fileURLToPath } from "url";
// // import fs from "fs"; // Import the 'fs' module

// // // This is the modern way to get the '__dirname' in ES Modules
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // This is the absolute path to your 'temp' directory
// // const uploadPath = path.join(__dirname, "..", "public", "temp");

// // // --- CRITICAL FIX: Ensure the directory exists before configuring storage ---
// // // This will automatically create the 'public/temp' directory if it's missing.
// // if (!fs.existsSync(uploadPath)) {
// //   fs.mkdirSync(uploadPath, { recursive: true });
// //   console.log(`✅ Created temporary upload directory at: ${uploadPath}`);
// // }

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     // We already verified the path exists, so we can just use it.
// //     cb(null, uploadPath);
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.originalname);
// //   }
// // });

// // export const upload = multer({ 
// //   storage: storage 
// // });

// // File: Backend/src/middleware/multer.middleware.js

// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// // Get current directory in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Create absolute path to temp directory
// const uploadPath = path.join(__dirname, "..", "public", "temp");

// // Ensure directory exists - create if missing
// const ensureUploadDirectory = () => {
//   try {
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//       console.log(`✅ Created upload directory: ${uploadPath}`);
//     }
//     return true;
//   } catch (error) {
//     console.error(`❌ Failed to create upload directory: ${error.message}`);
//     return false;
//   }
// };

// // Initialize directory on startup
// ensureUploadDirectory();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Double-check directory exists before each upload
//     if (!ensureUploadDirectory()) {
//       return cb(new Error("Upload directory is not available"));
//     }
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     // Create unique filename to avoid conflicts
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const fileExtension = path.extname(file.originalname);
//     const baseName = path.basename(file.originalname, fileExtension);
//     cb(null, `${baseName}-${uniqueSuffix}${fileExtension}`);
//   }
// });

// // Add file filtering for security
// const fileFilter = (req, file, cb) => {
//   // Define allowed file types
//   const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Only images, PDFs, and documents are allowed!'));
//   }
// };

// export const upload = multer({ 
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
//   fileFilter: fileFilter
// });

// // Export a cleanup function to remove temporary files
// export const cleanupTempFile = (filePath) => {
//   if (filePath && fs.existsSync(filePath)) {
//     try {
//       fs.unlinkSync(filePath);
//       console.log(`🗑️ Cleaned up temp file: ${filePath}`);
//     } catch (error) {
//       console.error(`❌ Failed to cleanup temp file: ${error.message}`);
//     }
//   }
// };
// Complete Multer Middleware
// File: Backend/src/middleware/multer.middleware.js

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create absolute path to temp directory
const uploadPath = path.join(__dirname, "..", "public", "temp");

// Ensure directory exists - create if missing
const ensureUploadDirectory = () => {
  try {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log(`✅ Created upload directory: ${uploadPath}`);
    }
    return true;
  } catch (error) {
    console.error(`❌ Failed to create upload directory: ${error.message}`);
    return false;
  }
};

// Initialize directory on startup
ensureUploadDirectory();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Double-check directory exists before each upload
    if (!ensureUploadDirectory()) {
      return cb(new Error("Upload directory is not available"));
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, fileExtension);
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize filename
    cb(null, `${sanitizedBaseName}-${uniqueSuffix}${fileExtension}`);
  }
});

// File filtering for security
const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    const error = new Error('Only images (JPEG, JPG, PNG, GIF), PDFs, and documents (DOC, DOCX, TXT) are allowed!');
    error.code = 'INVALID_FILE_TYPE';
    cb(error);
  }
};

// Create multer instance with configuration
export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1, // Only one file at a time
  },
  fileFilter: fileFilter
});

// Export a cleanup function to remove temporary files
export const cleanupTempFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Cleaned up temp file: ${path.basename(filePath)}`);
    } catch (error) {
      console.error(`❌ Failed to cleanup temp file: ${error.message}`);
    }
  }
};

// Export utility function to get upload path
export const getUploadPath = () => uploadPath;

// Export function to check if upload directory is ready
export const isUploadReady = () => {
  return fs.existsSync(uploadPath) && fs.statSync(uploadPath).isDirectory();
};