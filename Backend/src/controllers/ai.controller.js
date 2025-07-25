import fetch from "node-fetch";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @route POST /api/ai/chat
 * @description Handles chat requests from the frontend, communicates with the Groq AI API, and returns the response.
 * @access Protected (requires valid JWT)
 */
const getAIChatResponseController = asyncHandler(async (req, res) => {
  // 1. Get conversation history and the new query from the frontend request
  const { conversationHistory, newQuery } = req.body;

  if (!newQuery) {
    return res.status(400).json({ success: false, error: "Query is required." });
  }

  // 2. Get the secret API key from your backend environment variables
  const AI_API_KEY = process.env.GROQ_API_KEY;

  // --- ESSENTIAL DEBUGGING STEP ---
  // This log confirms if the API key is accessible within this controller when the route is hit.
  // Check your backend terminal for this message when you use the AI assistant.
  console.log("GROQ_API_KEY inside controller:", AI_API_KEY ? "Key Loaded Successfully" : "ERROR: KEY IS MISSING!");

  if (!AI_API_KEY) {
    console.error("CRITICAL: GROQ_API_KEY is not defined in the environment.");
    return res.status(500).json({ success: false, error: "AI service is not configured correctly on the server." });
  }

  // 3. Define the system prompt to guide the AI's behavior
  const systemPrompt = {
    role: "system",
    content: `You are NyayaSaathi, a friendly, empathetic, and highly knowledgeable AI legal assistant for Rural India. Your primary goal is to provide clear, simple, and actionable legal information. Always respond in the same language as the user's query (primarily Hindi or English). Structure your answers with clear headings (using **bold text**), lists, and simple steps. Keep the language easy to understand for someone who is not a legal expert.`,
  };

  // 4. Construct the full message payload for the AI
  const messages = [
    systemPrompt,
    ...(conversationHistory || []), // Safely include history, even if it's empty
    { role: "user", content: newQuery },
  ];

  try {
    // 5. Make the API call to the Groq service
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // Using the specified efficient model
        messages: messages,
        temperature: 0.7, // A good balance between creativity and determinism
      }),
    });

    // 6. Handle non-successful responses from the Groq API
    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      console.error("Groq API Error Response:", errorData); // Log the full error for debugging
      throw new Error(errorData.error?.message || `Groq API responded with status ${groqResponse.status}`);
    }

    const data = await groqResponse.json();
    const aiResponse = data.choices[0]?.message?.content.trim();

    if (!aiResponse) {
        throw new Error("Received an empty response from the AI model.");
    }

    // 7. Send the AI's successful response back to the frontend
    res.status(200).json({ success: true, response: aiResponse });

  } catch (error) {
    // 8. Catch any errors during the fetch process or from the checks above
    console.error("Error communicating with Groq API:", error);
    res.status(500).json({ success: false, error: `An error occurred while communicating with the AI service. Please try again later.` });
  }
});

export { getAIChatResponseController };