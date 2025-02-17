

import jwt from 'jsonwebtoken';
import React, { useState, useEffect } from 'react';

export default function ChatBox({ messages, onDelete }) {
  const [decoded, setDecoded] = useState(null);
  const userId = decoded?._id;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt.decode(token);
        setDecoded(decodedToken);
      }
    }
  }, []);

  // console.log("messages",messages);
  return (
    messages.map((msg, index) => (
      <React.Fragment key={index}>
        {userId == msg?.userId ? (
          <div key={index} className="mb-4 text-right">
            <div className="text-sm text-gray-500">You</div>
            <div className="inline-block bg-purple-700 text-white rounded-lg p-2 mt-1">
              {msg.content}
            </div>
            <small className="text-xs block hover:text-gray-400 text-gray-100">{new Date(msg.timestamp).toLocaleTimeString()}</small>
            <button onClick={() => onDelete(msg.id)} >
              Delete {msg.id}
            </button>
          </div>

        ) : (
          <div className="mb-4">
            <div className="text-sm text-gray-500">{msg.sender}</div>
            <div className="inline-block bg-gray-200 text-gray-800 rounded-lg p-2 mt-1">
              {msg.content}
            </div>
            <small className="text-xs block hover:text-gray-400 text-gray-100">{new Date(msg.timestamp).toLocaleTimeString()}</small>
            <button onClick={() => onDelete(msg.id)} >
              Delete {msg.id}
            </button>
          </div>
        )}
      </React.Fragment>
    ))
  );
}
