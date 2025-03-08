require('dotenv').config();
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Welcome Chat API</h1>');
});

io.on('connection', () => {
  console.log('a user connected');
});

server.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});
