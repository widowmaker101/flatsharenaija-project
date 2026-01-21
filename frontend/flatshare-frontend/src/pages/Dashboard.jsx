import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/messages")
      .then(res => res.json())
      .then(data => {
        // show only last 3 messages
        setMessages(data.slice(-3))
      })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Flatshare Naija Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {messages.map(m => (
          <div key={m.id} className="bg-white shadow rounded-lg p-4 flex flex-col">
            <div className="flex items-center space-x-2 mb-2">
              <img src={m.avatar} alt={m.sender} className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-semibold">{m.sender}</div>
                <div className="text-xs text-gray-400">
                  {new Date(m.created_at).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <p className="text-gray-700">{m.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link
          to="/chat"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Join Chat
        </Link>
      </div>
    </div>
  )
}
