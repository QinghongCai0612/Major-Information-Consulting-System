import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: 3000,
  google_Gemini_API_key:'AIzaSyBYgEZAf5pgPGy_J3FcJRvY4ydLvtVVKRs',
  fastGPT: {
    baseURL: 'https://api.fastgpt.in/api',
    general_authorization: 'fastgpt-vai3zQWu2A82BN2TUPREkVzcCy2TXeKFHvJ9A0q93QaJ4UJoSR73qf7Wu2DBGy',
    app_authorization: 'fastgpt-vU22jRmXjggVqPkp6mrF075HWcX8jgy44GvH3mAHPjhYYxTSQmQ8HA4X2v',
    datasetId: '67ede122fff7005e2123c0e7'
  }
};

export default config;
