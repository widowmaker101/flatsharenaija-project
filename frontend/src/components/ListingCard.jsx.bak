import { useState } from 'react'

export default function ListingCard({ image, title, price, location, tags = [], recommended = false }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]")
    return saved.some(fav => fav.title === title)
  })

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    if (isFavorite) {
      favorites = favorites.filter(fav => fav.title !== title)
    } else {
      favorites.push({ image, title, price, location, tags })
    }
    localStorage.setItem("favorites", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="relative backdrop-blur-lg bg-white/30 dark:bg-gray-900/40 border border-white/20 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:border-indigo-400 hover:shadow-indigo-500/40">
      {recommended && (
        <span className="absolute top-4 left-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Recommended ✨
        </span>
      )}
      <button
        onClick={toggleFavorite}
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
          isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {isFavorite ? "♥ Favorited" : "♡ Favorite"}
      </button>
      <img src={image} alt={title} className="h-48 w-full object-cover transition-transform duration-500 hover:scale-110" />
      <div className="p-4 transition-colors duration-500">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{location}</p>
        <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-2">{price}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
