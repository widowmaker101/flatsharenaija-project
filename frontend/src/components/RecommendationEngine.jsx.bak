import { useState, useEffect } from 'react'

export default function RecommendationEngine({ profile }) {
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]")

    const recs = []

    if (profile) {
      // Suggest listings based on preferences
      if (profile.preferences.toLowerCase().includes("quiet")) {
        recs.push("🏡 Check out more quiet apartments in Abuja.")
      }
      if (profile.preferences.toLowerCase().includes("social")) {
        recs.push("🎉 Explore shared flats in Lagos city-center for a social vibe.")
      }

      // Suggest roommates based on city
      recs.push(`👥 Connect with roommates in ${profile.city} who share your interests.`)

      // Suggest tasks if incomplete
      const pendingTasks = tasks.filter(t => !t.completed && t.assignee.toLowerCase() === profile.name.toLowerCase())
      if (pendingTasks.length > 0) {
        recs.push(`📝 You still have ${pendingTasks.length} pending tasks. Try completing them soon.`)
      }

      // Suggest budget insights
      const yourExpenses = expenses.filter(e => e.payer.toLowerCase() === profile.name.toLowerCase())
      if (yourExpenses.length === 0) {
        recs.push("💰 You haven’t logged any expenses yet. Add your share to keep finances balanced.")
      }
    }

    setRecommendations(recs)
  }, [profile])

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">✨ Recommendations</h2>
      {recommendations.length > 0 ? (
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {recommendations.map((rec, i) => (
            <li key={i} className="bg-white/50 dark:bg-gray-800/50 rounded-md px-3 py-2">
              {rec}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No recommendations yet. Engage with listings, tasks, and expenses to see suggestions.</p>
      )}
    </div>
  )
}
