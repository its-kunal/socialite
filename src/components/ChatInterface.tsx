import { SetStateAction, useState } from 'react';

const messages = [
    { id: 1, sender: 'Alice', text: 'Hi Bob!' },
    { id: 2, sender: 'Bob', text: 'Hi Alice! How are you?' },
    { id: 3, sender: 'Alice', text: 'I\'m good, thanks. How about you?' },
    { id: 4, sender: 'Bob', text: 'I\'m doing well too, thanks for asking.' },
    { id: 5, sender: 'Bob', text: 'So, what brings you here?' },
    { id: 6, sender: 'Alice', text: 'Just wanted to chat with you, it\'s been a while!' },
];

function ChatInterface() {
    const [message, setMessage] = useState('fsdfsd');

    function handleMessageChange(e: { target: { value: SetStateAction<string>; }; }) {
        setMessage(e.target.value);
    }

    function handleSendMessage(e: { preventDefault: () => void; }) {
        e.preventDefault();
        if (message.trim() !== '') {
            messages.push({
                id: messages.length + 1,
                sender: 'Alice',
                text: message.trim(),
            });
            setMessage('');
        }
    }

    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center max-h-full">
            <div className="overflow-y-scroll">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`min-w-0 w-3/4 my-2 py-3 px-2 rounded-lg ${msg.sender === 'Alice' ? 'ml-auto bg-sky-500 text-white rounded-br-none' : 'mr-auto bg-gray-200 text-gray-700 rounded-bl-none'}`}
                    >
                        <div className="font-bold mb-1">{msg.sender}</div>
                        <div>{msg.text}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <div className="flex items-center border-t border-gray-300 py-3 justify-center ">
                    <input
                        type="text"
                        value={message}
                        onChange={handleMessageChange}
                        placeholder="Type a message..."
                        className=" px-3 py-2 mr-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-sky-500 w-2/4"
                    />
                    <button
                        type="submit"
                        className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatInterface;
