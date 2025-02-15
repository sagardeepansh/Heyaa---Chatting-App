// app/api/websocket/route.js
import { WebSocketServer } from 'ws';

export const dynamic = 'force-dynamic'; // Ensure this route is dynamically handled

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

export default function handler(req, res) {
  if (!req.socket.server.wss) {
    req.socket.server.wss = wss;
  }

  res.socket.server = req.socket.server;
  res.end();
}