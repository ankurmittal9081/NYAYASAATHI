import apiClient from '../api/axiosConfig';

/**
 * The single source for all AI interactions in the NyayaSaathi application.
 */

// -----------------------------------------------------------------------------
// I. GENERATIVE AI CHAT (LEGAL HELP)
// -----------------------------------------------------------------------------

/**
 * Communicates with the backend's Groq/Llama3 controller to get intelligent legal help.
 * @param {Array<object>} conversationHistory - The history of the chat [{ role: 'user'/'assistant', content: '...' }].
 * @param {string} newQuery - The user's latest question.
 * @returns {Promise<string>} - The AI's response text.
 */
const getGenerativeAIChatResponse = async (conversationHistory, newQuery) => {
  try {
    // This matches the body structure expected by your `ai.controller.js`
    const { data } = await apiClient.post('/ai/chat', {
      conversationHistory,
      newQuery,
    });
    
    if (!data.response) {
      throw new Error("Received an empty response from the AI.");
    }

    return data.response;
  } catch (error) {
    console.error("AI Service Error:", error);
    const errorMessage = error.response?.data?.error || "Sorry, I couldn't connect to the AI assistant right now. Please check the server connection.";
    throw new Error(errorMessage);
  }
};


// -----------------------------------------------------------------------------
// II. FORM DATA PARSING FROM VOICE
// -----------------------------------------------------------------------------

const issueTypesEnum = [
    "Aadhaar Issue", "Pension Issue", "Land Dispute", "Court Summon", 
    "Certificate Missing", "Fraud Case", "Other"
];

/**
 * A more robust NLP parser to extract structured data from a user's voice command.
 * @param {string} text - The transcribed text from the microphone.
 * @returns {object} - An object with extracted data like { issueType, description, documentType }.
 */
const parseFormDataFromText = (text) => {
    const lowerText = text.toLowerCase();
    const data = {};

    // Define keywords and what they map to
    const keywords = {
        issueType: ['type is', 'category is', 'issue is', 'about'],
        description: ['description is', 'details are', 'problem is'],
        documentType: ['document type is', 'document is', 'file is'],
    };

    // Function to extract value after a keyword
    const extractValue = (targetKeywords) => {
        for (const keyword of targetKeywords) {
            if (lowerText.includes(keyword)) {
                // Get the text after the keyword, and stop at the next potential keyword like "and"
                return lowerText.split(keyword)[1].trim().split(/ and | with /)[0];
            }
        }
        return null;
    };
    
    const extractedIssueType = extractValue(keywords.issueType);
    if (extractedIssueType) {
        // Find the correctly cased enum value to prevent validation errors
        const matchedType = issueTypesEnum.find(t => t.toLowerCase() === extractedIssueType.toLowerCase().trim());
        data.issueType = matchedType || "Other";
    }
    
    const extractedDocType = extractValue(keywords.documentType);
    if (extractedDocType) {
        data.documentType = extractedDocType.charAt(0).toUpperCase() + extractedDocType.slice(1);
    }
    
    const extractedDescription = extractValue(keywords.description);
    if (extractedDescription) {
        data.description = extractedDescription.charAt(0).toUpperCase() + extractedDescription.slice(1);
    }
    
    // If no specific keywords are found, assume the whole text is a description for an issue
    if (!extractedDescription && !extractedIssueType && !extractedDocType) {
        data.description = text.charAt(0).toUpperCase() + text.slice(1);
    }

    return data;
}

export const aiService = {
  getChatResponse: getGenerativeAIChatResponse,
  parseFormDataFromText,
};