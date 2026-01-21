import { useState } from 'react'

export default function CleaningRota() {
  const [chores, setChores] = useState(() => {
    return JSON.parse(localStorage.getItem("cleaningRota") || "[]")
  })
  const [chore, setChore] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [day, setDay] = useState("")

  const addChore = () => {
    if (!chore || !assignedTo || !day) return
    const newChore = { chore, assignedTo, day, done: false }
    const updated = [...chores, newChore]
    setChores(updated)
    localStorage.setItem("cleaningRota", JSON.stringify(updated))
    setChore("")
    setAssignedTo("")
    setDay("")
  }

  const toggleDone = (index) => {
    const updated = [...chores]
    updated[index].done = !updated[index].done
    setChores(updated)
    localStorage.setItem("cleaningRota", JSON.stringify(updated))
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🧹 Cleaning Rota</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Chore (e.g. Sweep floor)"
          value={chore}
          onChange={(e) => setChore(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="px-3 py-2 rounded-md border"
        >
          <option value="">Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
        <button
          onClick={addChore}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {chores.length > 0 ? (
        <ul className="space-y-2">
          {chores.map((c, i) => (
            <li
              key={i}
              className={`flex justify-between items-center px-3 py-2 rounded-md ${
                c.done ? "bg-green-100 dark:bg-green-800" : "bg-white/50 dark:bg-gray-800/50"
              }`}
            >
              <span>{c.day}: {c.chore} (Assigned to: {c.assignedTo})</span>
              <button
                onClick={() => toggleDone(i)}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  c.done ? "bg-gray-400 text-white" : "bg-green-500 text-white"
                }`}
              >
                {c.done ? "Undo" : "Done"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No chores yet. Add tasks to keep the rota organized.</p>
      )}
    </div>
  )
}
