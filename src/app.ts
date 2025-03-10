import dotenv from 'dotenv';
dotenv.config();

import express, { Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api.routes';
import connectDB from './db';
import session from 'express-session';
import passport, { use } from 'passport';
import passportConfig from './configs/passport.configs';
import { UserData } from './models/user-controller.models';
import cookieParser from 'cookie-parser';
import User from './db/models/user.models';
import { ExtendedError, Server, Socket } from 'socket.io';
import { createServer } from 'node:http';
import socketIoServer from './socket-io-server';
import AuthenticationError from './exceptions/commons/AuthenticationError';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
const JWTSecretKey: string = process.env.JWT_SECRET_KEY || 'secret';

connectDB();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: JWTSecretKey,
  resave: false,
  saveUninitialized: false
}));

passportConfig();
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((id: string, done) => {
  done(null, id);
});

io.use((socket: Socket, next: (err?: ExtendedError) => void) => {
  const token = socket.handshake.query?.token;
  if (!token) return next(new AuthenticationError('Unauthorized'));
  return next();
});

socketIoServer(io);

app.get('/', (_, res: Response) => {
  res.json({ status: 'OK', message: 'Welcome to Chat App' });
});
app.get('/unauthorized', (_, res: Response) => {
  res.status(401).json({ status: 'Error', message: 'Unauthorized' });
});
app.use('/chat-app/api', apiRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});