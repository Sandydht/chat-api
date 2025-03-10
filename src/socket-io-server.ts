import { Server as SocketIOServer } from 'socket.io';
import { SOCKET_IO } from "./constants/socket-io.constants";

const socketIoServer = (io: SocketIOServer) => {
  io.on(SOCKET_IO.CONNECTION, (socket) => {
    console.log('a user connected');

    socket.on(SOCKET_IO.MESSAGE, (payload: any) => {
      console.log('Message from client:', payload);
      socket.emit(SOCKET_IO.MESSAGE, 'Hello from server');
    });

    socket.on(SOCKET_IO.DISCONNECT, () => {
      console.log('A user disconnected');
    });

    socket.on(SOCKET_IO.CONNECT_ERROR, (error: Error) => {
      console.log('Connection error:', error.message);
    });
  });
};

export default socketIoServer;
