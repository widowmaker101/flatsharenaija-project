export default function TagFilters({ selectedTags, setSelectedTags }) {
  const allTags = ["quiet", "pet-friendly", "social", "city-center", "garden"]

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <div className="flex flex-wrap gap-3 p-4 justify-center">
      {allTags.map((tag, index) => (
        <button
          key={index}
          onClick={() => toggleTag(tag)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
            selectedTags.includes(tag)
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-800"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
