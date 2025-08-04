// // import fetch from "node-fetch";
// // import { asyncHandler } from "../utils/asyncHandler.js";

// // /**
// //  * @route POST /api/ai/chat
// //  * @description Handles chat requests from the frontend, communicates with the Groq AI API, and returns the response.
// //  * @access Protected (requires valid JWT)
// //  */
// // const getAIChatResponseController = asyncHandler(async (req, res) => {
// //   // 1. Get conversation history and the new query from the frontend request
// //   const { conversationHistory, newQuery } = req.body;

// //   if (!newQuery) {
// //     return res.status(400).json({ success: false, error: "Query is required." });
// //   }

// //   // 2. Get the secret API key from your backend environment variables
// //   const AI_API_KEY = process.env.GROQ_API_KEY;

// //   // --- ESSENTIAL DEBUGGING STEP ---
// //   // This log confirms if the API key is accessible within this controller when the route is hit.
// //   // Check your backend terminal for this message when you use the AI assistant.
// //   console.log("GROQ_API_KEY inside controller:", AI_API_KEY ? "Key Loaded Successfully" : "ERROR: KEY IS MISSING!");

// //   if (!AI_API_KEY) {
// //     console.error("CRITICAL: GROQ_API_KEY is not defined in the environment.");
// //     return res.status(500).json({ success: false, error: "AI service is not configured correctly on the server." });
// //   }

// //   // 3. Define the system prompt to guide the AI's behavior
// //   const systemPrompt = {
// //     role: "system",
// //     content: `You are NyayaSaathi, a friendly, empathetic, and highly knowledgeable AI legal assistant for Rural India. Your primary goal is to provide clear, simple, and actionable legal information. Always respond in the same language as the user's query (primarily Hindi or English). Structure your answers with clear headings (using **bold text**), lists, and simple steps. Keep the language easy to understand for someone who is not a legal expert.`,
// //   };

// //   // 4. Construct the full message payload for the AI
// //   const messages = [
// //     systemPrompt,
// //     ...(conversationHistory || []), // Safely include history, even if it's empty
// //     { role: "user", content: newQuery },
// //   ];

// //   try {
// //     // 5. Make the API call to the Groq service
// //     const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${AI_API_KEY}`,
// //       },
// //       body: JSON.stringify({
// //         model: "llama3-8b-8192", // Using the specified efficient model
// //         messages: messages,
// //         temperature: 0.7, // A good balance between creativity and determinism
// //       }),
// //     });

// //     // 6. Handle non-successful responses from the Groq API
// //     if (!groqResponse.ok) {
// //       const errorData = await groqResponse.json();
// //       console.error("Groq API Error Response:", errorData); // Log the full error for debugging
// //       throw new Error(errorData.error?.message || `Groq API responded with status ${groqResponse.status}`);
// //     }

// //     const data = await groqResponse.json();
// //     const aiResponse = data.choices[0]?.message?.content.trim();

// //     if (!aiResponse) {
// //         throw new Error("Received an empty response from the AI model.");
// //     }

// //     // 7. Send the AI's successful response back to the frontend
// //     res.status(200).json({ success: true, response: aiResponse });

// //   } catch (error) {
// //     // 8. Catch any errors during the fetch process or from the checks above
// //     console.error("Error communicating with Groq API:", error);
// //     res.status(500).json({ success: false, error: `An error occurred while communicating with the AI service. Please try again later.` });
// //   }
// // });

// // export { getAIChatResponseController };
// // ./controllers/ai.controller.js

// import fetch from "node-fetch";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { ApiError } from "../utils/ApiError.js";

// /**
//  * @route POST /api/ai/chat
//  * @description Handles chat requests, communicates with the Groq AI API, and returns a standardized response.
//  * @access Protected (Requires a valid JWT)
//  */
// const getAIChatResponseController = asyncHandler(async (req, res) => {
//     // --- 1. Validate incoming request from the frontend ---
//     const { conversationHistory, newQuery } = req.body;

//     if (!newQuery || typeof newQuery !== 'string' || newQuery.trim() === '') {
//         // Throw a specific, standardized error. asyncHandler will catch this
//         // and pass it to your global error middleware.
//         throw new ApiError(400, "Query content is required and cannot be empty.");
//     }

//     // --- 2. Securely get and validate the API Key from environment variables ---
//     const AI_API_KEY = process.env.GROQ_API_KEY;

//     if (!AI_API_KEY) {
//         console.error("CRITICAL: GROQ_API_KEY is not configured on the server.");
//         // This is a server configuration issue, so a 500 error is appropriate.
//         throw new ApiError(500, "The AI service is not configured correctly on the server.");
//     }

//     // --- 3. Construct the message payload for the AI ---
//     // The system prompt guides the AI's personality, tone, and response format.
//     const systemPrompt = {
//         role: "system",
//         content: `You are NyayaSaathi, a friendly, empathetic, and highly knowledgeable AI legal assistant for Rural India. Your primary goal is to provide clear, simple, and actionable legal information. Always respond in the same language as the user's query (primarily Hindi or English). Structure your answers with clear headings (using **bold text**), lists, and simple steps. Keep the language easy to understand for someone who is not a legal expert.`,
//     };

//     const messages = [
//         systemPrompt,
//         ...(Array.isArray(conversationHistory) ? conversationHistory : []), // Safely include history
//         { role: "user", content: newQuery },
//     ];
//     // ./controllers/ai.controller.js

// // ... (imports and other code) ...

// const getAIChatResponseController = asyncHandler(async (req, res) => {
//     // ... (code to validate request and construct messages) ...

//     const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//         // ... (fetch options) ...
//     });

//     if (!groqResponse.ok) {
//         // ... (error handling for non-200 responses) ...
//     }

//     const data = await groqResponse.json();
    
//     // --- THIS IS THE CRITICAL DEBUGGING STEP ---
//     // Log the entire data object received from Groq to your backend terminal.
//     console.log("Full response from Groq API:", JSON.stringify(data, null, 2));
//     // --- END OF DEBUGGING STEP ---

//     const aiResponse = data.choices[0]?.message?.content?.trim();

//     if (!aiResponse) {
//         throw new ApiError(500, "Received an empty or invalid response from the AI model.");
//     }

//     return res.status(200).json(
//         new ApiResponse(200, { response: aiResponse }, "AI chat response generated successfully.")
//     );
// });

// export { getAIChatResponseController };

//     // --- 4. Make the API call to the Groq service ---
//     // No try/catch is needed here because asyncHandler handles any exceptions.
//     const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${AI_API_KEY}`,
//         },
//         body: JSON.stringify({
//             model: "llama3-8b-8192", // Efficient and capable model
//             messages: messages,
//             temperature: 0.7, // Balances creativity and factual consistency
//         }),
//     });

//     // --- 5. Handle non-successful responses from the external Groq API ---
//     if (!groqResponse.ok) {
//         const errorData = await groqResponse.json();
//         console.error("Groq API Error:", errorData);
//         // Create an error with the status and message from the external API.
//         throw new ApiError(
//             groqResponse.status, // Use the actual status code from the Groq API
//             errorData.error?.message || "Failed to get a valid response from the AI service."
//         );
//     }

//     const data = await groqResponse.json();
//     const aiResponse = data.choices[0]?.message?.content?.trim();

//     if (!aiResponse) {
//         // If Groq gives a 200 OK but the response is empty, it's a server-side issue.
//         throw new ApiError(500, "Received an empty or invalid response from the AI model.");
//     }

//     // --- 6. Send a successful, standardized response using your ApiResponse class ---
//     return res.status(200).json(
//         new ApiResponse(
//             200,
//             { response: aiResponse }, // The data payload
//             "AI chat response generated successfully."
//         )
//     );
// });

// export { getAIChatResponseController };
// ./controllers/ai.controller.js

import fetch from "node-fetch";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { ApiError } from "../utils/ApiError.js";

/**
 * @route POST /api/ai/chat
 * @description Handles chat requests, communicates with the Groq AI API, and returns a standardized response.
 * @access Protected (Requires a valid JWT)
 */
const getAIChatResponseController = asyncHandler(async (req, res) => {
    // --- 1. Validate incoming request from the frontend ---
    const { conversationHistory, newQuery } = req.body;

    if (!newQuery || typeof newQuery !== 'string' || newQuery.trim() === '') {
        // Throw a specific error that your global error handler will catch.
        throw new ApiError(400, "Query content is required and cannot be empty.");
    }

    // --- 2. Securely get and validate the API Key from environment variables ---
    const AI_API_KEY = process.env.GROQ_API_KEY;

    if (!AI_API_KEY) {
        console.error("CRITICAL: GROQ_API_KEY is not configured on the server.");
        // This is a server configuration issue, so a 500 error is appropriate.
        throw new ApiError(500, "The AI service is not configured correctly on the server.");
    }

    // --- 3. Construct the message payload for the AI ---
    // The system prompt guides the AI's personality, tone, and response format.
    const systemPrompt = {
        role: "system",
        content: `You are NyayaSaathi, a friendly, empathetic, and highly knowledgeable AI legal assistant for Rural India. Your primary goal is to provide clear, simple, and actionable legal information. Always respond in the same language as the user's query (primarily Hindi or English). Structure your answers with clear headings (using **bold text**), lists, and simple steps. Keep the language easy to understand for someone who is not a legal expert.`,
    };

    const messages = [
        systemPrompt,
        ...(Array.isArray(conversationHistory) ? conversationHistory : []), // Safely include history
        { role: "user", content: newQuery },
    ];

    // --- 4. Make the API call to the Groq service ---
    // No try/catch is needed here because asyncHandler handles any exceptions.
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: messages,
            temperature: 0.7,
        }),
    });

    // --- 5. Handle non-successful responses from the external Groq API ---
    if (!groqResponse.ok) {
        const errorData = await groqResponse.json();
        console.error("Groq API Error:", errorData);
        throw new ApiError(
            groqResponse.status,
            errorData.error?.message || "Failed to get a valid response from the AI service."
        );
    }

    const data = await groqResponse.json();

    // --- 6. CRITICAL DEBUGGING STEP ---
    // Log the entire data object received from Groq to your backend terminal.
    // This will help you see the 'finish_reason' if content is being filtered.
    console.log("Full response from Groq API:", JSON.stringify(data, null, 2));
    // --- END OF DEBUGGING STEP ---


    // --- 7. Check for a valid response content ---
    const aiResponse = data.choices[0]?.message?.content?.trim();

    if (!aiResponse) {
        // This handles cases where the response is empty, e.g., due to content filtering.
        throw new ApiError(500, "Received an empty or invalid response from the AI model. The content may have been blocked by a safety filter.");
    }

    // --- 8. Send a successful, standardized response ---
    return res.status(200).json(
        new ApiResponse(
            200,
            { response: aiResponse },
            "AI chat response generated successfully."
        )
    );
});

export { getAIChatResponseController };