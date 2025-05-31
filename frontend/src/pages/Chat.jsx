import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function ChatPage({ userId, targetUserId }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit('join', userId);

    socket.on('private_message', data => {
      setChat(prev => [...prev, data]);
    });

    return () => {
      socket.off('private_message');
    };
  }, [userId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = { from: userId, to: targetUserId, message };
    socket.emit('private_message', msgData);
    setChat(prev => [...prev, { from: userId, message }]);
    setMessage('');
  };

  return (
    <div className="h-screen bg-[#0a0a12] text-[#f0f0f0] p-4 flex flex-col">
      <h1 className="text-xl text-cyan-400 font-semibold mb-2">
        Chat with User
      </h1>

      <div className="flex-1 overflow-y-auto bg-[#1a1a2e] rounded-xl p-3 mb-3">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 max-w-[70%] px-4 py-2 rounded-lg text-sm ${
              msg.from === userId
                ? 'bg-cyan-500 ml-auto text-black'
                : 'bg-gray-700 text-white'
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 bg-[#2a2a3e] text-white p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-cyan-500 text-black px-4 py-2.5 rounded-xl hover:bg-cyan-400 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
