import { useState } from 'react'

export default function HouseRules() {
  const [rules, setRules] = useState(() => {
    return JSON.parse(localStorage.getItem("houseRules") || "[]")
  })
  const [rule, setRule] = useState("")

  const addRule = () => {
    if (!rule) return
    const newRule = { text: rule, agreed: false }
    const updated = [...rules, newRule]
    setRules(updated)
    localStorage.setItem("houseRules", JSON.stringify(updated))
    setRule("")
  }

  const toggleAgreed = (index) => {
    const updated = [...rules]
    updated[index].agreed = !updated[index].agreed
    setRules(updated)
    localStorage.setItem("houseRules", JSON.stringify(updated))
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📜 House Rules Board</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a new rule"
          value={rule}
          onChange={(e) => setRule(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addRule}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {rules.length > 0 ? (
        <ul className="space-y-2">
          {rules.map((r, i) => (
            <li
              key={i}
              className={`flex justify-between items-center px-3 py-2 rounded-md ${
                r.agreed ? "bg-green-100 dark:bg-green-800" : "bg-white/50 dark:bg-gray-800/50"
              }`}
            >
              <span>{r.text}</span>
              <button
                onClick={() => toggleAgreed(i)}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  r.agreed ? "bg-gray-400 text-white" : "bg-green-500 text-white"
                }`}
              >
                {r.agreed ? "Undo" : "Agree"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No rules yet. Add some to set household expectations.</p>
      )}
    </div>
  )
}
