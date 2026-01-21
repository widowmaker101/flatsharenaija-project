import { useState, useEffect } from 'react'
import ListingCard from './ListingCard'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(saved)
  }, [])

  return (
    <div className="p-6 mt-6 border-t">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">❤️ Your Favorites</h2>
      {favorites.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((listing, i) => (
            <ListingCard key={i} {...listing} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No favorites yet. Tap “♡ Favorite” on a listing to save it here.</p>
      )}
    </div>
  )
}
