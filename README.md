# Heyaa - Real-Time Chatting App

Welcome to **Heyaa**, a real-time chatting application built using **Next.js** for the frontend and **Node.js** for the backend, powered by WebSocket technology. Heyaa ensures privacy and security by not storing any chat information on the server. Chat in real-time with your friends without worrying about your data being saved!

## Features

- **Real-Time Communication**: Utilizes WebSocket for instant messaging.
- **No Data Storage**: Messages are not saved on the server, ensuring privacy.
- **User-Friendly Interface**: Simple and intuitive UI built with Next.js.
- **Multi-User Support**: Multiple users can join and chat simultaneously.
- **Lightweight**: Minimal server-side processing, as no data is stored.

## Technologies Used

- **Frontend**: Next.js (React-based framework)
- **Backend**: Node.js with WebSocket
- **WebSocket**: For real-time, bidirectional communication
- **Express.js**: Web framework for Node.js
- **HTML/CSS/JavaScript**: Frontend development

## How It Works

1. **Connection Establishment**: Users connect to the WebSocket server hosted on the Node.js backend.
2. **Real-Time Messaging**: Messages are sent and received instantly via WebSocket.
3. **No Persistence**: Messages are not stored on the server; they exist only during the session.
4. **Disconnection**: Once a user disconnects, the chat session ends, and all messages are discarded.

## Installation

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (Node Package Manager)

### Steps

**1.** Clone the Repository:

```bash
git clone https://github.com/yourusername/heyaa-chatting-app.git
```
```bash
cd heyaa-chatting-app
```
**2.** Install Dependencies:
```bash
npm install
```
**3.** Start the Application:
To run the project, use the following commands:
```bash
npm run dev        # Starts the Next.js development server
npm run build      # Builds the application for production
npm run start      # Starts the Next.js server in production mode
npm run websocket  # Starts the WebSocket server
```
**4.** Access the Application by opening your browser and navigating to `http://localhost:3000`.

## Usage

1. **Open the Application**: Launch the application in your browser.
2. **Join the Chat**: Enter a username and join the chat room.
3. **Start Chatting**: Send and receive messages in real-time.
4. **Leave the Chat**: Close the browser tab or window to exit the chat.

## Folder Structure
```bash
heyaa-chatting-app/
├── backend/               # Node.js server with WebSocket logic
│   ├── server.js          # WebSocket server setup
│   └── package.json       # Backend dependencies
├── frontend/              # Next.js frontend application
│   ├── src/               # Main source code
│   │   ├── app/           # Application logic
│   │   │   ├── api/       # API handlers (authentication, users, WebSocket)
│   │   │   ├── auth/      # Authentication pages
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # Global state management (React Context API)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── styles/        # CSS files
│   │   ├── utils/         # Helper functions
│   │   ├── globals.css    # Global styles
│   │   ├── layout.js      # Layout wrapper
│   │   ├── page.js        # Main entry point
│   ├── public/            # Static assets (favicon, images)
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

## Contributing

Contributions are welcome! Follow these steps:

1. **Fork the repository.**
2. **Create a new branch**: `git checkout -b feature/YourFeatureName`
3. **Commit your changes**: `git commit -m 'Add some feature'`
4. **Push to the branch**: `git push origin feature/YourFeatureName`
5. **Open a pull request**

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Thanks to the **WebSocket** protocol for enabling real-time communication.
- Inspiration from various open-source chat applications.

## Contact

For any questions or suggestions, feel free to reach out:

- **Deepansh Sagar**
- **Email**: [connectdeepansh@gmail.com](mailto:connectdeepansh@gmail.com)
- **GitHub**: - [@sagardeepansh](https://www.github.com/sagardeepansh)

Enjoy chatting in real-time with complete privacy on **Heyaa**! 🚀
