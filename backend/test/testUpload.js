// testUpload.js
import crawlerService from '../src/services/crawlerService.js';
import fastGPTService from '../src/services/fastGPTService.js';

const testUpload = async () => {
  try {
    // 使用特定查询字符串爬取 Reddit 帖子
    const query = "How to prepare for a cs interview"; // 可根据需求修改查询关键字
    const posts = await crawlerService.crawl(query);

    if (!posts || posts.length === 0) {
      console.error("未能爬取到任何帖子");
      return "失败";
    }

    // 取第一条爬取到的帖子，构造上传文件数据
    const post = posts[0];
    const fileData = {
      title: post.title || "无标题",
      // 尽可能选取帖子内容，如果没有则用 URL 作为内容
      content: post.selftext || post.url || "无内容"
    };

    // 调用 fastGPTService.uploadFile 方法上传文件数据
    const response = await fastGPTService.uploadFile(fileData);

    if (response && response.success !== false) {
      console.log("上传成功:", response);
      return response;
    } else {
      console.error("上传失败:", response);
      return "失败";
    }
  } catch (error) {
    console.error("上传测试过程中出错:", error);
    return "失败";
  }
};

// 执行测试
testUpload();
