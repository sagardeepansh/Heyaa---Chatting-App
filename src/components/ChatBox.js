
export default function ChatBox({ messages, onDelete  }) {
    return (
        messages.map((msg,index) => (
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
          ))
    );
}
