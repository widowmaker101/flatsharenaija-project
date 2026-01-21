import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ListingGrid from '../components/ListingGrid'

export default function Home({ searchQuery, setSearchQuery, profile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {profile && (
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {profile.name} 👋
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Searching for flatshares in {profile.city}? We’ve tailored listings to match your preferences: {profile.preferences}.
          </p>
        </div>
      )}
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ListingGrid searchQuery={searchQuery} profile={profile} />
    </motion.div>
  )
}
