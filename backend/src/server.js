// src/server.js
import app from './app.js';
import config from '../config/config.js';
import logger from './utils/logger.js';

app.listen(config.port, () => {
  logger.info(`Server started on port ${config.port}`);
});
