import { motion } from "framer-motion";

import { DEFAULT_CURRENCY } from "../config";

import { useState } from 'react'

export default function WishlistBoard() {
  const currency = localStorage.getItem("currency") || DEFAULT_CURRENCY;

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlistBoard") || "[]")
  })
  const [item, setItem] = useState("")
  const [reason, setReason] = useState("")
  const [suggestedBy, setSuggestedBy] = useState("")

  const addItem = () => {
    if (!item || !reason || !suggestedBy) return
    const newItem = { item, reason, suggestedBy }
    const updated = [...wishlist, newItem]
    setWishlist(updated)
    localStorage.setItem("wishlistBoard", JSON.stringify(updated))
    setItem("")
    setReason("")
    setSuggestedBy("")
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📝 Shared Wishlist</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Item (e.g. Blender)"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Reason (e.g. For smoothies)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Suggested By"
          value={suggestedBy}
          onChange={(e) => setSuggestedBy(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addItem}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {wishlist.length > 0 ? (
        <ul className="space-y-2">
          {wishlist.map((w, i) => (
            <motion.li key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50">
              <span>{w.item} — {w.reason} (Suggested by: {w.suggestedBy})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No wishlist items yet. Add suggestions to plan future purchases.</p>
      )}
    </div>
  )
}
