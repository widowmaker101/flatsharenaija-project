import { useState } from 'react'

export default function UtilitiesTracker() {
  const [bills, setBills] = useState(() => {
    return JSON.parse(localStorage.getItem("utilities") || "[]")
  })
  const [type, setType] = useState("")
  const [amount, setAmount] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [paid, setPaid] = useState(false)

  const addBill = () => {
    if (!type || !amount || !dueDate) return
    const newBill = { type, amount: parseFloat(amount), dueDate, paid }
    const updated = [...bills, newBill]
    setBills(updated)
    localStorage.setItem("utilities", JSON.stringify(updated))
    setType("")
    setAmount("")
    setDueDate("")
    setPaid(false)
  }

  const togglePaid = (index) => {
    const updated = [...bills]
    updated[index].paid = !updated[index].paid
    setBills(updated)
    localStorage.setItem("utilities", JSON.stringify(updated))
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💡 Utilities Tracker</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Utility Type (e.g. Electricity)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-32 px-3 py-2 rounded-md border"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-2 rounded-md border"
        />
        <button
          onClick={addBill}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {bills.length > 0 ? (
        <ul className="space-y-2">
          {bills.map((bill, i) => (
            <li
              key={i}
              className={`flex justify-between items-center px-3 py-2 rounded-md ${
                bill.paid ? "bg-green-100 dark:bg-green-800" : "bg-white/50 dark:bg-gray-800/50"
              }`}
            >
              <div>
                <span className="font-semibold">{bill.type}</span> — ₦{bill.amount.toFixed(2)}
                <div className="text-sm text-gray-500">Due: {bill.dueDate}</div>
                <div className="text-sm">Status: {bill.paid ? "Paid" : "Unpaid"}</div>
              </div>
              <button
                onClick={() => togglePaid(i)}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  bill.paid ? "bg-gray-400 text-white" : "bg-green-500 text-white"
                }`}
              >
                {bill.paid ? "Undo" : "Mark Paid"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No utilities logged yet. Add bills to track payments.</p>
      )}
    </div>
  )
}
