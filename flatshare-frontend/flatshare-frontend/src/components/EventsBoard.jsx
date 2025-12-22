import { motion } from "framer-motion";

import { useState } from 'react'

export default function EventsBoard() {
  const [events, setEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("eventsBoard") || "[]")
  })
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [host, setHost] = useState("")

  const addEvent = () => {
    if (!title || !date || !host) return
    const newEvent = { title, date, host }
    const updated = [...events, newEvent]
    setEvents(updated)
    localStorage.setItem("eventsBoard", JSON.stringify(updated))
    setTitle("")
    setDate("")
    setHost("")
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🎉 Shared Events Board</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Host Roommate"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addEvent}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {events.length > 0 ? (
        <ul className="space-y-2">
          {events.map((ev, i) => (
            <motion.li key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-between items-center px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50">
              <span>{ev.title} — {ev.date} (Host: {ev.host}) 
              <span className="px-2 py-1 rounded-md text-xs font-bold bg-blue-500 text-white transform transition-transform hover:scale-105 hover:shadow-lg">Upcoming</span></span>

            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No events yet. Add parties, movie nights, or outings to share with roommates.</p>
      )}
    </div>
  )
}
