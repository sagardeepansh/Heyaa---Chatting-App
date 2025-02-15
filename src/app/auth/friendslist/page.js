
import React, { useState, useEffect } from 'react';
import { useIndexedDB } from "@/hooks/useIndexedDB";
import ChatBox from "@/components/ChatBox";
import Header from "@/components/Header";
import jwt from 'jsonwebtoken';


export default function Dashboard() {
 

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
                <nav >
                  <ul className="flex flex-col space-y-2 p-4">
                    <li>
                      <a href="#" className="block p-3 rounded-md text-xl font-semibold	 text-gray-700 hover:bg-gray-200">Home</a>
                    </li>
                    <li>
                      <a href="#" className="block p-3 rounded-md text-xl font-semibold	 text-white bg-purple-700">My Friends</a>
                    </li>
                    <li>
                      <a href="#" className="block p-3 rounded-md text-xl font-semibold	 text-gray-700 hover:bg-gray-200">Chats</a>
                    </li>
                    <li>
                      <a href="#" className="block p-3 rounded-md text-xl font-semibold	 text-gray-700 hover:bg-gray-200">Help</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="md:col-span-9 bg-gray-100 p-8	rounded-2xl ">
                <div style={{ minHeight: "500px" }} className="flex flex-col h-dvh	max-h-96 rounded-2xl">
                  <div className="bg-purple-700 text-white p-4 flex items-center  rounded-2xl">
                    <h1 className="text-xl font-semibold">Deepansh Sagar</h1>
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
                    {/* <ChatBox messages={messages} onDelete={deleteMessage} /> */}
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
