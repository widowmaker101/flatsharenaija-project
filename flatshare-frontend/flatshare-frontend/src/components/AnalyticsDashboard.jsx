import { useState, useEffect } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale)

export default function AnalyticsDashboard() {
  const [expenses, setExpenses] = useState([])
  const [tasks, setTasks] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    setExpenses(JSON.parse(localStorage.getItem("expenses") || "[]"))
    setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"))
    setEvents(JSON.parse(localStorage.getItem("sharedCalendar") || "[]"))
  }, [])

  // Spending by payer
  const expenseByPayer = expenses.reduce((acc, e) => {
    acc[e.payer] = (acc[e.payer] || 0) + e.amount
    return acc
  }, {})

  const expenseChart = {
    labels: Object.keys(expenseByPayer),
    datasets: [
      {
        label: "Expenses by Payer",
        data: Object.values(expenseByPayer),
        backgroundColor: ["#6366F1", "#F59E0B", "#10B981", "#EF4444"]
      }
    ]
  }

  // Task completion
  const completedTasks = tasks.filter(t => t.completed).length
  const pendingTasks = tasks.length - completedTasks
  const taskChart = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#10B981", "#F59E0B"]
      }
    ]
  }

  // Calendar activity
  const calendarChart = {
    labels: events.map(e => e.title),
    datasets: [
      {
        label: "Events",
        data: events.map(() => 1),
        backgroundColor: "#6366F1"
      }
    ]
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Analytics Dashboard</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Expenses by Payer</h3>
          <Bar data={expenseChart} />
        </div>
        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Task Completion</h3>
          <Pie data={taskChart} />
        </div>
        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg shadow col-span-full">
          <h3 className="text-lg font-semibold mb-2">Calendar Events</h3>
          <Bar data={calendarChart} />
        </div>
      </div>
    </div>
  )
}
