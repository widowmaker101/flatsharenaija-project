import { motion, AnimatePresence } from 'framer-motion'

export default function SelectedChips({ selectedTags, setSelectedTags }) {
  const removeTag = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-4">
      <AnimatePresence>
        {selectedTags.map((tag, index) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-full shadow-md cursor-pointer"
            onClick={() => removeTag(tag)}
          >
            <span>{tag}</span>
            <span className="text-xs">✖</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
