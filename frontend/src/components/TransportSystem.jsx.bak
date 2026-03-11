import { DEFAULT_CURRENCY } from "../config";

import { useState } from 'react'

export default function TransportSystem() {
  const currency = localStorage.getItem("currency") || DEFAULT_CURRENCY;

  const [rides, setRides] = useState(() => {
    return JSON.parse(localStorage.getItem("transportSystem") || "[]")
  })
  const [driver, setDriver] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [contribution, setContribution] = useState("")

  const addRide = () => {
    if (!driver || !destination || !date) return
    const newRide = { driver, destination, date, contribution }
    const updated = [...rides, newRide]
    setRides(updated)
    localStorage.setItem("transportSystem", JSON.stringify(updated))
    setDriver("")
    setDestination("")
    setDate("")
    setContribution("")
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🚗 Transport Coordination</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Driver Flatmate"
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
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
          placeholder="Contribution (₦)"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          className="w-32 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addRide}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {rides.length > 0 ? (
        <ul className="space-y-2">
          {rides.map((ride, i) => (
            <li key={i} className="flex justify-between items-center px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50">
              <span>{ride.date}: {ride.driver} driving to {ride.destination} — Contribution: ₦{ride.contribution || "0"}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No rides scheduled yet. Add carpool or transport plans.</p>
      )}
    </div>
  )
}
