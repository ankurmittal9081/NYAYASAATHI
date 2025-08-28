// // // import { Router } from 'express';
// // // import VoiceQuery from '../models/VoiceQuery.js';
// // // import { softDeleteById } from '../utils/helpers.js';

// // // const router = Router();


// // // // Get all voice queries for the logged-in user
// // // router.get('/', async (req, res, next) => {
// // //   try {
// // //     const voiceQueries = await VoiceQuery.find({ userId: req.user.userId, isDeleted: false });
// // //     res.json(voiceQueries);
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // });

// // // // Soft delete a voice query
// // // router.delete('/:id', async (req, res, next) => {
// // //   try {
// // //     const query = await softDeleteById(VoiceQuery, req.params.id);
// // //     res.json({ message: 'Voice Query soft-deleted successfully', query });
// // //   } catch (err) {
// // //     next(err);
// // //   }
// // // });

// // // export default router;
// // // ./routes/voiceQueryRoutes.js

// // import { Router } from 'express';
// // import VoiceQuery from '../models/VoiceQuery.js';
// // import mongoose from 'mongoose';

// // // Import your powerful helper functions
// // import {
// //     softDeleteById,
// //     restoreById,
// //     createResponse,
// //     generatePagination
// // } from '../utils/helpers.js';

// // // Import validation tools
// // import { body, query, param, validationResult } from 'express-validator';

// // const router = Router();

// // // --- Reusable Validation Middleware ---
// // // This middleware checks for validation errors from express-validator
// // // and uses our custom createResponse helper for a consistent error format.
// // const validate = (req, res, next) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //         const errorResponse = createResponse(false, null, 'Validation Failed', { errors: errors.array() });
// //         return res.status(400).json(errorResponse);
// //     }
// //     next();
// // };

// // // =================================================================
// // // --- SPECIFIC ROUTES (Must come before routes with /:id) ---
// // // =================================================================

// // // --- Get voice query statistics for the user ---
// // router.get('/stats/summary', async (req, res, next) => {
// //     try {
// //         const userId = new mongoose.Types.ObjectId(req.user.userId);

// //         const [activeQueries, deletedQueries] = await Promise.all([
// //             // Middleware automatically handles isDeleted: false
// //             VoiceQuery.countDocuments({ userId }),
// //             // We must bypass the middleware to count deleted documents
// //             VoiceQuery.countDocuments({ userId, isDeleted: true }, { withDeleted: true }),
// //         ]);

// //         const stats = {
// //             activeQueries,
// //             deletedQueries,
// //             totalQueries: activeQueries + deletedQueries,
// //         };

// //         res.status(200).json(createResponse(true, stats, 'Statistics retrieved successfully.'));
// //     } catch (err) {
// //         next(err);
// //     }
// // });

// // // --- Get a list of deleted voice queries (for recovery) ---
// // router.get('/deleted/list', [
// //     query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
// //     query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100.'),
// //     validate
// // ], async (req, res, next) => {
// //     try {
// //         const { page = 1, limit = 10 } = req.query;
// //         const skip = (parseInt(page) - 1) * parseInt(limit);

// //         const queryConditions = { userId: req.user.userId, isDeleted: true };

// //         const [deletedQueries, totalCount] = await Promise.all([
// //             VoiceQuery.findWithDeleted(queryConditions)
// //                 .sort({ deletedAt: -1 })
// //                 .skip(skip)
// //                 .limit(parseInt(limit))
// //                 .lean(),
// //             VoiceQuery.countDocuments(queryConditions, { withDeleted: true })
// //         ]);

// //         const pagination = generatePagination(page, limit, totalCount);
// //         res.status(200).json(createResponse(true, deletedQueries, 'Deleted queries retrieved successfully.', { pagination }));

// //     } catch (err) {
// //         next(err);
// //     }
// // });

// // // =================================================================
// // // --- GENERIC CRUD ROUTES ---
// // // =================================================================

// // // --- Get all ACTIVE voice queries (with pagination and sorting) ---
// // router.get('/', [
// //     query('page').optional().isInt({ min: 1 }),
// //     query('limit').optional().isInt({ min: 1, max: 100 }),
// //     query('sortBy').optional().isString().isIn(['createdAt', 'updatedAt', 'transcribedText']),
// //     query('sortOrder').optional().isString().isIn(['asc', 'desc']),
// //     validate
// // ], async (req, res, next) => {
// //     try {
// //         const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
        
// //         const query = { userId: req.user.userId }; // Middleware handles isDeleted
// //         const skip = (parseInt(page) - 1) * parseInt(limit);
// //         const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

// //         const [voiceQueries, totalCount] = await Promise.all([
// //             VoiceQuery.find(query).sort(sort).skip(skip).limit(parseInt(limit)).lean(),
// //             VoiceQuery.countDocuments(query)
// //         ]);

// //         const pagination = generatePagination(page, limit, totalCount);
// //         res.status(200).json(createResponse(true, voiceQueries, 'Queries retrieved successfully.', { pagination }));

// //     } catch (err) {
// //         next(err);
// //     }
// // });

// // // --- Get a specific voice query by ID ---
// // router.get('/:id', [
// //     param('id').isMongoId().withMessage('Invalid ID format.'),
// //     validate
// // ], async (req, res, next) => {
// //     try {
// //         // Middleware ensures we only find active queries.
// //         // We also check ownership.
// //         const voiceQuery = await VoiceQuery.findOne({ _id: req.params.id, userId: req.user.userId });

// //         if (!voiceQuery) {
// //             return res.status(404).json(createResponse(false, null, 'Voice query not found or access denied.'));
// //         }

// //         res.status(200).json(createResponse(true, voiceQuery, 'Query retrieved successfully.'));
// //     } catch (err) {
// //         next(err);
// //     }
// // });

// // // --- Create a new voice query ---
// // router.post('/', [
// //     body('issueId').isMongoId().withMessage('A valid issue ID is required.'),
// //     body('transcribedText').isString().trim().notEmpty().withMessage('Transcribed text cannot be empty.'),
// //     body('language').optional().isString(),
// //     validate
// // ], async (req, res, next) => {
// //     try {
// //         const newVoiceQuery = new VoiceQuery({
// //             issueId: req.body.issueId,
// //             transcribedText: req.body.transcribedText,
// //             language: req.body.language,
// //             userId: req.user.userId // Ensure ownership
// //         });

// //         const savedQuery = await newVoiceQuery.save();
// //         res.status(201).json(createResponse(true, savedQuery, 'Voice query created successfully.'));
// //     } catch (err) {
// //         next(err);
// //     }
// // });

// // // --- Soft delete a voice query ---
// // router.delete('/:id', [
// //     param('id').isMongoId().withMessage('Invalid ID format.'),
// //     validate
// // ], async (req, res, next) => {
// //     try {
// //         // The helper handles all logic: ID validation, ownership check, and error handling.
// //         const deletedQuery = await softDeleteById(VoiceQuery, req.params.id, {
// //             checkOwnership: true,
// //             userId: req.user.userId
// //         });

// //         res.status(200).json(createResponse(true, deletedQuery, 'Voice query deleted successfully.'));
// //     } catch (err) {
// //         // The helper throws errors with status codes, which our global error handler will use.
// //         next(err);
// //     }
// // });

// // // --- Restore a soft-deleted voice query ---
// // router.patch('/:id/restore', [
// //     param('id').isMongoId().withMessage('Invalid ID format.'),
// //     validate
// // ], async (req, res, next) => {
// //     try {
// //         // Use the restore helper with the same secure options.
// //         const restoredQuery = await restoreById(VoiceQuery, req.params.id, {
// //             checkOwnership: true,
// //             userId: req.user.userId
// //         });

// //         res.status(200).json(createResponse(true, restoredQuery, 'Voice query restored successfully.'));
// //     } catch (err) {
// //         next(err);
// //     }
// // });

// // export default router;
// // ./routes/voiceQueryRoutes.js

// import { Router } from 'express';
// import VoiceQuery from '../models/VoiceQuery.js';
// import mongoose from 'mongoose';

// // Import your powerful, reusable helper functions
// import {
//     softDeleteById,
//     restoreById,
//     createResponse,
//     generatePagination
// } from '../utils/helpers.js';

// // Import validation tools from express-validator
// import { body, query, param, validationResult } from 'express-validator';

// const router = Router();

// // --- Reusable Validation Middleware ---
// // This small middleware checks for validation errors and uses our custom
// // createResponse helper for a consistent and clean error format.
// const validate = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         const errorResponse = createResponse(false, null, 'Validation Failed', { errors: errors.array() });
//         return res.status(400).json(errorResponse);
//     }
//     next();
// };

// // =================================================================
// // --- SPECIFIC ROUTES (These must come before generic routes with /:id) ---
// // =================================================================

// // --- Get voice query statistics for the user ---
// router.get('/stats/summary', async (req, res, next) => {
//     try {
//         const userId = new mongoose.Types.ObjectId(req.user.userId);

//         const [activeQueries, deletedQueries] = await Promise.all([
//             // The model middleware automatically handles isDeleted: false
//             VoiceQuery.countDocuments({ userId }),
//             // We must bypass the middleware to count deleted documents
//             VoiceQuery.countDocuments({ userId, isDeleted: true }, { withDeleted: true }),
//         ]);

//         const stats = {
//             activeQueries,
//             deletedQueries,
//             totalQueries: activeQueries + deletedQueries,
//         };

//         res.status(200).json(createResponse(true, stats, 'Statistics retrieved successfully.'));
//     } catch (err) {
//         next(err); // Pass errors to the global error handler
//     }
// });

// // --- Get a list of deleted voice queries (for recovery) ---
// router.get('/deleted/list', [
//     query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
//     query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100.'),
//     validate
// ], async (req, res, next) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const skip = (parseInt(page) - 1) * parseInt(limit);

//         const queryConditions = { userId: req.user.userId, isDeleted: true };

//         const [deletedQueries, totalCount] = await Promise.all([
//             // Use the custom static method from the model to find deleted items
//             VoiceQuery.findWithDeleted(queryConditions)
//                 .sort({ deletedAt: -1 }) // Sort by when they were deleted
//                 .skip(skip)
//                 .limit(parseInt(limit))
//                 .lean(),
//             // Count only the deleted documents
//             VoiceQuery.countDocuments(queryConditions, { withDeleted: true })
//         ]);

//         const pagination = generatePagination(page, limit, totalCount);
//         res.status(200).json(createResponse(true, deletedQueries, 'Deleted queries retrieved successfully.', { pagination }));

//     } catch (err) {
//         next(err);
//     }
// });

// // =================================================================
// // --- GENERIC CRUD ROUTES ---
// // =================================================================

// // --- Get all ACTIVE voice queries (with pagination and sorting) ---
// router.get('/', [
//     query('page').optional().isInt({ min: 1 }),
//     query('limit').optional().isInt({ min: 1, max: 100 }),
//     query('sortBy').optional().isString().isIn(['createdAt', 'updatedAt', 'transcribedText']).withMessage('Invalid sort field.'),
//     query('sortOrder').optional().isString().isIn(['asc', 'desc']).withMessage('Invalid sort order.'),
//     validate
// ], async (req, res, next) => {
//     try {
//         const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
        
//         const query = { userId: req.user.userId }; // The model middleware handles isDeleted:false
//         const skip = (parseInt(page) - 1) * parseInt(limit);
//         const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

//         const [voiceQueries, totalCount] = await Promise.all([
//             VoiceQuery.find(query).sort(sort).skip(skip).limit(parseInt(limit)).lean(),
//             VoiceQuery.countDocuments(query)
//         ]);

//         const pagination = generatePagination(page, limit, totalCount);
//         res.status(200).json(createResponse(true, voiceQueries, 'Queries retrieved successfully.', { pagination }));

//     } catch (err) {
//         next(err);
//     }
// });

// // --- Get a specific voice query by ID ---
// router.get('/:id', [
//     param('id').isMongoId().withMessage('Invalid ID format.'),
//     validate
// ], async (req, res, next) => {
//     try {
//         // The model middleware ensures we only find active queries.
//         // We also check for ownership in the query itself for security.
//         const voiceQuery = await VoiceQuery.findOne({ _id: req.params.id, userId: req.user.userId });

//         if (!voiceQuery) {
//             return res.status(404).json(createResponse(false, null, 'Voice query not found or access denied.'));
//         }

//         res.status(200).json(createResponse(true, voiceQuery, 'Query retrieved successfully.'));
//     } catch (err) {
//         next(err);
//     }
// });

// // --- Create a new voice query ---
// router.post('/', [
//     body('issueId').isMongoId().withMessage('A valid issue ID is required.'),
//     body('transcribedText').isString().trim().notEmpty().withMessage('Transcribed text cannot be empty.'),
//     body('language').optional().isString(),
//     validate
// ], async (req, res, next) => {
//     try {
//         const newVoiceQuery = new VoiceQuery({
//             issueId: req.body.issueId,
//             transcribedText: req.body.transcribedText,
//             language: req.body.language,
//             userId: req.user.userId // CRITICAL: Ensure ownership is set from the logged-in user
//         });

//         const savedQuery = await newVoiceQuery.save();
//         res.status(201).json(createResponse(true, savedQuery, 'Voice query created successfully.'));
//     } catch (err) {
//         next(err);
//     }
// });

// // --- Soft delete a voice query ---
// router.delete('/:id', [
//     param('id').isMongoId().withMessage('Invalid ID format.'),
//     validate
// ], async (req, res, next) => {
//     try {
//         // The helper handles all logic: ID validation, ownership check, and error handling.
//         const deletedQuery = await softDeleteById(VoiceQuery, req.params.id, {
//             checkOwnership: true,
//             userId: req.user.userId
//         });

//         res.status(200).json(createResponse(true, deletedQuery, 'Voice query deleted successfully.'));
//     } catch (err) {
//         // Errors from the helper have status codes and are passed to the global handler.
//         next(err);
//     }
// });

// // --- Restore a soft-deleted voice query ---
// router.patch('/:id/restore', [
//     param('id').isMongoId().withMessage('Invalid ID format.'),
//     validate
// ], async (req, res, next) => {
//     try {
//         // The restore helper uses the same secure options.
//         const restoredQuery = await restoreById(VoiceQuery, req.params.id, {
//             checkOwnership: true,
//             userId: req.user.userId
//         });

//         res.status(200).json(createResponse(true, restoredQuery, 'Voice query restored successfully.'));
//     } catch (err) {
//         next(err);
//     }
// });

// export default router;
// ./routes/voiceQueryRoutes.js
import { Router } from 'express';
import VoiceQuery from '../models/VoiceQuery.js';
import mongoose from 'mongoose';

// Import helper functions
import {
    softDeleteById,
    restoreById,
    createResponse,
    generatePagination
} from '../utils/helpers.js';

// Import validation tools
import { body, query, param, validationResult } from 'express-validator';

const router = Router();

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorResponse = createResponse(false, null, 'Validation Failed', { errors: errors.array() });
        return res.status(400).json(errorResponse);
    }
    next();
};

// =================================================================
// SPECIFIC ROUTES (Must come before generic routes with /:id)
// =================================================================

// Get voice query statistics for the user
router.get('/stats/summary', async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        
        const [activeQueries, deletedQueries] = await Promise.all([
            // Model middleware automatically handles isDeleted: false
            VoiceQuery.countDocuments({ userId }),
            // Bypass middleware to count deleted documents
            VoiceQuery.countDocuments({ userId, isDeleted: true }, { withDeleted: true }),
        ]);

        const stats = {
            activeQueries,
            deletedQueries,
            totalQueries: activeQueries + deletedQueries,
        };

        res.status(200).json(createResponse(true, stats, 'Statistics retrieved successfully.'));
    } catch (err) {
        next(err);
    }
});

// Get deleted voice queries list (for recovery)
router.get('/deleted/list', [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100.'),
    validate
], async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const queryConditions = { userId: req.user.userId, isDeleted: true };

        const [deletedQueries, totalCount] = await Promise.all([
            // Use custom static method to find deleted items
            VoiceQuery.findWithDeleted(queryConditions)
                .sort({ deletedAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            VoiceQuery.countDocuments(queryConditions, { withDeleted: true })
        ]);

        const pagination = generatePagination(page, limit, totalCount);
        res.status(200).json(createResponse(true, deletedQueries, 'Deleted queries retrieved successfully.', { pagination }));

    } catch (err) {
        next(err);
    }
});

// =================================================================
// GENERIC CRUD ROUTES
// =================================================================

// Get all ACTIVE voice queries (with pagination and sorting)
router.get('/', [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('sortBy').optional().isString().isIn(['createdAt', 'updatedAt', 'transcribedText']).withMessage('Invalid sort field.'),
    query('sortOrder').optional().isString().isIn(['asc', 'desc']).withMessage('Invalid sort order.'),
    validate
], async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
        const query = { userId: req.user.userId }; // Model middleware handles isDeleted: false
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

        const [voiceQueries, totalCount] = await Promise.all([
            VoiceQuery.find(query).sort(sort).skip(skip).limit(parseInt(limit)).lean(),
            VoiceQuery.countDocuments(query)
        ]);

        const pagination = generatePagination(page, limit, totalCount);
        res.status(200).json(createResponse(true, voiceQueries, 'Queries retrieved successfully.', { pagination }));

    } catch (err) {
        next(err);
    }
});

// Get a specific voice query by ID
router.get('/:id', [
    param('id').isMongoId().withMessage('Invalid ID format.'),
    validate
], async (req, res, next) => {
    try {
        // Model middleware ensures we only find active queries
        // Also check ownership for security
        const voiceQuery = await VoiceQuery.findOne({ 
            _id: req.params.id, 
            userId: req.user.userId 
        });

        if (!voiceQuery) {
            return res.status(404).json(createResponse(false, null, 'Voice query not found or access denied.'));
        }

        res.status(200).json(createResponse(true, voiceQuery, 'Query retrieved successfully.'));
    } catch (err) {
        next(err);
    }
});

// Create a new voice query
router.post('/', [
    body('issueId').isMongoId().withMessage('A valid issue ID is required.'),
    body('transcribedText').isString().trim().notEmpty().withMessage('Transcribed text cannot be empty.'),
    body('language').optional().isString(),
    validate
], async (req, res, next) => {
    try {
        const newVoiceQuery = new VoiceQuery({
            issueId: req.body.issueId,
            transcribedText: req.body.transcribedText,
            language: req.body.language,
            userId: req.user.userId // Ensure ownership is set from logged-in user
        });

        const savedQuery = await newVoiceQuery.save();
        res.status(201).json(createResponse(true, savedQuery, 'Voice query created successfully.'));
    } catch (err) {
        next(err);
    }
});

// Soft delete a voice query
router.delete('/:id', [
    param('id').isMongoId().withMessage('Invalid ID format.'),
    validate
], async (req, res, next) => {
    try {
        // Helper handles all logic: ID validation, ownership check, error handling
        const deletedQuery = await softDeleteById(VoiceQuery, req.params.id, {
            checkOwnership: true,
            userId: req.user.userId
        });

        res.status(200).json(createResponse(true, deletedQuery, 'Voice query deleted successfully.'));
    } catch (err) {
        // Errors from helper have status codes and are passed to global handler
        next(err);
    }
});

// Restore a soft-deleted voice query
router.patch('/:id/restore', [
    param('id').isMongoId().withMessage('Invalid ID format.'),
    validate
], async (req, res, next) => {
    try {
        // Restore helper uses the same secure options
        const restoredQuery = await restoreById(VoiceQuery, req.params.id, {
            checkOwnership: true,
            userId: req.user.userId
        });

        res.status(200).json(createResponse(true, restoredQuery, 'Voice query restored successfully.'));
    } catch (err) {
        next(err);
    }
});

export default router;