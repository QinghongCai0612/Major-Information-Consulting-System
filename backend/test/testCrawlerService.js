// testCrawlerService.js
import { crawl } from '../src/services/crawlerService.js';

async function testCrawl() {
  const query = "how to prepare cs interview";
  const posts = await crawl(query);
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      console.log(`Post ${index + 1}:`);
      console.log("Title: " + post.title);
      console.log("Content: " + (post.selftext ? post.selftext : "No text content."));
      console.log("URL: " + post.url);
      console.log("----------------------------------------------------");
    });
  } else {
    console.log("No posts found for query:", query);
  }
}

testCrawl();
