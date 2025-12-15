import { useState, useEffect } from "react"
import io from "socket.io-client"
import { Link } from "react-router-dom"

const socket = io("http://localhost:3001")

export default function GroupChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/messages")
      .then(res => res.json())
      .then(data => setMessages(data))

    socket.on("newMessage", (msg) => {
      setMessages(prev => [...prev, msg])
    })

    return () => socket.off("newMessage")
  }, [])

  useEffect(() => {
    const chatBox = document.getElementById("chat-box")
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    await fetch("http://localhost:3001/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: "You",
        text: input,
        avatar: "/avatars/you.png"
      })
    })
    setInput("")
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">💬 Group Chat</h2>
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          Go to Dashboard
        </Link>
      </div>

      <div id="chat-box" className="space-y-3 max-h-80 overflow-y-auto mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2 p-2 rounded max-w-xs ${
              m.sender === "You"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black mr-auto"
            }`}
          >
            <img
              src={m.avatar || "/avatars/default.png"}
              alt={m.sender}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="flex justify-between">
                <span className="font-semibold">{m.sender}</span>
                <span className="text-xs opacity-70">
                  {new Date(m.created_at).toLocaleTimeString()}
                </span>
              </div>
              <p>{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}
