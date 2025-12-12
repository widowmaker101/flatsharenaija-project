import { useState } from 'react'

export default function MaintenanceRequests() {
  const [requests, setRequests] = useState(() => {
    return JSON.parse(localStorage.getItem("maintenanceRequests") || "[]")
  })
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")

  const addRequest = () => {
    if (!title) return
    const newRequest = { title, details, status: "Pending" }
    const updated = [...requests, newRequest]
    setRequests(updated)
    localStorage.setItem("maintenanceRequests", JSON.stringify(updated))
    setTitle("")
    setDetails("")
  }

  const updateStatus = (index, status) => {
    const updated = [...requests]
    updated[index].status = status
    setRequests(updated)
    localStorage.setItem("maintenanceRequests", JSON.stringify(updated))
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🔧 Maintenance Requests</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addRequest}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {requests.length > 0 ? (
        <ul className="space-y-2">
          {requests.map((req, i) => (
            <li key={i} className="flex justify-between items-center px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50">
              <div>
                <span className="font-semibold">{req.title}</span>
                <div className="text-sm text-gray-500">{req.details}</div>
                <div className="text-sm">Status: {req.status}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(i, "In Progress")}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md text-xs"
                >
                  In Progress
                </button>
                <button
                  onClick={() => updateStatus(i, "Resolved")}
                  className="px-3 py-1 bg-green-600 text-white rounded-md text-xs"
                >
                  Resolved
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No maintenance requests yet. Add issues to track them.</p>
      )}
    </div>
  )
}
