import { motion } from "framer-motion";

import { useState } from 'react'

export default function RepairLog() {
  const [repairs, setRepairs] = useState(() => {
    return JSON.parse(localStorage.getItem("repairLog") || "[]")
  })
  const [item, setItem] = useState("")
  const [issue, setIssue] = useState("")
  const [reportedBy, setReportedBy] = useState("")

  const addRepair = () => {
    if (!item || !issue || !reportedBy) return
    const newRepair = { item, issue, reportedBy, status: "Pending" }
    const updated = [...repairs, newRepair]
    setRepairs(updated)
    localStorage.setItem("repairLog", JSON.stringify(updated))
    setItem("")
    setIssue("")
    setReportedBy("")
  }

  const toggleStatus = (index) => {
    const updated = [...repairs]
    updated[index].status = updated[index].status === "Pending" ? "Completed" : "Pending"
    setRepairs(updated)
    localStorage.setItem("repairLog", JSON.stringify(updated))
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🛠 Repair Log</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Item (e.g. Washing Machine)"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Issue (e.g. Not draining)"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Reported By"
          value={reportedBy}
          onChange={(e) => setReportedBy(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addRepair}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {repairs.length > 0 ? (
        <ul className="space-y-2">
          {repairs.map((r, i) => (
            <motion.li key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-between items-center px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50">
              <span>{r.item} — {r.issue} (Reported by: {r.reportedBy}) — 
              <span className={`px-2 py-1 rounded-md text-xs font-bold ${r.status === "Completed" ? "bg-green-500 text-white transform transition-transform hover:scale-105 hover:shadow-lg" : "bg-red-500 text-white transform transition-transform hover:scale-105 hover:shadow-lg"}`}>{r.status}</span></span>

              <button
                onClick={() => toggleStatus(i)}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  r.status === "Completed" ? "bg-gray-400 text-white" : "bg-green-500 text-white transform transition-transform hover:scale-105 hover:shadow-lg"
                }`}
              >
                {r.status === "Completed" ? "Undo" : "Mark Completed"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No repairs logged yet. Add issues to track household maintenance.</p>
      )}
    </div>
  )
}
