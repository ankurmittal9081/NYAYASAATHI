// // export const softDeleteById = async (Model, id) => {
// //     const updatedDoc = await Model.findByIdAndUpdate(
// //       id,
// //       { isDeleted: true },
// //       { new: true }
// //     );
// //     if (!updatedDoc) {
// //       throw new Error('Document not found or already deleted.');
// //     }
// //     return updatedDoc;
// // };
// // ./utils/helpers.js

// import mongoose from 'mongoose';

// /**
//  * Soft deletes a document by its ID for any given Mongoose model.
//  * @param {mongoose.Model} Model - The Mongoose model to perform the operation on.
//  * @param {string} id - The ID of the document to soft-delete.
//  * @param {Object} options - Additional options for the operation.
//  * @param {string} options.userId - User ID to verify ownership (optional).
//  * @param {boolean} options.checkOwnership - Whether to check document ownership (default: false).
//  * @returns {Promise<mongoose.Document>} The updated document.
//  * @throws {Error} If the document is not found, already deleted, or access is denied.
//  */
// export const softDeleteById = async (Model, id, options = {}) => {
//   try {
//     // Validate the provided ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       const error = new Error('Invalid document ID format.');
//       error.status = 400;
//       throw error;
//     }

//     // Build the query conditions
//     const queryConditions = { _id: id };
    
//     // Add ownership check if required
//     if (options.checkOwnership && options.userId) {
//       queryConditions.userId = options.userId;
//     }

//     // Check if document exists and is not already deleted
//     const existingDoc = await Model.findOne(queryConditions);
    
//     if (!existingDoc) {
//       const error = new Error(
//         options.checkOwnership 
//           ? 'Document not found or access denied.'
//           : 'Document not found.'
//       );
//       error.status = 404;
//       throw error;
//     }

//     if (existingDoc.isDeleted) {
//       const error = new Error('Document is already deleted.');
//       error.status = 409; // Conflict
//       throw error;
//     }

//     // Perform the soft delete
//     const updatedDoc = await Model.findByIdAndUpdate(
//       id,
//       { 
//         isDeleted: true,
//         deletedAt: new Date(),
//         updatedAt: new Date()
//       },
//       { 
//         new: true,
//         runValidators: true
//       }
//     );

//     return updatedDoc;

//   } catch (error) {
//     // If it's already a custom error, re-throw it
//     if (error.status) {
//       throw error;
//     }
    
//     // Handle unexpected errors
//     const unexpectedError = new Error('An error occurred while deleting the document.');
//     unexpectedError.status = 500;
//     unexpectedError.originalError = error;
//     throw unexpectedError;
//   }
// };

// /**
//  * Restores a soft-deleted document by its ID.
//  * @param {mongoose.Model} Model - The Mongoose model to perform the operation on.
//  * @param {string} id - The ID of the document to restore.
//  * @param {Object} options - Additional options for the operation.
//  * @param {string} options.userId - User ID to verify ownership (optional).
//  * @param {boolean} options.checkOwnership - Whether to check document ownership (default: false).
//  * @returns {Promise<mongoose.Document>} The restored document.
//  * @throws {Error} If the document is not found, not deleted, or access is denied.
//  */
// export const restoreById = async (Model, id, options = {}) => {
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       const error = new Error('Invalid document ID format.');
//       error.status = 400;
//       throw error;
//     }

//     const queryConditions = { _id: id };
    
//     if (options.checkOwnership && options.userId) {
//       queryConditions.userId = options.userId;
//     }

//     const existingDoc = await Model.findOne(queryConditions);
    
//     if (!existingDoc) {
//       const error = new Error(
//         options.checkOwnership 
//           ? 'Document not found or access denied.'
//           : 'Document not found.'
//       );
//       error.status = 404;
//       throw error;
//     }

//     if (!existingDoc.isDeleted) {
//       const error = new Error('Document is not deleted.');
//       error.status = 409;
//       throw error;
//     }

//     const restoredDoc = await Model.findByIdAndUpdate(
//       id,
//       { 
//         isDeleted: false,
//         deletedAt: null,
//         updatedAt: new Date()
//       },
//       { 
//         new: true,
//         runValidators: true
//       }
//     );

//     return restoredDoc;

//   } catch (error) {
//     if (error.status) {
//       throw error;
//     }
    
//     const unexpectedError = new Error('An error occurred while restoring the document.');
//     unexpectedError.status = 500;
//     unexpectedError.originalError = error;
//     throw unexpectedError;
//   }
// };

// /**
//  * Hard deletes a document by its ID (permanently removes it).
//  * Use with caution - this action cannot be undone.
//  * @param {mongoose.Model} Model - The Mongoose model to perform the operation on.
//  * @param {string} id - The ID of the document to hard delete.
//  * @param {Object} options - Additional options for the operation.
//  * @param {string} options.userId - User ID to verify ownership (optional).
//  * @param {boolean} options.checkOwnership - Whether to check document ownership (default: false).
//  * @returns {Promise<mongoose.Document>} The deleted document.
//  * @throws {Error} If the document is not found or access is denied.
//  */
// export const hardDeleteById = async (Model, id, options = {}) => {
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       const error = new Error('Invalid document ID format.');
//       error.status = 400;
//       throw error;
//     }

//     const queryConditions = { _id: id };
    
//     if (options.checkOwnership && options.userId) {
//       queryConditions.userId = options.userId;
//     }

//     const deletedDoc = await Model.findOneAndDelete(queryConditions);
    
//     if (!deletedDoc) {
//       const error = new Error(
//         options.checkOwnership 
//           ? 'Document not found or access denied.'
//           : 'Document not found.'
//       );
//       error.status = 404;
//       throw error;
//     }

//     return deletedDoc;

//   } catch (error) {
//     if (error.status) {
//       throw error;
//     }
    
//     const unexpectedError = new Error('An error occurred while permanently deleting the document.');
//     unexpectedError.status = 500;
//     unexpectedError.originalError = error;
//     throw unexpectedError;
//   }
// };

// /**
//  * Validates if a document exists and belongs to a user.
//  * @param {mongoose.Model} Model - The Mongoose model to check.
//  * @param {string} id - The ID of the document to validate.
//  * @param {string} userId - The user ID to check ownership against.
//  * @param {Object} options - Additional options.
//  * @param {boolean} options.includeDeleted - Whether to include soft-deleted documents (default: false).
//  * @returns {Promise<mongoose.Document|null>} The document if found and owned by user, null otherwise.
//  */
// export const validateOwnership = async (Model, id, userId, options = {}) => {
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return null;
//     }

//     const queryConditions = { 
//       _id: id, 
//       userId: userId 
//     };

//     if (!options.includeDeleted) {
//       queryConditions.isDeleted = false;
//     }

//     const document = await Model.findOne(queryConditions);
//     return document;

//   } catch (error) {
//     console.error('Error validating document ownership:', error);
//     return null;
//   }
// };

// /**
//  * Bulk soft delete multiple documents by their IDs.
//  * @param {mongoose.Model} Model - The Mongoose model to perform the operation on.
//  * @param {string[]} ids - Array of document IDs to soft delete.
//  * @param {Object} options - Additional options.
//  * @param {string} options.userId - User ID to verify ownership (optional).
//  * @param {boolean} options.checkOwnership - Whether to check document ownership (default: false).
//  * @returns {Promise<Object>} Object containing success count and any errors.
//  */
// export const bulkSoftDelete = async (Model, ids, options = {}) => {
//   try {
//     // Validate all IDs
//     const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    
//     if (validIds.length === 0) {
//       return {
//         success: 0,
//         failed: ids.length,
//         errors: ['No valid IDs provided']
//       };
//     }

//     const queryConditions = { 
//       _id: { $in: validIds },
//       isDeleted: false
//     };

//     if (options.checkOwnership && options.userId) {
//       queryConditions.userId = options.userId;
//     }

//     const result = await Model.updateMany(
//       queryConditions,
//       { 
//         isDeleted: true,
//         deletedAt: new Date(),
//         updatedAt: new Date()
//       }
//     );

//     return {
//       success: result.modifiedCount,
//       failed: validIds.length - result.modifiedCount,
//       total: validIds.length,
//       errors: []
//     };

//   } catch (error) {
//     return {
//       success: 0,
//       failed: ids.length,
//       errors: [error.message]
//     };
//   }
// };

// /**
//  * Creates a standardized API response format.
//  * @param {boolean} success - Whether the operation was successful.
//  * @param {any} data - The response data.
//  * @param {string} message - Response message.
//  * @param {Object} meta - Additional metadata (pagination, etc.).
//  * @returns {Object} Standardized response object.
//  */
// export const createResponse = (success, data = null, message = '', meta = {}) => {
//   const response = {
//     success,
//     message,
//     timestamp: new Date().toISOString()
//   };

//   if (data !== null) {
//     response.data = data;
//   }

//   if (Object.keys(meta).length > 0) {
//     response.meta = meta;
//   }

//   return response;
// };

// /**
//  * Sanitizes user input by removing potentially dangerous fields.
//  * @param {Object} input - The input object to sanitize.
//  * @param {string[]} allowedFields - Array of allowed field names.
//  * @returns {Object} Sanitized object containing only allowed fields.
//  */
// export const sanitizeInput = (input, allowedFields) => {
//   const sanitized = {};
  
//   allowedFields.forEach(field => {
//     if (input.hasOwnProperty(field)) {
//       sanitized[field] = input[field];
//     }
//   });

//   return sanitized;
// };

// /**
//  * Generates pagination metadata.
//  * @param {number} page - Current page number.
//  * @param {number} limit - Items per page.
//  * @param {number} totalCount - Total number of items.
//  * @returns {Object} Pagination metadata object.
//  */
// export const generatePagination = (page, limit, totalCount) => {
//   const totalPages = Math.ceil(totalCount / limit);
  
//   return {
//     currentPage: parseInt(page),
//     totalPages,
//     totalCount,
//     hasNextPage: parseInt(page) < totalPages,
//     hasPrevPage: parseInt(page) > 1,
//     limit: parseInt(limit)
//   };
// };
// ./utils/helpers.js

import mongoose from 'mongoose';

// =================================================================
// --- DATABASE OPERATION HELPERS ---
// =================================================================

/**
 * Soft deletes a document by its ID, ensuring ownership and preventing re-deletion.
 * @param {mongoose.Model} Model - The Mongoose model to perform the operation on.
 * @param {string} id - The ID of the document to soft-delete.
 * @param {object} [options={}] - Additional options for the operation.
 * @param {string} [options.userId] - User ID to verify ownership.
 * @param {boolean} [options.checkOwnership=false] - Whether to enforce ownership check.
 * @returns {Promise<mongoose.Document>} The updated, soft-deleted document.
 * @throws {ApiError} If the document is not found, access is denied, or it's already deleted.
 */
export const softDeleteById = async (Model, id, options = {}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw { status: 400, message: 'Invalid document ID format.' };
  }

  const queryConditions = { _id: id };
  if (options.checkOwnership && options.userId) {
    queryConditions.userId = options.userId;
  }

  // Use the model's 'find' which respects the soft-delete middleware
  const existingDoc = await Model.findOne(queryConditions);

  if (!existingDoc) {
    throw { status: 404, message: options.checkOwnership ? 'Document not found or access denied.' : 'Document not found.' };
  }

  // Note: The 'isDeleted' check is implicitly handled by the findOne query,
  // but an explicit check can prevent race conditions if needed.
  // if (existingDoc.isDeleted) {
  //   throw { status: 409, message: 'Document is already deleted.' };
  // }

  // Perform the soft delete
  return Model.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
      deletedAt: new Date(),
    },
    { new: true } // Return the updated document
  );
};

/**
 * Restores a soft-deleted document by its ID, ensuring ownership.
 * @param {mongoose.Model} Model - The Mongoose model to perform the operation on.
 * @param {string} id - The ID of the document to restore.
 * @param {object} [options={}] - Additional options for the operation.
 * @param {string} [options.userId] - User ID to verify ownership.
 * @param {boolean} [options.checkOwnership=false] - Whether to enforce ownership check.
 * @returns {Promise<mongoose.Document>} The restored document.
 * @throws {ApiError} If the document is not found, access is denied, or it's not deleted.
 */
export const restoreById = async (Model, id, options = {}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw { status: 400, message: 'Invalid document ID format.' };
  }

  const queryConditions = { _id: id, isDeleted: true };
  if (options.checkOwnership && options.userId) {
    queryConditions.userId = options.userId;
  }

  // We must bypass the default middleware to find a deleted document
  const existingDoc = await Model.findWithDeleted(queryConditions).findOne();

  if (!existingDoc) {
    throw { status: 404, message: 'Deleted document not found or access denied.' };
  }

  // Perform the restore
  return Model.findByIdAndUpdate(
    id,
    {
      isDeleted: false,
      deletedAt: null,
    },
    { new: true, withDeleted: true } // withDeleted ensures findByIdAndUpdate can find the item
  );
};

// =================================================================
// --- API UTILITY HELPERS ---
// =================================================================

/**
 * Creates a standardized API response object for consistency across the application.
 * @param {boolean} success - Indicates if the operation was successful.
 * @param {any} [data=null] - The payload/data to be sent. Can be an object, array, or null.
 * @param {string} [message=''] - A descriptive message about the response.
 * @param {object} [meta={}] - Additional metadata, typically for pagination.
 * @returns {object} A standardized response object.
 */
export const createResponse = (success, data = null, message = '', meta = {}) => {
  const response = {
    success,
    message,
    timestamp: new Date().toISOString()
  };

  if (data !== null) {
    response.data = data;
  }

  if (Object.keys(meta).length > 0) {
    response.meta = meta;
  }

  return response;
};

/**
 * Generates a standard pagination metadata object from query results.
 * @param {number|string} page - The current page number.
 * @param {number|string} limit - The number of items per page.
 * @param {number} totalCount - The total number of items available in the database.
 * @returns {object} Pagination metadata object.
 */
export const generatePagination = (page, limit, totalCount) => {
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const totalPages = Math.ceil(totalCount / limitNum);

  return {
    currentPage: pageNum,
    limit: limitNum,
    totalCount,
    totalPages,
    hasNextPage: pageNum < totalPages,
    hasPrevPage: pageNum > 1,
  };
};

/**
 * Sanitizes a request body object by picking only the allowed fields.
 * Prevents mass assignment vulnerabilities.
 * @param {object} input - The raw input object (e.g., req.body).
 * @param {string[]} allowedFields - An array of field names that are permitted.
 * @returns {object} A new object containing only the allowed fields.
 */
export const sanitizeInput = (input, allowedFields) => {
  const sanitized = {};
  allowedFields.forEach(field => {
    // Check if the input object has the property and it's not undefined
    if (Object.prototype.hasOwnProperty.call(input, field) && input[field] !== undefined) {
      sanitized[field] = input[field];
    }
  });
  return sanitized;
};