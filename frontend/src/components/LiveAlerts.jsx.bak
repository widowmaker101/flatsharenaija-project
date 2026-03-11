import { useState, useEffect } from 'react'

export default function LiveAlerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("savedSearches") || "[]")

    const interval = setInterval(() => {
      const newListing = {
        title: "New Flat " + Math.floor(Math.random() * 100),
        tags: ["quiet", "pet-friendly"],
        location: "Abuja, Nigeria"
      }

      savedSearches.forEach(search => {
        const matchesQuery = !search.query || newListing.location.toLowerCase().includes(search.query.toLowerCase())
        const matchesTags = search.tags.length === 0 || search.tags.every(tag => newListing.tags.includes(tag))

        if (matchesQuery && matchesTags) {
          const newAlert = { message: `🔔 Live: "${newListing.title}" matches your search (${search.query || "Any city"} with tags: ${search.tags.join(", ") || "None"})` }
          setAlerts(prev => [...prev, newAlert])

          const stored = JSON.parse(localStorage.getItem("alerts") || "[]")
          localStorage.setItem("alerts", JSON.stringify([...stored, newAlert]))
        }
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-4 border-t mt-6">
      <h3 className="text-lg font-bold mb-3">⚡ Live Alerts</h3>
      {alerts.length > 0 ? (
        <ul className="space-y-2">
          {alerts.map((alert, i) => (
            <li key={i} className="text-sm text-green-700 dark:text-green-300 animate-pulse">
              {alert.message}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">Listening for new listings…</p>
      )}
    </div>
  )
}
