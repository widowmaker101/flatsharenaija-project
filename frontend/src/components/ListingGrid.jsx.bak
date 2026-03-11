import { useState, useEffect } from 'react'
import ListingCard from './ListingCard'
import ListingModal from './ListingModal'
import TagFilters from './TagFilters'
import SelectedChips from './SelectedChips'
import SavedSearches from './SavedSearches'
import Alerts from './Alerts'
import LiveAlerts from './LiveAlerts'
import NotificationCenter from './NotificationCenter'

export default function ListingGrid({ searchQuery, profile }) {
  const [selectedListing, setSelectedListing] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])

  // ✅ Save search queries into localStorage for ActivityLog
  useEffect(() => {
    if (searchQuery) {
      const history = JSON.parse(localStorage.getItem("searchHistory") || "[]")
      localStorage.setItem("searchHistory", JSON.stringify([...history, searchQuery]))
    }
  }, [searchQuery])

  const sampleListings = [
    {
      image: "https://via.placeholder.com/400x300",
      title: "Cozy 2-Bedroom Apartment",
      price: "$500/month",
      location: "Abuja, Nigeria",
      tags: ["quiet", "pet-friendly"]
    },
    {
      image: "https://via.placeholder.com/400x300",
      title: "Modern Studio Flat",
      price: "$350/month",
      location: "Lagos, Nigeria",
      tags: ["social", "city-center"]
    },
    {
      image: "https://via.placeholder.com/400x300",
      title: "Shared House with Garden",
      price: "$400/month",
      location: "Port Harcourt, Nigeria",
      tags: ["garden", "quiet"]
    },
  ]

  const effectiveQuery = searchQuery || (profile?.city || "")

  let filteredListings = sampleListings.filter(listing =>
    listing.location.toLowerCase().includes(effectiveQuery.toLowerCase()) ||
    listing.title.toLowerCase().includes(effectiveQuery.toLowerCase())
  )

  if (selectedTags.length > 0) {
    filteredListings = filteredListings.filter(listing =>
      selectedTags.every(tag => listing.tags.includes(tag))
    )
  }

  const recommendations = profile?.preferences
    ? filteredListings.filter(listing =>
        listing.tags.some(tag =>
          profile.preferences.toLowerCase().includes(tag.toLowerCase())
        )
      )
    : []

  return (
    <section className="p-6">
      <TagFilters selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <SelectedChips selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

      {recommendations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Recommended for you ✨
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((listing, index) => (
              <div key={index} onClick={() => setSelectedListing(listing)}>
                <ListingCard {...listing} recommended={true} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing, index) => (
            <div key={index} onClick={() => setSelectedListing(listing)}>
              <ListingCard {...listing} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No listings found for "{effectiveQuery}" with selected filters
          </p>
        )}
      </div>

      <ListingModal
        listing={selectedListing}
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
      />

      <SavedSearches selectedTags={selectedTags} searchQuery={searchQuery} />
      <Alerts />
      <LiveAlerts />
      <NotificationCenter />
    </section>
  )
}
