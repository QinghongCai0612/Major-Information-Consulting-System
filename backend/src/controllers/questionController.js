// questionController.js
import aiService from '../services/aiService.js';
import crawlerService from '../services/crawlerService.js';
import fastGPTService from '../services/fastGPTService.js';

export const handleQuestion = async (req, res, next) => {
  try {
    const { question, chatId } = req.body;
    
    // 1. Call the AI module to check if the question is related to consulting
    const isConsultingRelated = await aiService.checkQuestion(question);
    if (!isConsultingRelated) {
      return res.json({ 
        success: true, 
        data: 'This question does not seem to be related to professional information. Please ask something else.' 
      });
    }
    
    // 2. Use the crawler service to fetch related information
    const crawlData = await crawlerService.crawl(question);
    
    // 3. Upload the crawled data to FastGPT's knowledge base (simulate API upload)
    const formatPost = (post) => {
      return (
        "Title: " + post.title + "\n" +
        "Content: " + (post.selftext ? post.selftext : "No text content.") + "\n" +
        "URL: " + post.url
      );
    };
    
    for (const post of crawlData) {
      const formattedText = formatPost(post);
      await fastGPTService.uploadFile(formattedText, question);
    }
    
    // 4. Submit the question to FastGPT for Q&A
    const fastGPTQuestionResult = await fastGPTService.askQuestion(question, chatId);
    const answerContent = fastGPTQuestionResult?.choices?.[0]?.message?.content || "No content returned.";

    res.json({
      success: true,
      data: answerContent
    });
  } catch (error) {
    next(error);
  }
};

export default {
  handleQuestion
};
