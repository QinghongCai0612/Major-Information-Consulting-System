// src/app.js
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// Enable CORS for requests from http://localhost:3001
app.use(cors({
  origin: 'http://localhost:3001'
}));

app.use(express.json());
app.use('/api', routes);

export default app;
