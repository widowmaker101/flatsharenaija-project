import { useState, useEffect } from 'react'

export default function NotificationPreferences() {
  const [prefs, setPrefs] = useState({
    listings: true,
    tasks: true,
    expenses: true,
    roommates: true
  })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notificationPrefs") || "{}")
    if (Object.keys(saved).length > 0) {
      setPrefs(saved)
    }
  }, [])

  const togglePref = (key) => {
    const updated = { ...prefs, [key]: !prefs[key] }
    setPrefs(updated)
    localStorage.setItem("notificationPrefs", JSON.stringify(updated))
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🔔 Notification Preferences</h2>
      <ul className="space-y-3">
        {Object.keys(prefs).map((key) => (
          <li key={key} className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-md">
            <span className="capitalize">{key}</span>
            <input
              type="checkbox"
              checked={prefs[key]}
              onChange={() => togglePref(key)}
              className="w-5 h-5"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
