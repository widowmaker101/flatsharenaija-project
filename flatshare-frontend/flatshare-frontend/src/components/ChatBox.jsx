import { useState, useEffect } from 'react'
import FileShare from './FileShare'

export default function ChatBox({ match }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    if (match) {
      const saved = JSON.parse(localStorage.getItem(`chat_${match.name}`) || "[]")
      setMessages(saved)
    }
  }, [match])

  const sendMessage = () => {
    if (!input.trim()) return
    const newMessage = { sender: "You", text: input }
    const updated = [...messages, newMessage]
    setMessages(updated)
    localStorage.setItem(`chat_${match.name}`, JSON.stringify(updated))
    setInput("")
  }

  return (
    <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg p-4 mt-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Chat with {match.name}
      </h3>
      <div className="h-48 overflow-y-auto border rounded-md p-2 mb-3 bg-white/50 dark:bg-gray-800/50">
        {messages.length > 0 ? (
          messages.map((msg, i) => (
            <p key={i} className={`text-sm mb-1 ${msg.sender === "You" ? "text-indigo-600" : "text-gray-700 dark:text-gray-300"}`}>
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No messages yet. Start the conversation!</p>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Send
        </button>
      </div>

      {/* File sharing section */}
      <FileShare chatId={match.name} />
    </div>
  )
}
