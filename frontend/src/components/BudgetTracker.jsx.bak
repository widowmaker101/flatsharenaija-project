import { useState } from 'react'

export default function BudgetTracker() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses") || "[]")
  })
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [payer, setPayer] = useState("")

  const addExpense = () => {
    if (!title || !amount || !payer) return
    const newExpense = { title, amount: parseFloat(amount), payer }
    const updated = [...expenses, newExpense]
    setExpenses(updated)
    localStorage.setItem("expenses", JSON.stringify(updated))
    setTitle("")
    setAmount("")
    setPayer("")
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const perPerson = expenses.length > 0 ? (total / 3).toFixed(2) : 0 // assume 3 roommates for demo

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💰 Budget Tracker</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Payer"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
          className="px-3 py-2 rounded-md border"
        />
        <button
          onClick={addExpense}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {expenses.length > 0 ? (
        <>
          <ul className="space-y-2 mb-4">
            {expenses.map((exp, i) => (
              <li key={i} className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 rounded-md px-3 py-2">
                <span>{exp.title} — {exp.payer}</span>
                <span className="font-semibold">₦{exp.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="text-gray-700 dark:text-gray-300">
            <p>Total: <span className="font-bold">₦{total.toFixed(2)}</span></p>
            <p>Split (3 roommates): <span className="font-bold">₦{perPerson}</span> each</p>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No expenses recorded yet. Add rent, utilities, or shared costs.</p>
      )}
    </div>
  )
}
