import { DEFAULT_CURRENCY } from "../config";

import { DEFAULT_CURRENCY } from "../config";

import { useState } from 'react'

export default function ReimbursementSystem() {
  const currency = localStorage.getItem("currency") || DEFAULT_CURRENCY;

  const [records, setRecords] = useState(() => {
    return JSON.parse(localStorage.getItem("reimbursements") || "[]")
  })
  const [payer, setPayer] = useState("")
  const [amount, setAmount] = useState("")
  const [owedBy, setOwedBy] = useState("")

  const addRecord = () => {
    if (!payer || !amount || !owedBy) return
    const newRecord = { payer, amount: parseFloat(amount), owedBy, reimbursed: false }
    const updated = [...records, newRecord]
    setRecords(updated)
    localStorage.setItem("reimbursements", JSON.stringify(updated))
    setPayer("")
    setAmount("")
    setOwedBy("")
  }

  const toggleReimbursed = (index) => {
    const updated = [...records]
    updated[index].reimbursed = !updated[index].reimbursed
    setRecords(updated)
    localStorage.setItem("reimbursements", JSON.stringify(updated))
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💵 Reimbursement System</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Payer"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
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
          type="text"
          placeholder="Owed By"
          value={owedBy}
          onChange={(e) => setOwedBy(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addRecord}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {records.length > 0 ? (
        <ul className="space-y-2">
          {records.map((rec, i) => (
            <li
              key={i}
              className={`flex justify-between items-center px-3 py-2 rounded-md {DEFAULT_CURRENCY}{
                rec.reimbursed ? "bg-green-100 dark:bg-green-800" : "bg-white/50 dark:bg-gray-800/50"
              }`}
            >
              <span>{rec.owedBy} owes {rec.payer} ₦{rec.amount.toFixed(2)}</span>
              <button
                onClick={() => toggleReimbursed(i)}
                className={`px-3 py-1 rounded-md text-xs font-bold {DEFAULT_CURRENCY}{
                  rec.reimbursed ? "bg-gray-400 text-white" : "bg-green-500 text-white"
                }`}
              >
                {rec.reimbursed ? "Undo" : "Mark Reimbursed"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reimbursements logged yet. Add records to track repayments.</p>
      )}
    </div>
  )
}
