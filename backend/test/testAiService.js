// testAiService.js
import { checkQuestion } from "../src/services/aiService.js";

async function testAiService() {
  const consultingQuestion = "What strategies can help improve business consulting services?";
  const nonConsultingQuestion = "What's the weather like in New York today?";

  console.log("Testing consulting-related question...");
  const result1 = await checkQuestion(consultingQuestion);
  console.log(`Result for consulting question: ${result1}`);  // Expected: true

  console.log("Testing non-consulting-related question...");
  const result2 = await checkQuestion(nonConsultingQuestion);
  console.log(`Result for non-consulting question: ${result2}`);  // Expected: false
}

testAiService();
