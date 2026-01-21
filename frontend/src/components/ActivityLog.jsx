import { useState, useEffect } from 'react'

export default function ActivityLog() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem("searchHistory") || "[]")
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    const chats = Object.keys(localStorage)
      .filter(key => key.startsWith("chat_") || key.startsWith("groupchat_"))
      .map(key => ({ type: "Chat", id: key }))

    const combined = [
      ...searches.map(s => ({ type: "Search", detail: s })),
      ...favorites.map(f => ({ type: "Favorite", detail: f.title })),
      ...chats
    ]

    setHistory(combined.slice(-10)) // show last 10 activities
  }, [])

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📜 Activity Log</h2>
      {history.length > 0 ? (
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          {history.map((item, i) => (
            <li key={i} className="bg-white/50 dark:bg-gray-800/50 rounded-md px-3 py-2">
              <span className="font-semibold">{item.type}:</span> {item.detail || item.id}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No recent activity yet.</p>
      )}
    </div>
  )
}
