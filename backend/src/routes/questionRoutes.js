import express from 'express';
import questionController from '../controllers/questionController.js';

const router = express.Router();

/**
 * POST http://localhost:3000/api/question/ask
 * - Request Headers: 
 * Content-Type: application/json
 * - Request Body:
 * {
 *   "question": "What are the best consulting practices?"
 * }
 */ 
router.post('/ask', questionController.handleQuestion);

export default router;
