import { useState } from 'react'

export default function SharedCalendar() {
  const [events, setEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("sharedCalendar") || "[]")
  })
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")

  const addEvent = () => {
    if (!title || !date) return
    const newEvent = { title, date }
    const updated = [...events, newEvent]
    setEvents(updated)
    localStorage.setItem("sharedCalendar", JSON.stringify(updated))
    setTitle("")
    setDate("")
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📅 Shared Calendar</h2>
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
        <button
          onClick={addEvent}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {events.length > 0 ? (
        <ul className="space-y-2">
          {events.map((event, i) => (
            <li key={i} className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 rounded-md px-3 py-2">
              <span>{event.title}</span>
              <span className="text-gray-500">{event.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No events scheduled yet.</p>
      )}
    </div>
  )
}
