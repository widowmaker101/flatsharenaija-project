import React from "react"

export default function Dashboard({ profile }) {
  return (
    <div className="p-6">
      <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-md rounded-lg p-4">
        <h2 className="text-lg font-bold text-white mb-2">
          Welcome back, {profile.name} 👋
        </h2>
      </div>
      {/* other dashboard content */}
    </div>
  )
}
