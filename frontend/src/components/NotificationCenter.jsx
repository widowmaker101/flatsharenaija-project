import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NotificationCenter() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("alerts") || "[]")
    setAlerts(saved)
  }, [])

  const dismissAlert = (index) => {
    const updated = alerts.filter((_, i) => i !== index)
    setAlerts(updated)
    localStorage.setItem("alerts", JSON.stringify(updated))
  }

  return (
    <div className="p-6 border-t mt-6">
      <h3 className="text-xl font-bold mb-4">📬 Notification Center</h3>
      <AnimatePresence>
        {alerts.length > 0 ? (
          alerts.map((alert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center bg-indigo-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-4 py-2 rounded-md shadow mb-2"
            >
              <span>{alert.message}</span>
              <button
                onClick={() => dismissAlert(i)}
                className="ml-4 text-red-500 hover:text-red-700 transition-colors"
              >
                ✖
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No alerts at the moment.</p>
        )}
      </AnimatePresence>
    </div>
  )
}
