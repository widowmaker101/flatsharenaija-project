import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"

const socket = io("http://localhost:3001")

export default function DirectMessage() {
  const { id } = useParams() // receiver_id
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {
    fetch(`http://localhost:3001/dm/${id}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setMessages(data))

    socket.on("newDirectMessage", msg => {
      if (msg.sender_id == id || msg.receiver_id == id) {
        setMessages(prev => [...prev, msg])
      }
    })

    return () => {
      socket.off("newDirectMessage")
    }
  }, [id])

  const sendMessage = async () => {
    const token = localStorage.getItem("token")
    await fetch("http://localhost:3001/dm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ receiver_id: id, text })
    })
    setText("")
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Direct Chat with User {id}</h1>
      <div className="space-y-2">
        {messages.map(m => (
          <div key={m.id} className="border p-2 rounded">
            <div className="text-sm">{m.text}</div>
            <div className="text-xs text-gray-400">
              {new Date(m.created_at).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-indigo-600 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}
