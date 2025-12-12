import { useState } from 'react'

export default function InventorySystem() {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("inventory") || "[]")
  })
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [category, setCategory] = useState("")

  const addItem = () => {
    if (!name || !quantity || !category) return
    const newItem = { name, quantity, category }
    const updated = [...items, newItem]
    setItems(updated)
    localStorage.setItem("inventory", JSON.stringify(updated))
    setName("")
    setQuantity("")
    setCategory("")
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📦 Shared Inventory</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-24 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Category (e.g. Food, Cleaning)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addItem}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((it, i) => (
            <li key={i} className="flex justify-between items-center px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50">
              <span>{it.name} — Qty: {it.quantity} (Category: {it.category})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No items in inventory yet. Add household essentials to track them.</p>
      )}
    </div>
  )
}
