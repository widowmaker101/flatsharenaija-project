import { useState } from 'react'

export default function RoommateMatch({ profile }) {
  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🤝 Flatmate Match</h2>
      <p className="text-gray-700 dark:text-gray-300">
        Find flatmates who share your lifestyle and preferences.
      </p>
    </div>
  )
}
