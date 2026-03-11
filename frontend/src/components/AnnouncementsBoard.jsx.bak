import { motion } from "framer-motion";

import { useState } from 'react'

export default function AnnouncementsBoard() {
  const [announcements, setAnnouncements] = useState(() => {
    return JSON.parse(localStorage.getItem("announcementsBoard") || "[]")
  })
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [author, setAuthor] = useState("")

  const addAnnouncement = () => {
    if (!title || !message || !author) return
    const newAnnouncement = { title, message, author, timestamp: new Date().toLocaleString() }
    const updated = [...announcements, newAnnouncement]
    setAnnouncements(updated)
    localStorage.setItem("announcementsBoard", JSON.stringify(updated))
    setTitle("")
    setMessage("")
    setAuthor("")
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📢 Announcements Board</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Author Flatmate"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addAnnouncement}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {announcements.length > 0 ? (
        <ul className="space-y-2">
          {announcements.map((a, i) => (
            <motion.li key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50">
              <div className="font-semibold">{a.title} 
              <span className="ml-2 px-2 py-1 rounded-md text-xs font-bold bg-purple-500 text-white transform transition-transform hover:scale-105 hover:shadow-lg">Notice</span></div>

              <div>{a.message}</div>
              <div className="text-sm text-gray-500">By {a.author} — {a.timestamp}</div>
            </li>
          ))}
        </ul>
      ) : (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-gray-500">No announcements yet. Add notices to keep flatmates informed.</p>
      )}
    </div>
  )
}
