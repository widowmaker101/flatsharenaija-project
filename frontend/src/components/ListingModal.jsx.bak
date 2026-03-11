import { motion, AnimatePresence } from 'framer-motion'

export default function ListingModal({ listing, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-2xl max-w-lg w-full p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors"
            >
              ✖
            </button>
            <img src={listing.image} alt={listing.title} className="rounded-lg mb-4 w-full h-56 object-cover" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{listing.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{listing.location}</p>
            <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">{listing.price}</p>
            <p className="text-gray-600 dark:text-gray-400">
              This is a beautiful flatshare option with modern amenities, great location, and friendly roommates.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
