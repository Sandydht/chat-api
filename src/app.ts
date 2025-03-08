import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api.routes';
import { Response } from 'express';
import connectDB from './db';

const app = express();

connectDB();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (_, res: Response) => {
  res.json({ status: 'OK', message: 'Welcome to Chat App' });
});
app.use('/chat-app/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});