"use client"
import React, { useState, useEffect } from 'react';
import { useIndexedDB } from "@/hooks/useIndexedDB";
import ChatBox from "@/components/ChatBox";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import jwt from 'jsonwebtoken';
import { getUserById } from '@/utils/api';
import { useSearchParams } from 'next/navigation';


export default function chat() {

    const searchParams = useSearchParams();

    // const decoded = jwt.decode(localStorage.getItem('token'));
    const [chatMessage, setChatMessage] = useState('adsd');
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [decoded, setDecoded] = useState(null);

    // const chatId = `${decoded?._id}:12345`;
    const userId = decoded?._id;
    const friendId = searchParams.get('userId');
    // console.log("router?.query",router)

    const findChatId = (userId, friendId) => {
        const ids = [userId, friendId].sort();
        return ids.join(':');
    }

    const chatId = findChatId(userId, friendId);
    const { messages, addMessage, deleteMessage, loading } = useIndexedDB(chatId);

    const [input, setInput] = useState("");

    const [friendDetails, setFriendDetails] = useState([]);

    const fetchUsers = async () => {
        try {
            const details = await getUserById(friendId);
            setFriendDetails(details?.user);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [friendId]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents adding a new line in the textarea
            handleSendMessage();
        }
    };

    const handleSendMessage = () => {
        if (input.trim()) {
            addMessage({
                chatId,
                userId,
                content: input,
                timestamp: new Date().toISOString(),
            });
            if (socket && socket.readyState === WebSocket.OPEN) {
                // ws.send();
                socket.send(JSON.stringify({ chatId, userId, sender: decoded?.name, text: input, timestamp: new Date().toISOString() })); // Send the message to the server
            }
            setInput("");
        }
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwt.decode(token);
                setDecoded(decodedToken);
            }
        }
    }, []);

    useEffect(() => {
        const connectWebSocket = () => {
            const ws = new WebSocket(`ws://192.168.1.23:8080/?chatId=${chatId}`);
    
            ws.onopen = () => {
                console.log('Connected to chat:', chatId);
                setSocket(ws);
            };
    
            ws.onmessage = (event) => {
                setMessage(event.data);
                const parsedData = JSON.parse(event.data);
                addMessage({
                    chatId: parsedData?.chatId,
                    userId: parsedData?.userId,
                    content: parsedData?.text,
                    timestamp: parsedData?.timestamp,
                    sender: parsedData?.sender,
                });
                console.log(parsedData);
            };
    
            ws.onclose = () => {
                console.log('WebSocket connection closed. Reconnecting...');
                setTimeout(() => {
                    if (userId && friendId) {
                        connectWebSocket(); // Reconnect after 2 seconds
                    }
                }, 2000);
            };
    
            ws.onerror = (error) => {
                console.log('WebSocket error:', error);
                ws.close(); // Close the WebSocket in case of error to trigger onclose and attempt reconnection
            };
    
            return ws;
        };
    
        const ws = connectWebSocket();
    
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [chatId]);



    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html className="h-full bg-gray-100">
        <body className="h-full">
        ```
      */}
            <div className="min-h-full">

                <Header />
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Chats</h1>
                    </div>
                </header>
                <main>
                    <div className="md:container md:mx-auto">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="md:col-span-3 bg-gray-100 p-2	rounded-2xl ">
                                <Sidebar />
                            </div>
                            <div className="md:col-span-9 bg-gray-100 p-8	rounded-2xl ">
                                <div style={{ minHeight: "500px" }} className="flex flex-col h-dvh	max-h-96 rounded-2xl">
                                    <div className="bg-purple-700 text-white p-4 flex items-center  rounded-2xl">
                                        <h1 className="text-xl font-semibold">{friendDetails?.fullname}</h1>
                                    </div>

                                    <div className="flex-grow p-4 overflow-y-auto">
                                        {/* <div className="mb-4">
                      <div className="text-sm text-gray-500">Deepansh Sagar</div>
                      <div className="inline-block bg-gray-200 text-gray-800 rounded-lg p-2 mt-1">
                        Hello! How are you?
                      </div>
                    </div> */}
                                        {/* {messages.map((msg,index) => (
                      <div key={index} className="mb-4 text-right">
                        <div className="text-sm text-gray-500">You</div>
                        <div className="inline-block bg-purple-700 text-white rounded-lg p-2 mt-1">
                          {msg.content}
                        </div>
                        <small className="text-xs block hover:text-gray-400 text-gray-100">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                        <button onClick={() => deleteMessage(msg.id)} >
                          Delete {msg.id}
                        </button>
                      </div>
                    ))} */}
                                        <ChatBox messages={messages} onDelete={deleteMessage} />
                                        {/* <div className="mb-4 text-right">
                      <div className="text-sm text-gray-500">You</div>
                      <div className="inline-block bg-purple-700 text-white rounded-lg p-2 mt-1">
                        I'm good, thanks! How about you?
                      </div>
                    </div> */}
                                    </div>

                                    <div className="bg-gray-200 p-4 flex items-center">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type your message..."
                                            className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button onClick={handleSendMessage} className="ml-2 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                                            Send
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </>
    )
}
