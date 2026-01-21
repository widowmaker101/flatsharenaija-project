import { useState } from 'react'

export default function LibrarySystem() {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("librarySystem") || "[]")
  })
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [owner, setOwner] = useState("")
  const [borrower, setBorrower] = useState("")

  const addItem = () => {
    if (!title || !type || !owner) return
    const newItem = { title, type, owner, borrower: "" }
    const updated = [...items, newItem]
    setItems(updated)
    localStorage.setItem("librarySystem", JSON.stringify(updated))
    setTitle("")
    setType("")
    setOwner("")
  }

  const lendItem = (index, borrowerName) => {
    const updated = [...items]
    updated[index].borrower = borrowerName
    setItems(updated)
    localStorage.setItem("librarySystem", JSON.stringify(updated))
  }

  const returnItem = (index) => {
    const updated = [...items]
    updated[index].borrower = ""
    setItems(updated)
    localStorage.setItem("librarySystem", JSON.stringify(updated))
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📚 Shared Library</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Type (Book, Movie, Game)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-40 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Owner Flatmate"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
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
              <span>{it.title} ({it.type}) — Owner: {it.owner} {it.borrower ? `(Borrowed by: ${it.borrower})` : ""}</span>
              <div className="flex gap-2">
                {it.borrower ? (
                  <button
                    onClick={() => returnItem(i)}
                    className="px-3 py-1 bg-green-600 text-white rounded-md text-xs"
                  >
                    Return
                  </button>
                ) : (
                  <input
                    type="text"
                    placeholder="Borrower"
                    value={borrower}
                    onChange={(e) => setBorrower(e.target.value)}
                    className="px-2 py-1 rounded-md border text-xs"
                  />
                )}
                {!it.borrower && borrower && (
                  <button
                    onClick={() => { lendItem(i, borrower); setBorrower("") }}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-md text-xs"
                  >
                    Lend
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No items in library yet. Add books, movies, or games to share.</p>
      )}
    </div>
  )
}
