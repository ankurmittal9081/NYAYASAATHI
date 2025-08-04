// // import mongoose from 'mongoose';

// // const voiceQuerySchema = new mongoose.Schema({
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'LegalIssue', required: true },
// //   spokenText: String,
// //   transcribedText: String,
// //   language: String,
// //   isDeleted: { type: Boolean, default: false }
// // }, { timestamps: true });

// // export default mongoose.model('VoiceQuery', voiceQuerySchema);
// // ./models/VoiceQuery.js

// import mongoose from 'mongoose';

// const voiceQuerySchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     index: true // Indexing this for faster user-specific queries
//   },
//   issueId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'LegalIssue',
//     required: true
//   },
//   transcribedText: {
//     type: String,
//     trim: true // Automatically remove whitespace
//   },
//   language: String,
//   isDeleted: {
//     type: Boolean,
//     default: false,
//     index: true // Crucial for filtering performance
//   },
//   // --- RECOMMENDED IMPROVEMENT ---
//   // Track when the document was deleted. Useful for sorting and analytics.
//   deletedAt: {
//     type: Date,
//     default: null
//   }
// }, {
//   timestamps: true // Automatically adds createdAt and updatedAt
// });

// // --- Your existing middleware is perfect. ---
// // It excludes soft-deleted documents from all 'find' queries by default.
// voiceQuerySchema.pre(/^find/, function(next) {
//   // Check if a custom option to include deleted items has been passed.
//   if (this.getOptions().withDeleted !== true) {
//     this.where({ isDeleted: false });
//   }
//   next();
// });

// // --- RECOMMENDED IMPROVEMENT ---
// // Add a static method to explicitly find all documents, including deleted ones.
// // This makes your code in the routes cleaner and more readable.
// voiceQuerySchema.statics.findWithDeleted = function(query) {
//   // The { withDeleted: true } option bypasses our pre-find hook.
//   return this.find(query, null, { withDeleted: true });
// };


// const VoiceQuery = mongoose.model('VoiceQuery', voiceQuerySchema);

// export default VoiceQuery;
// ./models/VoiceQuery.js

import mongoose from 'mongoose';

// --- 1. Define the Schema Structure ---
// This outlines all the fields for a voice query document, their data types,
// and any validation rules (like 'required').
const voiceQuerySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',      // Links this field to the 'User' model
      required: true,
      index: true       // Speeds up searches for a specific user's queries
    },
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LegalIssue', // Links this field to the 'LegalIssue' model
      required: true
    },
    transcribedText: {
      type: String,
      trim: true        // Automatically removes leading/trailing whitespace
    },
    language: String,
    isDeleted: {
      type: Boolean,
      default: false,   // New documents are never deleted by default
      index: true       // CRITICAL: Makes filtering for deleted items very fast
    },
    deletedAt: {
      type: Date,
      default: null     // Tracks the exact time of deletion for analytics or sorting
    }
  },
  {
    // --- 2. Schema Options ---
    timestamps: true    // Automatically adds `createdAt` and `updatedAt` fields
  }
);


// --- 3. Mongoose Middleware for Soft Deletion ---
// This is the core of the soft-delete logic. It runs automatically
// BEFORE any query command that starts with "find" (e.g., find, findOne, countDocuments).
voiceQuerySchema.pre(/^find/, function (next) {
  // `this` refers to the Mongoose query object.

  // We add this check to allow us to intentionally get deleted documents
  // when we need to (e.g., for an admin panel or a "trash" feature).
  if (this.getOptions().withDeleted !== true) {
    // If the 'withDeleted' option is not set, automatically add a filter
    // to ONLY return documents where isDeleted is false.
    this.where({ isDeleted: false });
  }
  
  // Continue to the next step in the query execution.
  next();
});


// --- 4. Custom Static Method for Readability ---
// Static methods are helper functions attached directly to the model.
// This makes the code in your routes cleaner and easier to understand.
voiceQuerySchema.statics.findWithDeleted = function (query) {
  // This function calls the standard 'find' but passes the special option
  // that our middleware above looks for, allowing it to bypass the filter.
  return this.find(query, null, { withDeleted: true });
};


// --- 5. Create and Export the Model ---
// Compiles the schema into a model named 'VoiceQuery', which is then
// used to interact with the 'voicequeries' collection in MongoDB.
const VoiceQuery = mongoose.model('VoiceQuery', voiceQuerySchema);

export default VoiceQuery;