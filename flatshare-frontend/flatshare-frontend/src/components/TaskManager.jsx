import { useState } from 'react'

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks") || "[]")
  })
  const [title, setTitle] = useState("")
  const [assignee, setAssignee] = useState("")
  const [deadline, setDeadline] = useState("")

  const addTask = () => {
    if (!title || !assignee || !deadline) return
    const newTask = { title, assignee, deadline, completed: false }
    const updated = [...tasks, newTask]
    setTasks(updated)
    localStorage.setItem("tasks", JSON.stringify(updated))
    setTitle("")
    setAssignee("")
    setDeadline("")
  }

  const toggleComplete = (index) => {
    const updated = [...tasks]
    updated[index].completed = !updated[index].completed
    setTasks(updated)
    localStorage.setItem("tasks", JSON.stringify(updated))
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📝 Task Manager</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="px-3 py-2 rounded-md border"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="px-3 py-2 rounded-md border"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task, i) => (
            <li
              key={i}
              className={`flex justify-between items-center px-3 py-2 rounded-md ${
                task.completed ? "bg-green-100 dark:bg-green-800" : "bg-white/50 dark:bg-gray-800/50"
              }`}
            >
              <div>
                <span className="font-semibold">{task.title}</span> — {task.assignee}
                <div className="text-sm text-gray-500">Deadline: {task.deadline}</div>
              </div>
              <button
                onClick={() => toggleComplete(i)}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  task.completed ? "bg-gray-400 text-white" : "bg-green-500 text-white"
                }`}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tasks yet. Add chores or responsibilities to get started.</p>
      )}
    </div>
  )
}
