// fastGPTService.js
import config from '../../config/config.js';

/**
 * Upload crawled content to the knowledge base (using the knowledge base API to create a plain text collection)
 *
 * @param {Object} fileData - File data object, sample structure:
 * {
 *   title: 'File Title',
 *   content: 'File Content'
 * }
 * @param {string} question - User's question
 * @returns {Promise<Object>} - Returns the API response data
 */
export const uploadFile = async (fileData, question) => {
  try {
    const payload = {
      text: fileData,                              // The text content to be uploaded
      datasetId: config.fastGPT.datasetId,         // The knowledge base ID
      parentId: null,                              // Default upload to the root directory
      name: question,                              // Collection name
      trainingType: "qa",                          // Data processing type: qa (generate Q&A pairs)
      chunkSettingMode: "auto",                    // Use system default splitting parameters
      qaPrompt: "",                                // Splitting prompt in qa mode, currently empty
      metadata: {}                                 // Optional additional metadata
    };

    const response = await fetch(`${config.fastGPT.baseURL}/core/dataset/collection/create/text`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.fastGPT.general_authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading file to the knowledge base:", error);
    return { success: false, message: 'Upload failed' };
  }
};

/**
 * Submit a question to the FastGPT chat API
 *
 * @param {string} question - User's question
 * @returns {Promise<Object>} - Returns the response data from FastGPT
 */
export const askQuestion = async (question, chatId) => {
  try {
    const messages = [
      {
        role: "user",
        content: question
      }
    ];

    const body = {
      chatId: chatId,
      stream: false,
      detail: false,
      responseChatItemId: Date.now().toString(),
      variables: {},
      messages
    };

    const response = await fetch(`${config.fastGPT.baseURL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.fastGPT.app_authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("askQuestion error:", error);
    return { id: 'mock_question_id' };
  }
};


export default {
  uploadFile,
  askQuestion
};
