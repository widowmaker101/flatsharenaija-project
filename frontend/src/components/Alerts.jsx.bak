import { useState, useEffect } from 'react'

export default function Alerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("savedSearches") || "[]")

    // Simulate new listings arriving
    const newListings = [
      { title: "Sunny Flat in Abuja", tags: ["quiet", "pet-friendly"], location: "Abuja, Nigeria" },
      { title: "City Center Studio", tags: ["social", "city-center"], location: "Lagos, Nigeria" }
    ]

    const matchedAlerts = []

    savedSearches.forEach(search => {
      newListings.forEach(listing => {
        const matchesQuery = !search.query || listing.location.toLowerCase().includes(search.query.toLowerCase())
        const matchesTags = search.tags.length === 0 || search.tags.every(tag => listing.tags.includes(tag))

        if (matchesQuery && matchesTags) {
          matchedAlerts.push({
            message: `New listing "${listing.title}" matches your search (${search.query || "Any city"} with tags: ${search.tags.join(", ") || "None"})`
          })
        }
      })
    })

    setAlerts(matchedAlerts)
  }, [])

  return (
    <div className="p-4 border-t mt-6">
      <h3 className="text-lg font-bold mb-3">🔔 Alerts</h3>
      {alerts.length > 0 ? (
        <ul className="space-y-2">
          {alerts.map((alert, i) => (
            <li key={i} className="text-sm text-green-700 dark:text-green-300">
              {alert.message}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No new alerts at the moment.</p>
      )}
    </div>
  )
}
