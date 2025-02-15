const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

// Store connected users by chatId
const chatRooms = new Map();

wss.on("connection", (ws) => {
  console.log("User connected");

  ws.on("message", (message) => {
    let data;
    try {
      data = JSON.parse(message);
    } catch (error) {
      console.error("Invalid JSON received:", message);
      return;
    }
  
    const { chatId, userId, sender, text, timestamp } = data;
    if (!chatId || !sender || !text) {
      console.error("Missing required fields in message:", data);
      return;
    }
  
    console.log(`Message from ${sender} in chat ${chatId}: ${text}`);
  
    // Store user in the correct chat room
    if (!chatRooms.has(chatId)) {
      chatRooms.set(chatId, new Set());
    }
    chatRooms.get(chatId).add(ws); // Add user to room
  
    // Send the message to everyone in the chat room (except sender)
    chatRooms.get(chatId).forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ sender, text, chatId, userId, timestamp }));
      }
    });
  });

  ws.on("close", () => {
    console.log("User disconnected");

    // Remove the user from all chat rooms
    chatRooms.forEach((clients, chatId) => {
      clients.delete(ws);
      if (clients.size === 0) {
        chatRooms.delete(chatId); // Remove empty rooms
      }
    });
  });
});

console.log("✅ WebSocket Server is running on ws://localhost:8080");
