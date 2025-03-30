import { Server } from 'socket.io';
export const config = { runtime: 'edge' }; // Add this line at the top

import { Server } from 'socket.io';
// Persistent server instance
let io;

export default async function handler(req, res) {
  // Initialize only once
  if (!io) {
    console.log('Initializing Socket.IO server');
    const httpServer = res.socket.server;
    
    io = new Server(httpServer, {
      path: '/api/socket.io', // Critical path change
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
      socket.emit('status', 'Connected to Vercel!');
    });

    // Store instance
    httpServer.io = io;
  }

  // End HTTP request but keep WebSocket alive
  res.end();
}