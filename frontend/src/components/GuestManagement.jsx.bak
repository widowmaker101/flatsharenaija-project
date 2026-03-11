import { useState } from 'react'

export default function GuestManagement() {
  const [guests, setGuests] = useState(() => {
    return JSON.parse(localStorage.getItem("guestLog") || "[]")
  })
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [host, setHost] = useState("")

  const addGuest = () => {
    if (!name || !date || !host) return
    const newGuest = { name, date, host }
    const updated = [...guests, newGuest]
    setGuests(updated)
    localStorage.setItem("guestLog", JSON.stringify(updated))
    setName("")
    setDate("")
    setHost("")
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">👥 Guest Management</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Guest Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          placeholder="Host Flatmate"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addGuest}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {guests.length > 0 ? (
        <ul className="space-y-2">
          {guests.map((g, i) => (
            <li key={i} className="flex justify-between items-center px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50">
              <span>{g.name} visiting on {g.date} (Host: {g.host})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No guests logged yet. Add visits to keep everyone informed.</p>
      )}
    </div>
  )
}
