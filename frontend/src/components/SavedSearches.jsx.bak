import { useState, useEffect } from 'react'

export default function SavedSearches({ selectedTags, searchQuery }) {
  const [savedSearches, setSavedSearches] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem("savedSearches")
    if (stored) {
      setSavedSearches(JSON.parse(stored))
    }
  }, [])

  const saveSearch = () => {
    const newSearch = { query: searchQuery, tags: selectedTags }
    const updated = [...savedSearches, newSearch]
    setSavedSearches(updated)
    localStorage.setItem("savedSearches", JSON.stringify(updated))
  }

  return (
    <div className="p-4 border-t mt-6">
      <h3 className="text-lg font-bold mb-3">💾 Saved Searches</h3>
      <button
        onClick={saveSearch}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
      >
        Save Current Search
      </button>
      <ul className="mt-4 space-y-2">
        {savedSearches.map((s, i) => (
          <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
            🔍 {s.query || "Any city"} — Tags: {s.tags.join(", ") || "None"}
          </li>
        ))}
      </ul>
    </div>
  )
}
