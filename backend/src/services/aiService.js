// aiService.js
import { GoogleGenAI } from "@google/genai";
import config from '../../config/config.js';

const ai = new GoogleGenAI({ apiKey: config.google_Gemini_API_key });

/**
 * Checks if the provided question is related to professional consulting.
 * The function uses the Google Gemini API to generate a response.
 * It prompts the model to answer "true" or "false" only.
 *
 * @param {string} question - The question submitted by the user.
 * @returns {Promise<boolean>} - Returns true if the question is related to professional consulting; otherwise false.
 */
export const checkQuestion = async (question) => {
  try {
    const prompt = `Determine if the following question is related to a professional field. Answer with "true" or "false" only.
Question: ${question}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const answer = response.text.trim().toLowerCase();
    // Check if the answer explicitly contains "true" or "false"
    if (answer.includes("true")) {
      return true;
    } else if (answer.includes("false")) {
      return false;
    }
    // Fallback: if the response is ambiguous, return false.
    return false;
  } catch (error) {
    console.error("Error in checkQuestion:", error);
    // Fallback to false in case of an error.
    return false;
  }
};

export default {
  checkQuestion
};
