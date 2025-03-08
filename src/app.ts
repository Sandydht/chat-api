import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api.routes';
import { Response } from 'express';
import connectDB from './db';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './configs/passport.configs';

const app = express();
const JWTSecretKey: string = process.env.JWT_SECRET_KEY || 'secret';

connectDB();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(session({
  secret: JWTSecretKey,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.get('/', (_, res: Response) => {
  res.json({ status: 'OK', message: 'Welcome to Chat App' });
});
app.get('/unauthorized', (_, res: Response) => {
  res.status(401).json({ status: 'Error', message: 'Unauthorized' });
});
app.use('/chat-app/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});