import WebSocket from 'ws'; // Use import for better compatibility

// const wss = new WebSocket.Server({
//   noServer: true,
// });

// wss.on('connection', (ws, req) => {
//   const { chatId } = req.url ? new URL(req.url, `http://${req.headers.host}`).searchParams : {};
//   if (!chatId) {
//     ws.send('Chat ID is required');
//     ws.close();
//     return;
//   }

//   console.log(`New connection for chatId: ${chatId}`);

//   // Send a welcome message to the client
//   ws.send(JSON.stringify({ message: 'Connected successfully!' }));

//   // Handle messages from the client
//   ws.on('message', (message) => {
//     console.log(`Received message: ${message}`);
//     ws.send(JSON.stringify({ message: `Received: ${message}` }));
//   });

//   // Handle WebSocket close
//   ws.on('close', () => {
//     console.log(`Connection closed for chatId: ${chatId}`);
//   });
// });

export async function GET(req) {
  if (req.method === 'GET') {
    const { socket } = res;
    socket.server.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });
    return new Response('WebSocket server running', { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
  }
}
