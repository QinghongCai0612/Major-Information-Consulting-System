// testFirstThreeSteps.js
import aiService from '../src/services/aiService.js';
import crawlerService from '../src/services/crawlerService.js';
import fastGPTService from '../src/services/fastGPTService.js';

const testSteps = async () => {
  try {
    // Test question - modify as needed
    const question = "What are the latest trends in consulting?";
    console.log("Test question:", question);

    // 1. Check if the question is related to consulting
    const isConsultingRelated = await aiService.checkQuestion(question);
    console.log("Step 1 - Is the question consulting-related:", isConsultingRelated);

    if (!isConsultingRelated) {
      console.log("The question does not meet consulting requirements. Test terminated.");
      return;
    }

    // 2. Use the crawler service to fetch related information
    const crawlData = await crawlerService.crawl(question);
    console.log("Step 2 - Data fetched from crawler");

    // Helper function: Format a single post as text
    const formatPost = (post) => {
      return (
        "Title: " + post.title + "\n" +
        "Content: " + (post.selftext ? post.selftext : "No text content.") + "\n" +
        "URL: " + post.url
      );
    };

    // 3. Loop through and upload each post
    for (const post of crawlData) {
      const formattedText = formatPost(post);
      const uploadResult = await fastGPTService.uploadFile(formattedText, question);
      console.log("Step 3 - Upload result:", uploadResult);
    }

    // 4. Submit the question to the FastGPT chat API and extract the answer content
    const fastGPTResponse = await fastGPTService.askQuestion(question);
    const answerContent = fastGPTResponse?.choices?.[0]?.message?.content || "No content returned.";
    console.log("Step 4 - FastGPT askQuestion response content:", answerContent);
  } catch (error) {
    console.error("Error during test:", error);
  }
};

// Execute the test
testSteps();
