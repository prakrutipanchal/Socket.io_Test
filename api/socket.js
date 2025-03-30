import { Server } from 'socket.io';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('Starting Socket.IO...');
    const io = new Server(res.socket.server, {
      path: '/socket.io/',
      cors: { origin: '*' }
    });

    io.on('connection', (socket) => {
      socket.emit('welcome', 'Connected to Vercel!');
    });

    res.socket.server.io = io;
  }
  res.end();
}