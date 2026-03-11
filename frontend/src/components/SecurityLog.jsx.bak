import { useState } from 'react'

export default function SecurityLog() {
  const [logs, setLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("securityLog") || "[]")
  })
  const [event, setEvent] = useState("")
  const [details, setDetails] = useState("")

  const addLog = () => {
    if (!event) return
    const newLog = { event, details, timestamp: new Date().toLocaleString() }
    const updated = [...logs, newLog]
    setLogs(updated)
    localStorage.setItem("securityLog", JSON.stringify(updated))
    setEvent("")
    setDetails("")
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🔒 Security Log</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Event (e.g. Door locked)"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Details (optional)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addLog}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {logs.length > 0 ? (
        <ul className="space-y-2">
          {logs.map((log, i) => (
            <li key={i} className="flex justify-between items-center px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50">
              <div>
                <span className="font-semibold">{log.event}</span>
                <div className="text-sm text-gray-500">{log.details}</div>
                <div className="text-xs text-gray-400">Logged at {log.timestamp}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No security events logged yet. Add entries to track activity.</p>
      )}
    </div>
  )
}
