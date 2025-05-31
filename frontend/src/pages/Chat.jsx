import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../socket-cn';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const { sender, receiver } = useParams();

  useEffect(() => {
    socket.emit('join', sender);

    socket.emit('get_messages', { from: sender, to: receiver });

    socket.on('chat_history', messages => {
      setChat(messages);
    });

    socket.on('private_message', data => {
      setChat(prev => [...prev, data]);
    });

    return () => {
      socket.off('private_message');
    };
  }, [sender, receiver]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = { from: sender, to: receiver, message };
    socket.emit('private_message', msgData);
    msgData.from = sender;
    msgData.to = receiver;
    setChat(prev => [...prev, msgData]);
    setMessage('');
  };

  return (
    <div className="h-screen bg-[#0a0a12] text-[#f0f0f0] p-4 flex flex-col">
      <h1 className="text-xl text-cyan-400 font-semibold mb-2">
        Chat with User {receiver}
      </h1>

      <div className="flex-1 overflow-y-auto bg-[#1a1a2e] rounded-xl p-3 mb-3">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 max-w-[70%] px-4 py-2 rounded-lg text-sm ${
              msg.from === sender
                ? 'bg-cyan-500 ml-auto text-black text-right'
                : 'bg-gray-700 text-white text-left'
            }`}
          >
            <div className="text-xs opacity-80 mb-1">
              From: {msg.from} <br />
              To: {msg.to ?? receiver}
            </div>
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
