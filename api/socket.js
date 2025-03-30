import { Server } from 'socket.io';

// Workaround for Vercel Serverless cold starts
let io;

export default function handler(req, res) {
  if (!io) {
    console.log('Initializing Socket.IO');
    const httpServer = res.socket.server;
    
    io = new Server(httpServer, {
      path: '/socket.io/',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      console.log('New connection:', socket.id);
      socket.emit('welcome', 'Connected to Vercel!');
    });

    // Attach to Vercel's server
    httpServer.io = io;
  }
  
  // End HTTP request (keep WebSocket open)
  res.end();
}