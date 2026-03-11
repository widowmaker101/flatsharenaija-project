import { useState, useEffect } from 'react'

export default function ProfileInsights({ profile }) {
  const [tasks, setTasks] = useState([])
  const [expenses, setExpenses] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"))
    setExpenses(JSON.parse(localStorage.getItem("expenses") || "[]"))
    setEvents(JSON.parse(localStorage.getItem("sharedCalendar") || "[]"))
  }, [])

  if (!profile) {
    return (
      <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📈 Profile Insights</h2>
        <p className="text-gray-500">Complete onboarding to see personalized insights.</p>
      </div>
    )
  }

  // Task stats
  const completedTasks = tasks.filter(t => t.assignee.toLowerCase() === profile.name.toLowerCase() && t.completed).length
  const assignedTasks = tasks.filter(t => t.assignee.toLowerCase() === profile.name.toLowerCase()).length

  // Expense stats
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const yourExpenses = expenses
    .filter(e => e.payer.toLowerCase() === profile.name.toLowerCase())
    .reduce((sum, e) => sum + e.amount, 0)
  const expenseShare = totalExpenses > 0 ? ((yourExpenses / totalExpenses) * 100).toFixed(1) : 0

  // Event stats
  const yourEvents = events.filter(e => e.title.toLowerCase().includes(profile.name.toLowerCase())).length

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📈 Profile Insights</h2>
      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
        <li>✅ You completed <span className="font-bold">{completedTasks}</span> of your <span className="font-bold">{assignedTasks}</span> assigned tasks.</li>
        <li>💰 You contributed ₦{yourExpenses.toFixed(2)} which is <span className="font-bold">{expenseShare}%</span> of total expenses.</li>
        <li>📅 You are mentioned in <span className="font-bold">{yourEvents}</span> calendar events.</li>
      </ul>
    </div>
  )
}
